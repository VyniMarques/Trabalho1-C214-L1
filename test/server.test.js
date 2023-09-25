const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../src/server')
const expect = chai.expect;
const { apagarLinha } = require('../src/server');

chai.use(chaiHttp);

//--------------------------------------------------------------------------------------------
describe('Teste Adicionar', ()=> {

  it('Teste para adicionar tarefa a fazer', (done) =>{
      chai.request(app)
          .post('/salvar-tarefa')
          .send({ titulo: 'Tarefa1', descricao: 'Exemplo1', status: 'A fazer' })
          .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.include('Arquivo salvo em');
          apagarLinha();
          done();
          });
  })

  it('Teste para adicionar tarefa em andamento', (done) =>{
      chai.request(app)
          .post('/salvar-tarefa')
          .send({ titulo: 'Tarefa2', descricao: 'Exemplo2', status: 'Em andamento' })
          .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.include('Arquivo salvo em');
          apagarLinha();
          done();
          });
  })
})
//--------------------------------------------------------------------------------------------
describe('Teste Visualizar', ()=> {

  it('Teste visualizar tarefa', () =>{
      
  })

})
//--------------------------------------------------------------------------------------------
describe('Teste Atualizar', ()=> {
  it('Teste para atualizar tarefa', () =>{
      
  })
})
//--------------------------------------------------------------------------------------------
describe('Teste Excluir', ()=> {
  it('Teste para excluir tarefa existente', () =>{
      
  })

  it('Teste para excluir tarefa inexistente', () =>{
      
  })
})
//--------------------------------------------------------------------------------------------

after(() => {
  // Encerrar o servidor
  chai.request(app).close(process.exit(0))
});