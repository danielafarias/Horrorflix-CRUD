const blueVagas = [
    {
        id: 1,
        empresa: "Blue",
        salario: 3000,
        oportunidade: "Front-End Jr",
        tipo: "estágio"
    },
    {
        id: 2,
        empresa: "Google",
        salario: 10000,
        oportunidade: "Front-End Jr",
        tipo: "CLT"
    },
    {
        id: 3,
        empresa: "Facebook",
        salario: 20000,
        oportunidade: "Full Stack Sr",
        tipo: "PJ"
    },
    {
        id: 4,
        empresa: "Amazon",
        salario: 15000,
        oportunidade: "Full Stack Pl",
        tipo: "CLT"
    }
]

const getVagasService = () => {
    return blueVagas
}

const getVagasByIdService = (idParam) => {
    return blueVagas.find((vaga) => vaga.id == idParam)
}

// cadastra uma nova vaga(obj) na lista blueVagas
const addVaga = (newVaga) => {
    // monto um id falso para a minha nova vaga
    const newId = blueVagas.length + 1;
    newVaga.id = newId;
    // adiciono essa nova vaga no array
    blueVagas.push(newVaga);
    return newVaga;
}

// ela vai procurar um objeto de acordo com o seu id e trocar os seus valores
const putVaga = (idParam, vagaEdit) => {
    // // criamos o campo id dentro do objeto para ser substituido
    // vagaEdit['id'] = parseInt(id);
    // const index = id - 1;
    // // busco o item na lista de acordo com o seu index
    // blueVagas[index] = vagaEdit;
    // return vagaEdit;

    // busco o indice da vaga que ele acha com o id que estou passando
    const index = blueVagas.findIndex((vaga) => vaga.id == idParam);

    // verifico se ele realmente encontrou um indice valido na lista
    if(index >= 0) {
        // SPREAD OPERATOR ...
        //faz um espelho da vaga na lista e um espelho da vaga editada e junta as duas trocando apenas o que é necessario.
        blueVagas[index] = {
            ...blueVagas[index],
            ...vagaEdit
        }
        
        // retornamos um booleano true para o contoller poder saber que a edicao foi feita com sucesso;
        return true
    } else {
        // retornamos um booleano false para o contoller poder saber que a edicao teve um erro.
        return false
    }
}

const deleteVaga = (idParam) => {
    const index = blueVagas.findIndex((vaga) => vaga.id == idParam)
    // startnumber = qual a posicao que deve ser iniciada a exclusao 
    // deleteCount = quantidade de items para ser excluido
    const vagaExcluida = blueVagas[index];
    blueVagas.splice(index, 1)
    return vagaExcluida;
}

module.exports = {
    getVagasService,
    getVagasByIdService,
    addVaga,
    putVaga,
    deleteVaga
}
