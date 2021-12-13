const Movies = [
    {
        id: 1,
        title: "Brinquedo Assassino",
        cover: "https://br.web.img2.acsta.net/pictures/14/10/10/18/18/494547.jpg",
        sinopse: "Uma mãe solteira dá a seu filho o boneco mais desejado para o seu aniversário, mas eles descobrirão que ele é possuído pela alma de um assassino em série.",
        genre: "Thriller",
        score: 10,
        status: true,
    },
    {
        id: 2,
        title: "O Grito",
        cover: "https://upload.wikimedia.org/wikipedia/pt/1/13/The_Grudge.jpg",
        sinopse: "Em Tóquio, uma casa comum foi palco de uma morte violenta que deixou o local marcado. A estudante americana Karen Davis, que não sabe do passado da casa, concorda em substituir uma colega, assistente social, que deveria ir àquele lugar.",
        genre: "Sobrenatural",
        score: 10,
        status: false,
    },
    {
        id: 3,
        title: "Halloween Kills",
        cover: "https://br.web.img3.acsta.net/pictures/21/06/28/13/19/4959159.jpg",
        sinopse: "A saga de Michael Myers e Laurie Strode continua no próximo capítulo emocionante da série de Halloween.",
        genre: "Slasher",
        score: 7,
        status: false,
    },
    {
        id: 4,
        title: "Corra!",
        cover: "https://br.web.img3.acsta.net/c_310_420/pictures/17/04/19/21/08/577190.jpg",
        sinopse: "Chris (Daniel Kaluuya) é jovem negro que está prestes a conhecer a família de sua namorada caucasiana Rose (Allison Williams). A princípio, ele acredita que o comportamento excessivamente amoroso por parte da família dela é uma tentativa de lidar com o relacionamento de Rose com um rapaz negro, mas, com o tempo, Chris percebe que a família esconde algo muito mais perturbador.",
        genre: "Thriller",
        score: 7,
        status: true,
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
