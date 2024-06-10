
USE auebagaleria;

DELIMITER //

CREATE PROCEDURE InserirImagem(IN p_imagemNome VARCHAR(255), IN p_imagemDescricao TEXT)
BEGIN
    INSERT INTO imagens (imagemNome, imagemDescricao) VALUES (p_imagemNome, p_imagemDescricao);
END //

CREATE PROCEDURE ObterTodasImagens()
BEGIN
    SELECT * FROM imagens;
END //

DELIMITER ;
