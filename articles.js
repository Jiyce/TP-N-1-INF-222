const express = require('express');
const router = express.Router();
const db = require('../db');
 
//Creer un article
router.post('/', (req, res) => {
    const { titre, contenu, auteur, date, categorie } = req.body;

    const sql = `
        INSERT INTO articles (titre, contenu, auteur, date, categorie)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [titre, contenu, auteur, date, categorie], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: "Article créé avec succès",
            id: result.insertId
        });
    });
});

// Récupérer tous les articles avec filtres optionnels
router.get('/', (req, res) => {
    const {categorie, auteur, title} = req.query;
    let sql = "SELECT * FROM articles WHERE 1=1";
    const params = [];
    
    if (categorie) {
        sql += " AND categorie = ?";
        params.push(categorie);
    }
    if (auteur) {
        sql += " AND auteur = ?";
        params.push(auteur);
    }
    if (title) {
        sql += " AND titre LIKE ?";
        params.push(`%${title}%`);
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Récupérer un article par ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM articles WHERE id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Article non trouvé" });
        }
        res.json(results[0]);
    });
});

// Mettre à jour un article
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { titre, contenu, auteur, date, categorie } = req.body;

    const sql = `
        UPDATE articles
        SET titre = ?, contenu = ?, auteur = ?, date = ?, categorie = ?
        WHERE id = ?
    `;

    db.query(sql, [titre, contenu, auteur, date, categorie, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Article non trouvé" });
        }
        res.json({ message: "Article mis à jour avec succès" });
    });
});

// Supprimer un article
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM articles WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Article non trouvé" });
        }
        res.json({ message: "Article supprimé avec succès" });
    });
});

// Rechercher des articles par titre
router.get('/search', (req, res) => {
    const { title } = req.query;
    const sql = "SELECT * FROM articles WHERE titre LIKE ?";

    db.query(sql, [`%${title}%`], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});
module.exports = router;

