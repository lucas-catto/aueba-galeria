const express = require('express');
const mysql   = require('mysql2');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const port = 3000;

// Configuração do banco de dados
const db = mysql.createConnection({
    host:     'localhost',
    user:     'root',
    password: '',
    database: 'auebagaleria'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados');
});

// Configuração do armazenamento de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(express.static('img'));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota para listar imagens
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API para obter todas as imagens
app.get('/api/imagens', (req, res) => {
    db.query('CALL ObterTodasImagens()', (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// Rota para exibir a página de adicionar imagem
app.get('/adicionar', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'adicionar.html'));
});

// Rota para adicionar uma imagem
app.post('/adicionar', upload.single('imagem'), (req, res) => {
    const imagemNome      = req.file.filename;
    const imagemDescricao = req.body.imagemDescricao;

    db.query('CALL InserirImagem(?, ?)', [imagemNome, imagemDescricao], (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
