// Requizicao do Método Multer para trabalhar com processamento de arquivos do lado do servidor
const multer = require('multer');

// Requizicao do Método Path para trabalhar com os caminhos exatos das pastas
const path = require('path');

const multerDiskStorage = multer.diskStorage ({

    // 1 parametro: Informa qual o caminho onde queremos salvar o arquivo enviado
    destination: (req, file, cb) => {

        const folder = path.join(__dirname, "..//public/images/profileUser");
        cb(null, folder);
    },

    // 2 parametro: Defini o nome do arquivo que iremos salvar com a data atual e o nome original do arquivo
    filename: (req, file, cb) => {

        const imageName = file.fieldname + '_' + Date.now() + path.extname(file.originalname);
        cb(null, imageName);

    }

});

module.exports = multerDiskStorage;