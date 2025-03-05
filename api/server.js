const express = require('express'); // importa o framework express para criar a api
const cors = require('cors'); // importa o cors para permitir que a api seja acessada por qualquer domínio

const app = express(); // cria a aplicação express
app.use(express.json()); // permite que a api receba requisições no formato json
app.use(cors()); // permite que a api seja acessada por qualquer domínio

/* lista de tarefas, banco de dados temporário */
let tarefas = [
    {
        "titulo": "teste",
        "descricao": "05/03",
        "id": 10
    }
];

/* rota para listar todas as tarefas */
app.get('/tarefas', (req, res) => {
    res.json(tarefas); // retorna a lista de tarefas como Json
});

/* rota para criar uma nova tarefa */
app.post('/tarefas', (req, res) => {
    const novaTarefa = {
        titulo: req.body.titulo, // pega o titulo da tarefa enviado no corpo da requisição
        descricao: req.body.descricao, // pega a descrição da tarefa enviado no corpo da requisição
        id: tarefas.length + 1 // gera um id para a nova tarefa
    };
    tarefas.push(novaTarefa); // adiciona a nova tarefa na lista de tarefas
    res.json(novaTarefa); // retorna a nova tarefa como Json
});

/* rota para deletar uma tarefa */
app.delete('/tarefas/:id', (req, res)=>{
    const id = parseInt(req.params.id); // pega o id da tarefa enviado na url
    tarefas = tarefas.filter(tarefa => tarefa.id !== id); // filtra a lista de tarefas removendo a tarefa com o id informado
    res.json({mensagem: "Tarefa removida com sucesso!"}); // retorna uma mensagem de sucesso
});

/* rota para atualizar uma tarefa */
app.put('/tarefas/:id', (req, res)=>{
    const id = parseInt(req.params.id); // pega o id da tarefa enviado na url
    const tarefa = tarefas.find(tarefa => tarefa.id === id); // busca a tarefa na lista de tarefas
    tarefa.titulo = req.body.titulo; // atualiza o titulo da tarefa
    tarefa.descricao = req.body.descricao; // atualiza a descrição da tarefa
    res.json(tarefa); // retorna a tarefa atualizada
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app; // exporta a aplicação express para ser utilizada em outro arquivo