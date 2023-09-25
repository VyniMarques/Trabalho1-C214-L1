const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const XLSX = require('xlsx');
const fs = require('fs');

const app = express();
const PORT = 3000;

let wb = XLSX.utils.book_new();
let tarefas = [];
let nomeArquivo = 'tarefa.xlsx';
let caminho = path.join(__dirname, 'pastaTarefas', nomeArquivo);

function modificaTabela(){
  const pastaDestino = path.dirname(caminho);
  if (!fs.existsSync(pastaDestino)) {
      fs.mkdirSync(pastaDestino, { recursive: true });
  }

  XLSX.writeFile(wb, caminho);
}

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/paginas/criar_tarefa.html', (req, res) => {
    app.use(bodyParser.urlencoded({ extended: true }));  
  });

app.get('/pesquisar-tarefa/:titulo', (req, res) => {
    const titulo = req.params.titulo;
    const tarefaEncontrada = tarefas.find(tarefa => tarefa.titulo === titulo);
    if (tarefaEncontrada) {
        res.json({ existe: 'true' });
    } else {
        res.json({ existe: 'false' });
    }
});
app.put('/atualizar-tarefa/:titulo', (req, res) => {
  const titulo = req.params.titulo;
  const {status } = req.body;

  const index = tarefas.findIndex(tarefa => tarefa.titulo === titulo);

  tarefas[index].status = status;


  modificaTabela();

  res.status(200).send('Tarefa atualizada.');
  return;
});

app.post('/salvar-tarefa', (req, res) => {
  const titulo = req.body.titulo;
  const descricao =  req.body.descricao;
  const status = req.body.status;

  cabecalho = {titulo: 'Titulo', descricao:'Descricao', status:'Status'}
  if (tarefas.length === 0){
    tarefas.push(cabecalho)
  }
  tarefas.push({ titulo, descricao, status });

  const data = tarefas.map(tarefa => [tarefa.titulo, tarefa.descricao, tarefa.status]);
  const ws = XLSX.utils.aoa_to_sheet(data);
  wb.SheetNames = ['Tarefas'];
  wb.Sheets['Tarefas'] = ws;

  modificaTabela();
  
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Arquivo salvo em: ${caminho}`);
});
  
app.delete('/deletar-tarefa/:nome', (req, res) => {
  const nomeTarefa = req.params.nome;

  const indice = tarefas.findIndex(tarefa => tarefa.titulo === nomeTarefa);

  if (indice === -1) {
      res.status(400).send('Tarefa não encontrada.');
      return;
    }

  tarefas.splice(indice, 1);

  const data = tarefas.map(tarefa => [tarefa.titulo, tarefa.descricao, tarefa.status]);
  const ws = XLSX.utils.aoa_to_sheet(data);
  wb.SheetNames = ['Tarefas'];
  wb.Sheets['Tarefas'] = ws;
  modificaTabela();

  res.status(200).send('Tarefa removida com sucesso.');
}); 

app.get('/obter-tarefas', (req, res) => {
  res.json(tarefas);
});

app.get('/paginas/lista_tarefas.html', (req, res) => {
  res.send('Página de lista de tarefas');
});

app.get('/paginas/atualizar_tarefa.html', (req, res) => {
  res.send('Página de atualização de tarefa');
});

app.get('/paginas/deletar_tarefa.html', (req, res) => {
  res.send('Página de exclusão de tarefa');
});
app.get('/paginas/projeto.html', (req, res) => {
    res.send('Página de exclusão de tarefa');
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function apagarLinha(){
  tarefas.pop();
  const data = tarefas.map(tarefa => [tarefa.titulo, tarefa.descricao, tarefa.status]);
  const ws = XLSX.utils.aoa_to_sheet(data);
  wb.SheetNames = ['Tarefas'];
  wb.Sheets['Tarefas'] = ws;
  modificaTabela();
}

module.exports = {app, apagarLinha};