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

// Middleware para entender JSON y servir archivos estáticos (tu HTML)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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
        res.json(characters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear un personaje nuevo dentro de una campaña
app.post('/api/campaigns/:code/characters', async (req, res) => {
    try {
        const codigo = req.params.code.toUpperCase();
        const campaign = await Campaign.findOne({ code: codigo });
        if (!campaign) return res.status(404).json({ error: 'Campaña no encontrada' });

        const character = await Character.create({ ...req.body, campaignCode: codigo });
        res.status(201).json(character);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener un personaje puntual
app.get('/api/characters/:id', async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) return res.status(404).json({ error: 'Personaje no encontrado' });
        res.json(character);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar un personaje (autoguardado mientras se va creando)
app.put('/api/characters/:id', async (req, res) => {
    try {
        const character = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!character) return res.status(404).json({ error: 'Personaje no encontrado' });
        res.json(character);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Borrar un personaje
app.delete('/api/characters/:id', async (req, res) => {
    try {
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