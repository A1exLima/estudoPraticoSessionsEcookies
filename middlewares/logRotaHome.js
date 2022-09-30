const fs = require('fs');
const path = require('path');

function registroRotaHome (req, res, next) {

    //var dt = new Date('2021-07-24T20:37:26.007' + 'Z');
    //console.log(dt.toLocaleString());

    // captura a hora e data
    var dataHora = new Date();

    // coverte em string a hora e data e caputa somente as informacoes que queremos
    var strDataHora = dataHora.toISOString().substring(0,19).replace('T',' - Hora: ')

    // Define o caminho para salvar o registro do log
    let caminhoRegistroLogRotas = path.resolve(`./logs/registroRotaHome/${strDataHora.substring(0,10)}_logRotaHome.txt`);

    // Define uma variavel para captura da rota ao acessa-la
    let rotaHome = req.url;

    // Inclui no arquivo txt a data e hora e a rota url acessada e pula uma linha
    fs.appendFileSync(caminhoRegistroLogRotas,`Data: ${strDataHora} - Rota: ${rotaHome}\n`);

    // Passa para o proximo Middleware
    next();
}

module.exports = registroRotaHome;