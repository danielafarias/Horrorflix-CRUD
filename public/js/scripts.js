const apiUrl = "http://localhost:3000";

// --------------------------- GET ALL MOVIES -------------------------------
const getMovies = async () => {
  const response = await fetch(`${apiUrl}/movies`);
  const movies = await response.json();

  movies.map((movie) => {
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

  if (movie.status === true) {
  document.getElementById("modal-content").insertAdjacentHTML(
    "beforeend",
    `
            <div class="actions">
                <img
                class="movie-box"
                id="modal-img"
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
                <p id="sinopse">${movie.sinopse}</p>
                <div class="modal-checkbox">
                  <div class="checkbox">
                  <i class="far fa-eye"></i><label for="status"> Assistido? </label><br>
                  <input id="status" type="checkbox" name="status" checked disabled>
                  </div>
                </div>
            </article>
    `
  );
  } else {
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
                  <p id="sinopse">${movie.sinopse}</p>
                  <div class="modal-checkbox">
                    <div class="checkbox">
                    <i class="far fa-eye"></i><label for="status"> Assistido? </label><br>
                    <input id="status" type="checkbox" name="status" disabled>
                    </div>
                  </div>
              </article>
      `
    );
  }
};

// --------------------------- MODAL EDIÇÃO -------------------------------
const movieOpenEdit = async (id) => {
  
  document.getElementById("modal-content").style.display = "none";
  
  document.getElementById("edit").style.display = "block";
  
  const response = await fetch(`${apiUrl}/movies/${id}`);
  const data = await response.json();

  document.getElementById("edit-content").insertAdjacentHTML(
    "beforeend",
    `
            <div class="actions">
                <img
                class="movie-box"
                id="modal-img"
                src="${data.cover}"
                alt="Poster de um filme"
                />
                <div class="buttons">
                    <button
                        role="button"
                        class="button"
                        onclick="putMovie(${data.id})"
                    >
                    <i class="fas fa-edit"></i>
                        Confirmar alteração
                    </button>
                    
                </div>
            </div>
            <article id="edit-ver">
              <input id="title" name="title" placeholder="Altere o título"/>
              <input id="cover" name="cover" placeholder="Altere a capa"/>
              <input id="sinopse" name="sinopse" placeholder="Altere a sinopse"/>
              <div class="badges-edit">
              <div class="badge"><i class="fas fa-film"></i> 
              <select id="genre" name="genre">
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
              <select id="score" name="score">
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
              <div class="modal-checkbox">
                  <div class="checkbox">
                  <i class="far fa-eye"></i><label for="status"> Assistido? </label><br>
                  <input id="status" type="checkbox" name="status">
                  </div>
                </div>
            </article>
    `
  );
};

// --------------------------- POST MOVIE -------------------------------
const postMovie = async () => {
  const title = document.getElementById("title").value;
  const cover = document.getElementById("cover").value;
  const sinopse = document.getElementById("sinopse").value;
  const genre = document.getElementById("genre").value;
  const score = document.getElementById("score").value;
  const status = document.getElementById("status").checked;
  
  const movieObj = {
    title,
    cover,
    sinopse,
    genre,
    score,
    status
  };

  if (title != "" && cover != "") {
    const response = await fetch(`${apiUrl}/movies/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieObj),
    });
    const data = await response.json();

    alert(data.message);
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
    const textHelper1 = document.getElementById("text-helper1");
    const textHelper2 = document.getElementById("text-helper2");

    textHelper1.style.display = "block";
    textHelper2.style.display = "block";
  }
};

// --------------------------- PUT MOVIE -------------------------------
const putMovie = async (id) => {

  const title = document.getElementById("title").value;
  const cover = document.getElementById("cover").value;
  const sinopse = document.getElementById("sinopse").value;
  const genre = document.getElementById("genre").value;
  const score = document.getElementById("score").value;
  const status = document.getElementById("status").checked;

  const movieEdited = {
    title,
    cover,
    sinopse,
    genre,
    score,
    status
  };

    const response = await fetch(`${apiUrl}/movies/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieEdited),
    }); 
    const data = await response.json();
    alert(data.message);
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