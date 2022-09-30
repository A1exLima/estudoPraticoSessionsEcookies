// Requizicao do modulo NPM Express
// Express: Otimizar a construção de aplicações web e APIs, tornando-se um dos 
// Frameworks mais populares da internet e que utiliza o Node para execução do 
// javascript como linguagem de back-end
const express = require('express');

// Confiuracao do modulo express para chamar como função
const app = express();

// Requizicao do modulo NPM Path
const path = require('path');

// Setando o motor de visualizacao como extensao EJS
app.set("view engine", 'ejs');

// Receberá as informaçes do formulário e deixara disponivel como um objeto literal
// Isso fará com que o processamento das informacoes enviadas via formulário pelo método 
// POST funcione dentro de um objeto literal, assim dando a possibilidade de trabalhar com 
// esses dados, caso nao possua essas duas linhas de código abaixo nao ira funcionar.
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Os métodos CRUD, PUT e DELETE nao sao suportados nativamente por todos os navegadores
// As duas linhas de código abaixo chama o módulo para substituir o metodo POST por PUT ou DELETE,
// nos formulários, fazendo com que consigamos trabalhar com métodos citados.
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Configuração para uso como pasta estatica a pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Requisicao do Modulo NPM express-sessions
const session = require('express-session');

// Configurando como Middleware o modulo session
app.use(session({
    secret:"projetoExpress",
    resave: true,
    saveUninitialized: true
})); 

//.................................................................................

//BLOCO PARA USO DE ROTAS DO PROJETO (REQUISICAO ROTEADOR E INDICACAO CAMINHO)

// Faz a requisicao da do Middleware de captura de rotas
const registroRotas = require('./middlewares/logRotas'); 

// Router Index
// 2 Parametro solicita o middleware global para registro de acesso das rotas do site
const IndexRouter = require ('./routers/RouterIndex');
app.use('/', registroRotas, IndexRouter);

//.................................................................................

// Caso não seja encontrado nenhuma das páginas acima, aplicar redirecionamento para erro 404
app.use((req, res, next) => {
    res.status(404).render('not-found.ejs');
    next(); 
});


// Configurando porta para inicializacao do servidor (Running port 3000)
app.listen(3000, ()=> {console.log('Server Runing Port 3000')});


