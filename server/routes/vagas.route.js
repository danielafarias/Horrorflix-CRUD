// LOCAL ONDE VAI FICAR AS ROTAS DA APLICACAO OU SEJA OS ENDPOINTS [GET/POST/PUT/DELETE]
// importo o express para poder trabalhar com rotas
const express = require('express');

// inicializar o modulo de rotas do express
const router = express.Router();

//importo as funcoes do controller;
const vagasController = require('../controllers/vagas.controller');

// [GET] /vagas = Retorna uma lista de vagas
router.get('/', vagasController.getVagas)

// GET /vagas/{id} = retorna uma vaga de acordo com o seu id
router.get('/:id', vagasController.getVagasById)

// POST /vagas/add = Adiciona uma nova vaga na nossa lista de acordo com o objeto recebido pelo front
router.post('/add', vagasController.postVaga)

// PUT /vagas/edit/{id} = recebe uma vaga e um id do front end e atualiza essa vaga na nossa lista
router.put('/edit/:id', vagasController.putVaga)

// DELETE /vagas/delete/{id} = recebe um id e exclui a vaga que tiver esse id da lista
router.delete('/delete/:id', vagasController.deleteVaga)


// exporto as rotas para serem ultilizadas no index
module.exports = router;

