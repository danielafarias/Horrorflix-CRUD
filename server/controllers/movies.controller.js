const moviesService = require('../services/movies.service');

const getMovies = (req, res) => {
    const movies = moviesService.getMoviesService();
    res.send(movies);
}

const getMoviesById = (req, res) => {
    const idParam = req.params.id;
    const movie = moviesService.getMoviesByIdService(idParam);
    res.send(movie)
}

const postMovie = (req, res) => {
    const movie = req.body;
    console.log(req.body);
    const newMovie = moviesService.postMovieService(movie);
    res.send(newMovie)
}

const putMovie = (req, res) => {
    const idParam = req.params.id
    const movieEdit = req.body
    const edit = moviesService.putMovieService(idParam, movieEdit);
    if(edit) {
        res.send(edit)
    } else {
        res.status(404).send({message: "Filme não encontrado."})
    }
}

const deleteMovie = (req, res) => {
    const deletedMovie = vagasService.deleteMovieService(req.params.id);
    res.send(deletedMovie);
}

module.exports = {
    getMovies,
    getMoviesById,
    postMovie,
    putMovie,
    deleteMovie
}