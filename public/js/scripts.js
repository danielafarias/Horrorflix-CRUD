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
            <div class="item" id="item" key="${movie.id}"">
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

getMovies();

const movieDetails = async () => {

  const id = document.getElementById("idMovie").value;
  const response = await fetch(`${apiUrl}/movies/${id}`);
  const movie = await response.json();

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
                        target="_blank"
                    >
                    <i class="fas fa-edit"></i>
                        Editar
                    </button>
                    <button
                        role="button"
                        class="button"
                        target="_blank"
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
                <iframe
                width="560"
                height="315"
                src="${movie.trailer}"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                ></iframe>
            </article>
    `
  );
};

// Ele mapeia os dados do formulario que o usuario digitou e envia o objeto criado para a sua funcao responsavel (seja edicao ou cadastro)
const submitForm = async () => {

    // mapear os inputs com os dados que o usuario digitou idependente se é edicao ou cadastro
    const empresa = document.getElementById('empresa').value;
    const oportunidade = document.getElementById('oportunidade').value;
    const tipo = document.getElementById('tipo').value;
    const salario = document.getElementById('salario').value;
    console.log(empresa, oportunidade, tipo, salario);

    // monta o objeto para ser enviado para o backend
    const vaga = {
        empresa,
        oportunidade,
        tipo,
        salario
    }
    console.log(vaga);

    // JSON Stringfy = transforma um objeto/array js em um JSON string
    if(modoEdicao) {
        putVaga(vaga);
    }else {
        postVaga(vaga);
    }
    
}

// [POST] http://localhost:3000/vagas/add - Recebe o objeto transforma em JSON e envia para a api atraves do metodo post
const postVaga = async (vaga) => {

    const response = await fetch(`${apiUrl}/vagas/add`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vaga)
    })
    const data = await response.json();
    alert(data.message);
    // faz a chamada para a api com algumas configuracoes****
    lista.innerHTML = '';
    getVagas();
    limpaCampos();
}

// [PUT] http://localhost:3000/vagas/edit/{id} - recebe o objeto transforma em json e envia para a api juntamente com o seu id para que possa
// ser editado
const putVaga = async (vaga) => {

    const response = await fetch(`${apiUrl}/vagas/edit/${idEdicao}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vaga)
    })
    const data = await response.json();
    alert(data.message);
    // faz a chamada para a api com algumas configuracoes****
    lista.innerHTML = '';
    getVagas();
    limpaCampos();

    modoEdicao = false;
    idEdicao = 0;
}

// preenche os dados do formulario de acordo com a vaga encontrada no backend pelo seu id
const editaVaga = async (id) => {

    modoEdicao = true;
    idEdicao = id;

    // iremos receber o id e atraves do id fazer uma chamdada para a api para buscar os dados de uma vaga por id
    const vaga = await getById(id);

    // iremos popular os inputs com os valores recebidos da chamada
    document.getElementById('empresa').value = vaga.empresa;
    document.getElementById('oportunidade').value  = vaga.oportunidade;
    document.getElementById('tipo').value = vaga.tipo;
    document.getElementById('salario').value = vaga.salario;

}


// recebe um id e faz a chamada para a api e retorna o objeto encontrado
const getById = async (id) => {

    const response = await fetch(`${apiUrl}/vagas/${id}`)
    const vaga = await response.json();
    return vaga
}

//[DELETE] http://localhost:3000/vagas/delete/1 Recebo um id e excluo a vaga do backend
const deleteVaga = async (id) => {
    const response = await fetch(`${apiUrl}/vagas/delete/${id}`, {
        method: 'DELETE'
    })
    const result = await response.json();
    alert(result.message);
    
    // limpos a lista de vagas para que possa ser renderizada novamente sem a vaga que excluimos
    lista.innerHTML = '';
    getVagas();
}

// limpa os campos do formulario (inputs)
const limpaCampos = () => {

    document.getElementById('empresa').value = '';
    document.getElementById('oportunidade').value = '';
    document.getElementById('tipo').value = '';
    document.getElementById('salario').value = '';
}

////////////////////////////////////////////////////////////////////////////////

// var item = document.getElementById("item");
// var modal = document.getElementById("modal");
// item.onclick = function() {
//     modal.style.display = "block";
//   }

var close = document.getElementById("close");
close.onclick = function() {
    modal.style.display = "none";
  } 