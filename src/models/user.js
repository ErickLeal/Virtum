const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
    },
    nome: {
        type: String,
        required: true
    },

    senha: {
        type: String,
        required: true
    }
});


//Set para quando for salvar o campo password no banco, salve criptografado
userSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;
    next();
});

module.exports = mongoose.model('User', userSchema);