const apiUrl = "http://localhost:3000";

// --------------------------- GET ELEMENT HTML -------------------------------
var register = document.getElementById("principal-movie");
var close = document.getElementById("close");
var movies = document.getElementById("movies");
var cards = document.getElementById("cards");
var modal = document.getElementById("modal");
var modal2 = document.getElementById("edit");
var modalContent = document.getElementById("modal-content");
var modalContent2 = document.getElementById("edit-content");

var title = document.getElementById("title").value;
var cover = document.getElementById("cover").value;
var sinopse = document.getElementById("sinopse").value;
var genre = document.getElementById("genre").value;
var score = document.getElementById("score").value;

var textHelper1 = document.getElementById("text-helper1");
var textHelper2 = document.getElementById("text-helper2");

// --------------------------- GET ALL MOVIES -------------------------------
const getMovies = async () => {
  const response = await fetch(`${apiUrl}/movies`);
  const movies = await response.json();

  movies.map((movie) => {
    console.log(movie.title);
    document.getElementById("cards").insertAdjacentHTML(
      "beforeend",
      `
            <div class="item" id="item" key="${movie.id}" onclick="movieDetails(${movie.id})">
                <img
                    class="movie-box"
                    src="${movie.cover}"
                    alt="Poster de um filme"
                />
            </div>
        `
    );
  });
};

// --------------------------- MODAL DETALHES -------------------------------
const movieDetails = async (id) => {
  const response = await fetch(`${apiUrl}/movies/${id}`);
  const movie = await response.json();

  document.getElementById("modal").style.display = "block";

  document.getElementById("modal-content").insertAdjacentHTML(
    "beforeend",
    `
            <div class="actions">
                <img
                class="movie-box"
                src="${movie.cover}"
                alt="Poster de um filme"
                />
                <div class="buttons">
                    <button
                        role="button"
                        class="button"
                        onclick="movieOpenEdit(${movie.id})"
                    >
                    <i class="fas fa-edit"></i>
                        Editar
                    </button>
                    <button
                        role="button"
                        class="button"
                        onclick="deleteMovie(${movie.id})"
                    >
                    <i class="fas fa-trash"></i></i>
                        Apagar
                    </button>
                    </div>
            </div>
            <article>
                <h3>${movie.title}</h3>
                <div class="badges">
                    <div class="badge"><i class="fas fa-film"></i> ${movie.genre}</div>
                    <div class="badge"><i class="fas fa-star"></i> ${movie.score}</div>
                </div>
                <p>${movie.sinopse}</p>
            </article>
    `
  );
};

// --------------------------- MODAL EDIÇÃO -------------------------------
const movieOpenEdit = async (id) => {
  document.getElementById("modal-content").style.display = "none";

  document.getElementById("edit").style.display = "block";
 
  const response = await fetch(`${apiUrl}/movies/${id}`);
  const data = await response.json();
  
  const title = document.getElementById("title").value = data.title;
  const cover = document.getElementById("cover").value = data.cover;
  const sinopse = document.getElementById("sinopse").value = data.sinopse;
  const genre = document.getElementById("genre").value = data.genre;
  const score = document.getElementById("score").value = data.score;

  const movie = {
    title,
    cover,
    sinopse,
    genre,
    score,
  };


  document.getElementById("edit-content").insertAdjacentHTML(
    "beforeend",
    `
            <div class="actions">
                <img
                class="movie-box"
                src="${cover}"
                alt="Poster de um filme"
                />
                <div class="buttons">
                    <button
                        role="button"
                        class="button"
                        onclick="updateMovie(${data.id}, ${movie})"
                    >
                    <i class="fas fa-edit"></i>
                        Confirmar alteração
                    </button>
                    
                    </div>
            </div>
            <article id="edit-ver">
              <input value="${title}" id="title" name="title" placeholder="Altere o título"/>
              <input value="${cover}" id="cover" name="cover" placeholder="Altere a capa"/>
              <input value="${sinopse}" id="sinopse" name="sinopse" placeholder="Altere a sinopse"/>
              <div class="badges-edit">
              <div class="badge"><i class="fas fa-film"></i> 
              <select value="${genre}" id="genre" name="genre">
                <option disabled selected>Selecione o gênero</option>
                <option>Terror Psicológico</option>
                <option>Thriller</option>
                <option>Sobrenatural</option>
                <option>Found Footage</option>
                <option>Gore</option>
                <option>Slasher</option>
                <option>Body Horror</option>
                <option>Trash</option>
                <option>Terror Cósmico</option>
                <option>Terror Cômico</option>
                <option>Terror Teen</option>
              </select></div>

              <div class="badge"><i class="fas fa-star"></i> 
              <select value="${score}" id="score" name="score">
              <option disabled selected>Avalie</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              </select></div>
              </div>
             
            </article>
    `
  );
  console.log(data.id)
};

