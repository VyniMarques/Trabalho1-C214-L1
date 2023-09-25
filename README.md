# Trabalho 1 C214-L1

Repositório para o Trabalho 1 de C214-L1

Integrantes:
- Vinicius Ximenes Pinto Marques - GES - 73
- Caio Lima Ramos - GES - 72
- Tiago Rodrigues Plum Ferreira - GEC - 1996

 O código realiza testes para diferentes operações em uma lista de tarefas. Aqui está uma explicação sucinta do código:
Importação de Módulos:

express: Importa o framework Express.js.
chai: Importa a biblioteca de assertividade Chai.
chai-http: Importa o plugin do Chai para testes HTTP.
app: Importa o servidor Express real que você deseja testar.
expect: Importa a função expect do Chai para asserções.
Configuração do Chai:

Usa chai.use(chaiHttp) para configurar o Chai para trabalhar com testes HTTP.
Blocos de Descrição e Testes:
O código está dividido em blocos describe, cada um representando um conjunto de testes relacionados.

Teste para Adicionar:
Dois testes estão dentro do bloco "Teste Adicionar". Eles simulam a adição de tarefas com diferentes status (A fazer e Em andamento) fazendo solicitações POST para /salvar-tarefa.
Usa chai.request(app) para fazer a solicitação HTTP e, em seguida, faz asserções nos resultados da resposta.

Teste para Visualizar:
Este teste está dentro do bloco "Teste Visualizar". Ele simula uma solicitação GET para /obter-tarefas para verificar a visualização de tarefas.
Realiza uma asserção no código de status da resposta.

Teste para Atualizar:
Este teste está dentro do bloco "Teste Atualizar". Ele simula a atualização do status de uma tarefa usando uma solicitação PUT para /atualizar-tarefa/Tarefa1.
Envia um objeto com a nova propriedade 'status' como parte do corpo da solicitação.
Realiza uma asserção no código de status da resposta.

Teste para Excluir:
Este teste está dentro do bloco "Teste Excluir". Ele simula a exclusão de uma tarefa existente usando uma solicitação DELETE para /deletar-tarefa/Tarefa1.
Realiza uma asserção no código de status da resposta.
