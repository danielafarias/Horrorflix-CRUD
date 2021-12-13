const moviesService = require('../services/movies.service');

const getMovies = (req, res) => {
    const movies = moviesService.getMoviesService();
    res.send(movies);
}

const getMoviesById = (req, res) => {
    const idParam = req.params.id;
    const movie = moviesService.getMoviesByIdService(idParam);
    res.send(movie);
}

const postMovie = (req, res) => {
    if(!req.body || !req.body.title || !req.body.cover ) { 
        res.status(400).send({message: 'Preencha os campos requiridos.'})
        return
    }

    const movie = req.body;
    const newMovie = moviesService.postMovieService(movie);

    if(!newMovie.id) {
        res.status(500).send({message: "Não foi possível cadastrar o filme."})
    }

    res.send({message: `Filme ${ newMovie.title } cadastrado com sucesso.`})
}

const putMovie = (req, res) => {
    if(!req.body || !req.body.title || !req.body.cover || !req.body.genre || !req.body.status || !req.body.score) { 
        res.status(400).send({message: 'Ocorreu um erro a tentar atualizar o filme.'})
    }

    const idParam = req.params.id
    const movieEdit = req.body
    const edit = moviesService.putMovieService(idParam, movieEdit);
    
    if(edit) {
        res.send({message: "Filme editado com sucesso."})
    } else {
        res.status(404).send({message: "Filme não encontrado."})
    }
}

const deleteMovie = (req, res) => {
    const deletedMovie = moviesService.deleteMovieService(req.params.id);

    if(!deletedMovie) {
        res.status(404).send({message: 'Erro ao excluir o filme.'})
    }

    res.send({message: `O filme ${deletedMovie.title} foi apagado com sucesso`});
}

module.exports = {
    getMovies,
    getMoviesById,
    postMovie,
    putMovie,
    deleteMovie
}