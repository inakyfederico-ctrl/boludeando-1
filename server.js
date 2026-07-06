import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import Campaign from './models/Campaign.js';
import Character from './models/Character.js';

// En ES modules no existe __dirname por defecto, hay que reconstruirlo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('¡Conectado exitosamente a MongoDB Atlas!'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Genera un código de sala corto, ej: "FX7K2A"
function generarCodigo() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sin 0/O ni 1/I para evitar confusiones
    let codigo = '';
    for (let i = 0; i < 6; i++) {
        codigo += chars[Math.floor(Math.random() * chars.length)];
    }
    return codigo;
}

// Genera un código secreto más largo para proteger cada personaje
function generarCodigoSecreto() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let codigo = '';
    for (let i = 0; i < 10; i++) {
        codigo += chars[Math.floor(Math.random() * chars.length)];
    }
    return codigo;
}

// Nunca devolvemos el secretCode salvo en el momento de la creación
function sanitizarPersonaje(character) {
    const obj = character.toObject ? character.toObject() : { ...character };
    delete obj.secretCode;
    return obj;
}

// Verifica si la petición trae el código secreto correcto del personaje,
// o la contraseña maestra de administrador (si está configurada en .env)
function tienePermiso(character, req) {
    const { secretCode, adminPassword } = req.body || {};
    const esAdmin =
        process.env.ADMIN_PASSWORD &&
        adminPassword &&
        adminPassword === process.env.ADMIN_PASSWORD;
    const esDueño = secretCode && secretCode === character.secretCode;
    return esAdmin || esDueño;
}

// --- RUTAS DE CAMPAÑAS ---

// Crear una campaña nueva. Devuelve el código generado.
app.post('/api/campaigns', async (req, res) => {
    try {
        let codigo;
        let existe = true;
        // Reintenta si por casualidad el código ya existe
        while (existe) {
            codigo = generarCodigo();
            existe = await Campaign.findOne({ code: codigo });
        }
        const campaign = await Campaign.create({ code: codigo, name: req.body.name || '' });
        res.status(201).json(campaign);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Verificar si un código de campaña existe (para "unirse a sala")
app.get('/api/campaigns/:code', async (req, res) => {
    try {
        const campaign = await Campaign.findOne({ code: req.params.code.toUpperCase() });
        if (!campaign) return res.status(404).json({ error: 'Campaña no encontrada' });
        res.json(campaign);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- RUTAS DE PERSONAJES ---

// Listar todos los personajes de una campaña
app.get('/api/campaigns/:code/characters', async (req, res) => {
    try {
        const characters = await Character.find({ campaignCode: req.params.code.toUpperCase() }).sort({ updatedAt: -1 });
        res.json(characters.map(sanitizarPersonaje));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear un personaje nuevo dentro de una campaña.
// Genera su código secreto y lo devuelve UNA SOLA VEZ, en esta respuesta.
app.post('/api/campaigns/:code/characters', async (req, res) => {
    try {
        const codigo = req.params.code.toUpperCase();
        const campaign = await Campaign.findOne({ code: codigo });
        if (!campaign) return res.status(404).json({ error: 'Campaña no encontrada' });

        const secretCode = generarCodigoSecreto();
        const character = await Character.create({ ...req.body, campaignCode: codigo, secretCode });
        // Acá sí devolvemos el secretCode (toObject normal, sin sanitizar),
        // porque es el único momento en que el dueño lo necesita ver.
        res.status(201).json(character.toObject());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener un personaje puntual (sin su código secreto)
app.get('/api/characters/:id', async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) return res.status(404).json({ error: 'Personaje no encontrado' });
        res.json(sanitizarPersonaje(character));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar un personaje: requiere el código secreto del personaje
// o la contraseña de administrador.
app.put('/api/characters/:id', async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) return res.status(404).json({ error: 'Personaje no encontrado' });
        if (!tienePermiso(character, req)) {
            return res.status(403).json({ error: 'Código incorrecto' });
        }
        // Sacamos secretCode/adminPassword del body antes de guardar,
        // para que no se pisen ni se guarden como si fueran datos del personaje.
        const { secretCode, adminPassword, ...datosPersonaje } = req.body;
        Object.assign(character, datosPersonaje);
        await character.save();
        res.json(sanitizarPersonaje(character));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Borrar un personaje: requiere el código secreto del personaje
// o la contraseña de administrador.
app.delete('/api/characters/:id', async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) return res.status(404).json({ error: 'Personaje no encontrado' });
        if (!tienePermiso(character, req)) {
            return res.status(403).json({ error: 'Código incorrecto' });
        }
        await Character.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- SERVIR EL FRONTEND COMPILADO (build de Vite) ---
// En producción, Vite genera la carpeta "dist". Este bloque hace que
// Express sirva esos archivos, así en Render es un solo servicio.
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});