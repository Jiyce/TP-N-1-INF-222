const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

app.use(express.json());
// Routes
const articleRoutes = require ('./routes/articles');
app.use ('/api/articles', articleRoutes);
//Swagger
app.use( '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//frontend
app.use(express.static('public'));

// Gestion erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Erreur serveur" });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}` );
});
