const apiUrl = "http://localhost:3000";
let editId = 0;

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
    document.getElementById("modal").checked = true;
  } else {
    document.getElementById("modal").checked = false;
  }

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
                        onclick="movieOpenEdit()"
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
};

// --------------------------- MODAL EDIÇÃO -------------------------------
const movieOpenEdit = async () => {
  
  document.getElementById("modal").style.display = "none";
  
  document.getElementById("edit").style.display = "block";
  
  // const response = await fetch(`${apiUrl}/movies/${id}`);
  // const data = await response.json();

  // var title = document.getElementById("title").value = data.title;
  // var cover = document.getElementById("cover").value = data.cover;
  // var sinopse = document.getElementById("sinopse").value = data.sinopse;
  // var genre = document.getElementById("genre").value = data.genre;
  // var score = document.getElementById("score").value = data.score;

  // console.log(data);
  // console.log(document.getElementById("title").value)

  // document.getElementById("edit-content").insertAdjacentHTML(
  //   "beforeend",
  //   `
  //           <div class="actions">
  //               <img
  //               class="movie-box"
  //               src="${cover}"
  //               alt="Poster de um filme"
  //               />
  //               <div class="buttons">
  //                   <button
  //                       role="button"
  //                       class="button"
  //                       id="edit-btn"
  //                   >
  //                   <i class="fas fa-edit"></i>
  //                       Confirmar alteração
  //                   </button>
                    
  //               </div>
  //           </div>
  //           <article id="edit-ver">
  //             <input defaultValue="${title}" id="title" name="title" placeholder="Altere o título"/>
  //             <input defaultValue="${cover}" id="cover" name="cover" placeholder="Altere a capa"/>
  //             <input defaultValue="${sinopse}" id="sinopse" name="sinopse" placeholder="Altere a sinopse"/>
  //             <div class="badges-edit">
  //             <div class="badge"><i class="fas fa-film"></i> 
  //             <select defaultValue="${genre}" id="genre" name="genre">
  //               <option disabled selected>Selecione o gênero</option>
  //               <option>Terror Psicológico</option>
  //               <option>Thriller</option>
  //               <option>Sobrenatural</option>
  //               <option>Found Footage</option>
  //               <option>Gore</option>
  //               <option>Slasher</option>
  //               <option>Body Horror</option>
  //               <option>Trash</option>
  //               <option>Terror Cósmico</option>
  //               <option>Terror Cômico</option>
  //               <option>Terror Teen</option>
  //             </select></div>

  //             <div class="badge"><i class="fas fa-star"></i> 
  //             <select defaultValue="${score}" id="score" name="score">
  //             <option disabled selected>Avalie</option>
  //             <option>1</option>
  //             <option>2</option>
  //             <option>3</option>
  //             <option>4</option>
  //             <option>5</option>
  //             <option>6</option>
  //             <option>7</option>
  //             <option>8</option>
  //             <option>9</option>
  //             <option>10</option>
  //             </select></div>
  //             </div>
  //             <div class="modal-checkbox">
  //                 <div class="checkbox">
  //                 <i class="far fa-eye"></i><label for="status"> Assistido? </label><br>
  //                 <input id="status" type="checkbox" name="status">
  //                 </div>
  //               </div>
  //           </article>
  //   `
  // );
  
  // document.getElementById("edit-btn").onclick = function () {
  //   putMovie(data.id)
  //   console.log(document.getElementById("title").value);
  // }

};

// --------------------------- POST MOVIE -------------------------------
const postMovie = async () => {
  var title = document.getElementById("title").value;
  var cover = document.getElementById("cover").value;
  var sinopse = document.getElementById("sinopse").value;
  var genre = document.getElementById("genre").value;
  var score = document.getElementById("score").value;
  var status = document.getElementById("status").checked;
  
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
// const putMovie = async (id) => {
//   const title = document.getElementById("title").value;
//   const cover = document.getElementById("cover").value;
//   const sinopse = document.getElementById("sinopse").value;
//   const genre = document.getElementById("genre").value;
//   const score = document.getElementById("score").value;
//   const status = document.getElementById("status").checked;

//   const movieEdited = {
//     title,
//     cover,
//     sinopse,
//     genre,
//     score,
//     status
//   };


//   console.log(title);

//     const response = await fetch(`${apiUrl}/movies/edit/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(movieEdited),
//     }); 
//     const data = await response.json();
//     alert(data.message);
//     document.getElementById("cards").insertAdjacentHTML(
//       "beforeend",
//       `
//           <div class="item" id="item" key="${data.id}" onclick="movieDetails(${data.id})">
//               <img
//                   class="movie-box"
//                   src="${data.cover}"
//                   alt="Poster de um filme"
//               />
//           </div>
//       `
//     );
//     getMovies();
//     window.location.reload();
// };

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

// --------------------------- PUT MOVIES ------------------------
const submitEdit = async () => {

  const title = document.getElementById("titleEdit").value;
  const cover = document.getElementById("coverEdit").value;
  const sinopse = document.getElementById("sinopseEdit").value;
  const genre = document.getElementById("genreEdit").value;
  const score = document.getElementById("scoreEdit").value;
  const status = document.getElementById("statusEdit").checked;

  const movie = {
    title,
    cover,
    sinopse,
    genre,
    score,
    status
  }
  
  putMovie(movie);
}

const putMovie = async (movie) => {

  const response = await fetch(`${apiUrl}/movies/edit/${editId}`, {
      method: 'PUT',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(movie)
  })
  const data = await response.json();
  alert(data.message);
  document.getElementById("cards").innerHTML = '';
  getMovies();
  reset();
}

const movieEdit = async (id) => {
  editId = id;

  const movie = await getById(id);

  document.getElementById("titleEdit").value = movie.title;
  document.getElementById("coverEdit").value = movie.cover;
  document.getElementById("coverEdit").src = movie.cover;
  document.getElementById("sinopseEdit").value = movie.sinopse;
  document.getElementById("genreEdit").value = movie.genre;
  document.getElementById("scoreEdit").value = movie.score;
  document.getElementById("statusEdit").checked = movie.status;

  console.log(movie);
  console.log(document.getElementById("titleEdit").value);
}

const getById = async (id) => {
  const response = await fetch(`${apiUrl}/movies/${id}`)
  const movie = await response.json();
  return movie
}