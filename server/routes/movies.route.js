const moviesController = require('../controllers/movies.controller');
const express = require('express');

const router = express.Router();

router.get('/', moviesController.getMovies)

router.get('/:id', moviesController.getMoviesById)

router.post('/create', moviesController.postMovie)

router.put('/edit/:id', moviesController.putMovie)

router.delete('/delete/:id', moviesController.deleteMovie)

module.exports = router;

