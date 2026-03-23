const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'joyce',
    password: 'ABC2', // mets ton mot de passe MySQL
    database: 'blog_db'
});

db.connect((err) => {
    if (err) {
        console.error('Erreur connexion : ' + err.stack);
        return;
    }
    console.log('Connecté à MySQL');
});

module.exports = db;