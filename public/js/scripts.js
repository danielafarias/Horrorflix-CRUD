const apiUrl = "http://localhost:3000";
let editMode = false;
let editId = 0;

const cards = document.getElementById("cards");

const getMovies = async () => {
  const response = await fetch(`${apiUrl}/movies`);
  const movies = await response.json();

  movies.map((movie) => {
    console.log(movie.title);
    cards.insertAdjacentHTML(
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

// getMovies();

const movieDetails = async (id) => {
  const response = await fetch(`${apiUrl}/movies/${id}`);
  const movie = await response.json();

  var modal = document.getElementById("modal");
 
  modal.style.display = "block";


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

const movieOpenEdit = async (id) => {
  document.getElementById("modal-content").innerHTML = "";
  const response = await fetch(`${apiUrl}/movies/${id}`);
  const movie = await response.json();

  var modal = document.getElementById("modal");
 
  modal.style.display = "block";


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
                        onclick="putVaga(${movie.id})"
                    >
                    <i class="fas fa-edit"></i>
                        Confirmar alteração
                    </button>
                    
                    </div>
            </div>
            <article id="edit-ver">
              <input value="${movie.title}"/>
              <input value="${movie.cover}"/>
              <input value="${movie.sinopse}"/>
              <div class="badges-edit">
              <div class="badge"><i class="fas fa-film"></i> <select value="${movie.genre}">
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

              <div class="badge"><i class="fas fa-star"></i> <select value="${movie.score}">
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
};

const postMovie = async () => {
  const title = document.getElementById("title").value;
  const cover = document.getElementById("cover").value;
  const sinopse = document.getElementById("sinopse").value;
  const genre = document.getElementById("genre").value;
  const score = document.getElementById("score").value;
  
  const movie = {
    title,
    cover,
    sinopse,
    genre,
    score
  };

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
  // faz a chamada para a api com algumas configuracoes****
  cards.insertAdjacentHTML(
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
    var textHelper1 = document.getElementById("text-helper1");
    var textHelper2 = document.getElementById("text-helper2");

    textHelper1.style.display = "block";
    textHelper2.style.display = "block";
  }
};

const putVaga = async (id) => {
  const title = document.getElementById("title").value;
  const cover = document.getElementById("cover").value;
  const sinopse = document.getElementById("sinopse").value;
  const genre = document.getElementById("genre").value;
  const score = document.getElementById("score").value;
  
  const movie = {
    title,
    cover,
    sinopse,
    genre,
    score
  };

 if (title != "" && cover != "") {
  const response = await fetch(`${apiUrl}/vagas/edit/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });
  const data = await response.json();
  alert(data.message);
  // faz a chamada para a api com algumas configuracoes****
  cards.insertAdjacentHTML(
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
  getVagas();
  limpaCampos();

  modoEdicao = false;
  idEdicao = 0;
 }
};

// preenche os dados do formulario de acordo com a vaga encontrada no backend pelo seu id
const editaVaga = async (id) => {
  modoEdicao = true;
  idEdicao = id;

  // iremos receber o id e atraves do id fazer uma chamdada para a api para buscar os dados de uma vaga por id
  const vaga = await getById(id);

  // iremos popular os inputs com os valores recebidos da chamada
  document.getElementById("empresa").value = vaga.empresa;
  document.getElementById("oportunidade").value = vaga.oportunidade;
  document.getElementById("tipo").value = vaga.tipo;
  document.getElementById("salario").value = vaga.salario;
};

// recebe um id e faz a chamada para a api e retorna o objeto encontrado
const getById = async (id) => {
  const response = await fetch(`${apiUrl}/vagas/${id}`);
  const vaga = await response.json();
  return vaga;
};

//[DELETE] http://localhost:3000/vagas/delete/1 Recebo um id e excluo a vaga do backend
const deleteVaga = async (id) => {
  const response = await fetch(`${apiUrl}/vagas/delete/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();
  alert(result.message);

  // limpos a lista de vagas para que possa ser renderizada novamente sem a vaga que excluimos
  lista.innerHTML = "";
  getVagas();
};

// limpa os campos do formulario (inputs)
const limpaCampos = () => {
  document.getElementById("title").value = "";
  document.getElementById("cover").value = "";
  document.getElementById("sinopse").value = "";
  document.getElementById("genre").value = "";
  document.getElementById("score").value = "";
};

////////////////////////////////////////////////////////////////////////////////


var close = document.getElementById("close");
close.onclick = function () {
  modal.style.display = "none";

  document.getElementById("modal-content").innerHTML = "";
};

// window.onclick = function () {
//   modal.style.display = "none";

//   document.getElementById("modal-content").innerHTML = "";
// };