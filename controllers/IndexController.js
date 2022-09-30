// Requisicao do banco de Dados
const dadosUsuario = require("../database/dadosUsuario.json")

// Requisicao do modulo nativo file system
const fs = require('fs');

// Requisicao do Express Validator
const {validationResult} = require('express-validator');

// Requisicao Bcrypt para execucao de Hash
const bcrypt = require("bcrypt");

// Objeto Literal ja pronto para exportacao de todos os controllers
module.exports ={

    // PÁGINA HOME - ( IRÁ EXIBIR PARA O USUÁRIO TODOS OS MÉTODOS CRUD)

    // Redenrizacao da página Home
    index: (req, res) =>{
        res.render("index.ejs");
    },

    produtos: (req, res) =>{
        res.render("produtos.ejs");
    },

    contato: (req, res) =>{
        res.render("contato.ejs");

    },
    
    minhaConta: (req, res) =>{
        res.render("minhaConta.ejs");

    },
 
    cadastro: (req, res) =>{
        res.render("cadastro.ejs",{flagImg: 0}); // Se flag for 0 nao aparece mensagem de erro

    },

    processingData: (req, res) => {

        let erros = validationResult(req);
            
        if(!erros.isEmpty()){
            return res.render('cadastro.ejs', { erros: erros.mapped(), old: req.body, flagImg: 1 }); // Se flag for 1. Aparece mensagem de erro relacionado a imagem nao enviada

        } else{

            // Verifica se o req.file é false (undefined) se sim executar o código abaixo
            if (!req.file) {    

            return res.render('cadastro.ejs', { erros: erros.mapped(), old: req.body, flagImg: 1}); // Se flag for 1. Aparece mensagem de erro relacionado a imagem nao enviada
            
            } else {
                // Captura dos dados (NOME, E-MAIL E SENHA) enviados via Método Post através do req.body e salva em uma variavel
                let dados = req.body;

                // Busca a senha nao criptografada no objeto literal dados e executa o hash de criptografia
                let senhaCrypt = bcrypt.hashSync(dados.senha, 12);

                //Salva a senha criptografada na posicao senha do objeto literal dados
                dados.senha = senhaCrypt;

                // Inclui do nome do arquivo de imagem do usuário na variavel Dados
                dados.imagemUsuario = `/images/profileUser/${req.file.filename}`;

                // Inclusao do nome de usuario, e-mail, senha(criptografada) e local img na ultima posicao do array do banco de dados onde é guardado todos os usuarios e senhas
                dadosUsuario.push(dados);
        
                // conversao dos dados em tipo Json, e atraves da funcao nativa fs o salvamento desses dados dentro da database em formato json
                fs.writeFileSync('./database/dadosUsuario.json', JSON.stringify(dadosUsuario, null, 4));
                
                //Redirecionamento para a página de confirmacao do novo usuario criado
                res.render('confirmacaoCadastro.ejs', {nomeImg: dados.imagemUsuario, nomeUsuario: req.body.nome});
            }
        }
    }
}

