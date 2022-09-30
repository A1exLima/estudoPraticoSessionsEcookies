// Requisicao do IndexController dentro da pasta controller
const IndexController = require('../controllers/IndexController');

// Requizicao do modulo NPM Express
const express = require('express');

// Confiuracao do modulo express para chamar a função como router
const router = express.Router();

// Requisao do Middleware para captura da data e hora de acesso da rota home
const registroRotaHome = require('../middlewares/logRotaHome');

// Requizicao do Método Multer para trabalhar com processamento de arquivos do lado do servidor
const multer = require('multer');

// Requisicao do Middleware multerDiskStorage
const multerDiskStorage = require("../middlewares/multerDiskStorage");

// Funcao que ira receber os dados e passar para o storage fazer o trabalho de destination e filename
const upload = multer({ storage: multerDiskStorage});

//-------------------BLOCO EXPRESS-VALIDATOR------------------//

// Requisicao do express-validator destruturacao do body
const { body } = require('express-validator');

// Variavel do tipo array para validacao de cada campo do body como funcao do express-validator
const validacoes = [
    body("nome")
        .notEmpty().withMessage("O Nome deve ser preenchido").bail()
        .isLength({min:3}).withMessage("O Nome deve conter no mínimo 3 caracteres"),
    
    body("email")
        .notEmpty().withMessage("O E-mail deve ser preenchido").bail()
        .isEmail().withMessage("Deve preencher com um E-mail válido"),
    body("senha")
        .notEmpty().withMessage("A Senha deve ser preenchida").bail()
        .isLength({min:5}).withMessage("A Senha deve conter no mínimo 5 caracteres")
];

//------------------------------------------------------------//

// Rota para página HOME
// Segundo parametro para chamar o middleware de rota registro Home
router.get('/', registroRotaHome, IndexController.index);

// Rota para página PRODUTOS
router.get('/produtos', IndexController.produtos);

// Rota para página CONTATO
router.get('/contato', IndexController.contato);

// Rota para página MINHA CONTA
router.get('/minhaConta', IndexController.minhaConta);

//-----------------------------------------------------//

// Rota para página CADASTRO
router.get('/cadastro', IndexController.cadastro);

// No Segundo parametro efetuamos as validacoes dos campo de formulário
// No terceiro parametro temos o middleware de rota para chamar a funcao multer onde indicamos o caminho onde sera salvo o arquivo e nome desse arquivo (IMAGEM USUARIO)
router.post(
    '/cadastro', 
    upload.single('imagemUsuario'),
    validacoes, 
    IndexController.processingData
);

//-----------------------------------------------------//

// Exportando o index router para ser usado no Indexcontroller
module.exports = router; 

