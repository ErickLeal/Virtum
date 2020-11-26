const mongoose = require('mongoose');

const fichasSchema = new mongoose.Schema({
    nome: {
        Type: String
    },
    classe: {
        Type: String
    },
    raca: {
        Type: String
    },
    nivel: {
        Type: String
    },
    habilidade: {
        Type: String
    },
    equipamento: {
        Type: String
    },
    vida_total: {
        Type: String
    },
    vida_atual: {
        Type: String
    },
    deslocamento: {
        Type: String
    },
    id_jogador: {
        Type: String
    }
})

const reinoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    nome: {
        type: String,
        required: true
    },
    id_mestre: {
        type: String,
        required: true
    },
    nome_mestre: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    fichas: [{
        classe:{
            type: String,
            required: true
        },
        nome:{
            type: String,
            required: true
        },
        raca:{
            type: String,
            required: true
        },
        nivel:{
            type: String,
            required: true
        },
        habilidade:{
            type: String,
            required: true
        },
        equipamento:{
            type: String,
            required: true
        },
        id_jogador:{
            type: String,
            required: true
        },
        vida_total:{
            type: String,
            required: true
        },
        vida_atual:{
            type: String,
            required: true
        },
        deslocamento:{
            type: String,
            required: true
        }
    }],   
    
});

module.exports = mongoose.model('Reino', reinoSchema);