CREATE DATABASE auebagaleria;

USE auebagaleria;

CREATE TABLE imagens (
    imagemID        INT AUTO_INCREMENT PRIMARY KEY,
    imagemNome      VARCHAR(255) NOT NULL,
    imagemDescricao TEXT NOT NULL
);
