const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./src'); 
const expect = chai.expect;

chai.use(chaiHttp);

//--------------------------------------------------------------------------------------------
  describe('Teste Adicionar', ()=> {

    it('Teste para adicionar tarefa a fazer', () =>{
        chai.request(app)
            .post('/salvar-tarefa')
            .send({ titulo: 'Tarefa1', descricao: 'Exemplo1', status: 'A fazer' })
            .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.text).to.include('Arquivo salvo em');
            done();
            });
    })

    it('Teste para adicionar tarefa em andamento', () =>{
        chai.request(app)
            .post('/salvar-tarefa')
            .send({ titulo: 'Tarefa2', descricao: 'Exemplo2', status: 'Em andamento' })
            .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.text).to.include('Arquivo salvo em');
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
