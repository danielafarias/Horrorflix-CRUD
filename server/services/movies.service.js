const Movies = [
    {
        id: 1,
        title: "Brinquedo Assassino",
        cover: "https://br.web.img2.acsta.net/pictures/14/10/10/18/18/494547.jpg",
        trailer: "https://www.youtube.com/embed/z90_HJnqc3A",
        genre: "Thriller",
        score: 10
    },
    {
        id: 2,
        title: "Brinquedo Assassino",
        cover: "https://upload.wikimedia.org/wikipedia/pt/1/13/The_Grudge.jpg",
        trailer: "https://www.youtube.com/embed/IcyoEBGFwWU",
        genre: "Sobrenatural",
        score: 10
    },
    {
        id: 3,
        title: "Halloween Kills",
        cover: "https://br.web.img3.acsta.net/pictures/21/06/28/13/19/4959159.jpg",
        trailer: "https://www.youtube.com/embed/Ljhe6DHyPVA",
        genre: "Slasher",
        score: 7
    },
]

const getMoviesService = () => {
    return Movies
}

const getMoviesByIdService = (idParam) => {
    return Movies.find((movie) => movie.id == idParam)
}

const postMovieService = (newMovie) => {
    const newId = Movies.length + 1;
    newMovie.id = newId;
    Movies.push(newMovie);
    return newMovie;
}

const putMovieService = (idParam, movieEdit) => {

    const index = Movies.findIndex((movie) => movie.id == idParam);

    if(index >= 0) {
        Movies[index] = {
            ...Movies[index],
            ...movieEdit
        }
        return true
    } else {
        return false
    }
}

const deleteMovieService = (idParam) => {
    const index = Movies.findIndex((movie) => movie.id == idParam)
    const deletedMovie = Movies[index];
    Movies.splice(index, 1)
    return deletedMovie;
}

module.exports = {
    getMoviesService,
    getMoviesByIdService,
    postMovieService,
    putMovieService,
    deleteMovieService
}
