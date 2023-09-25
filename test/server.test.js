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

describe('Teste Visualizar', () => {
  it('Verificar se a pagina esta funcionando', (done) => {
    chai.request(app)
      .get('/obter-tarefas')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Verifica a tarefa foi criada', (done) => {

    chai.request(app)
    .post('/salvar-tarefa')
    .send({ titulo: 'Tarefa1', descricao: 'Exemplo1', status: 'A fazer' })
    .end((err, res) => {
      expect(res).to.have.status(200);
    
      chai.request(app)
      .get('/obter-tarefas')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);  
        done();
        });
    });
  });
});


describe('Teste Atualizar', () => {
  it('Teste para atualizar uma tarefa existente de a fazer para Em andamento', (done) => {

    chai.request(app)
      .post('/salvar-tarefa')
      .send({ titulo: 'Tarefa1', descricao: 'Exemplo1', status: 'A fazer' })
      .end((err, res) => {
        expect(res).to.have.status(200);

        chai.request(app)
          .put('/atualizar-tarefa/Tarefa1')
          .send({ status: 'Em andamento' })
          .end((err, res) => {
            expect(res).to.have.status(200);
            apagarLinha();
            done();
          });
      });
    });
    it('Teste para atualizar uma tarefa existente de a fazer para Concluido', (done) => {

      chai.request(app)
        .post('/salvar-tarefa')
        .send({ titulo: 'Tarefa1', descricao: 'Exemplo1', status: 'A fazer' })
        .end((err, res) => {
          expect(res).to.have.status(200);
  
          chai.request(app)
            .put('/atualizar-tarefa/Tarefa1')
            .send({ status: 'Concluido' })
            .end((err, res) => {
              expect(res).to.have.status(200);
              apagarLinha();
              done();
            });
        });
      });
});
//--------------------------------------------------------------------------------------------
describe('Teste Excluir', () => {
  it('Teste para excluir tarefa existente', (done) => {
      chai.request(app)
      .post('/salvar-tarefa')
      .send({ titulo: 'Tarefa1', descricao: 'Exemplo1', status: 'A fazer' })
      .end((err, res) => {
        expect(res).to.have.status(200);
      
      chai.request(app)
        .delete('/deletar-tarefa/Tarefa1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.include('Tarefa removida com sucesso.');
        done();
        apagarLinha();
      });
      
    });
  });
  it('Teste para excluir tarefa não existente', (done) => {   
    chai.request(app)
      .delete('/deletar-tarefa/Tarefa1')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.include('Tarefa não encontrada.');
      done();
    });
    
  });
});

after(() => {
  chai.request(app).close(process.exit(0))
});