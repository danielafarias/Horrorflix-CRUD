const Movies = [
    {
        id: 1,
        title: "Brinquedo Assassino",
        cover: "https://br.web.img2.acsta.net/pictures/14/10/10/18/18/494547.jpg",
        sinopse: "Uma mãe solteira dá a seu filho o boneco mais desejado para o seu aniversário, mas eles descobrirão que ele é possuído pela alma de um assassino em série.",
        genre: "Thriller",
        score: 10
    },
    {
        id: 2,
        title: "O Grito",
        cover: "https://upload.wikimedia.org/wikipedia/pt/1/13/The_Grudge.jpg",
        sinopse: "Em Tóquio, uma casa comum foi palco de uma morte violenta que deixou o local marcado. A estudante americana Karen Davis, que não sabe do passado da casa, concorda em substituir uma colega, assistente social, que deveria ir àquele lugar.",
        genre: "Sobrenatural",
        score: 10
    },
    {
        id: 3,
        title: "Halloween Kills",
        cover: "https://br.web.img3.acsta.net/pictures/21/06/28/13/19/4959159.jpg",
        sinopse: "A saga de Michael Myers e Laurie Strode continua no próximo capítulo emocionante da série de Halloween.",
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