// --------------------------- POST MOVIE -------------------------------
const postMovie = async () => {
  var title = document.getElementById("title").value;
  var cover = document.getElementById("cover").value;
  var sinopse = document.getElementById("sinopse").value;
  var genre = document.getElementById("genre").value;
  var score = document.getElementById("score").value;
  
  const movie = {
    title,
    cover,
    sinopse,
    genre,
    score,
  };
  console.log(movie);

  if (title != "" && cover != "") {
    const response = await fetch(`${apiUrl}/movies/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
    const data = await response.json();

    alert(`O filme foi cadastrado com sucesso!`);
    document.getElementById("cards").insertAdjacentHTML(
      "beforeend",
      `
          <div class="item" id="item" key="${data.id}" onclick="movieDetails(${data.id})">
              <img
                  class="movie-box"
                  src="${data.cover}"
                  alt="Poster de um filme"
              />
          </div>
      `
    );
    getMovies();
    limpaCampos();
    window.location.reload();
  } else {
    textHelper1.style.display = "block";
    textHelper2.style.display = "block";
  }
};

// --------------------------- PUT MOVIE -------------------------------
const updateMovie = async (id, movie) => {
 
    const response = await fetch(`${apiUrl}/movies/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
    const data = await response.json();
    alert("O filme foi editado com sucesso!");
    console.log(data);
    document.getElementById("cards").insertAdjacentHTML(
      "beforeend",
      `
          <div class="item" id="item" key="${data.id}" onclick="movieDetails(${data.id})">
              <img
                  class="movie-box"
                  src="${data.cover}"
                  alt="Poster de um filme"
              />
          </div>
      `
    );
    getMovies();
    window.location.reload();
};

// --------------------------- DELETE MOVIE -------------------------------
const deleteMovie = async (id) => {
  const response = await fetch(`${apiUrl}/movies/delete/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();
  alert(result.message);

  document.getElementById("modal").style.display = "none";
  document.getElementById("cards").innerHTML = "";
  getMovies();
};

// --------------------------- UTILS -----------------------------------
const limpaCampos = () => {
  title = "";
  cover = "";
  sinopse = "";
  genre = "";
  score = "";
};

// --------------------------- CLOSE MODAL -------------------------------
document.getElementById("close").onclick = function () {
  document.getElementById("modal").style.display = "none";
  document.getElementById("edit").style.display = "none";

  document.getElementById("modal-content").innerHTML = "";
  document.getElementById("edit-content").innerHTML = "";
};

document.getElementById("principal-movie").onclick = function () {
  document.getElementById("modal").style.display = "none";
  document.getElementById("edit").style.display = "none";

  document.getElementById("modal-content").innerHTML = "";
  document.getElementById("edit-content").innerHTML = "";
};

document.getElementById("movies").onclick = function () {
  document.getElementById("modal").style.display = "none";
  document.getElementById("edit").style.display = "none";

  document.getElementById("modal-content").innerHTML = "";
  document.getElementById("edit-content").innerHTML = "";
};