require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para entender JSON y servir archivos estáticos (tu HTML)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('¡Conectado exitosamente a MongoDB Atlas!'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Ruta de prueba de API para que tu HTML interactúe
app.get('/api/saludo', (req, res) => {
    res.json({ mensaje: "Hola desde el backend en Node.js" });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});