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
        id:{
            type: String,
            required: true
        },
        nome:{
            type: String,
            required: true
        },
        id_mestre:{
            type: String,
            required: true
        },
        nome_mestre:{
            type: String,
            required: true
        },
        categoria:{
            type: String,
            required: true
        },
        descricao:{
            type: String,
            required: true
        }
    }],   
    
});

module.exports = mongoose.model('Reino', reinoSchema);