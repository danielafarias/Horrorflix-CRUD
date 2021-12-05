// SERVER (API)
// importar o express para que seja possivel ultilizar as suas funcoes na nossa aplicacao
const express = require('express');

//importo o lib cors 
const cors = require('cors')

// inicilizar o express no nosso arquivo javascript para que ele possa assumir as funcoes do servidor
const app = express();

//CORS - permite a troca de recursos entre origens diferentes
// usamos o middleware da lib cors
app.use(cors());

// JSON - Javascript Object Notation
// falo pro express trabalhar com middleware de json para trabalharmos com o formato JSON.
app.use(express.json());

//importo o arquivo de rotas

const vagasRouter = require('./routes/vagas.route');

// falo pro backend usar as minha rotas para o endpoint /vagas
app.use('/vagas', vagasRouter);






// Definir a porta que o meu backend irá executar
const port = 3000;

// inicializa o servidor na seguite porta
app.listen(port, () => {
    console.log(`App Rodando na porta ${port}`);
})
