const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
    async cadastrar(req, res) {
        try {
            const { email, nome, senha } = req.body;

            if (await User.findOne({ email }))
                return res.status(400).json({status: false,mensagem: 'Esse usuário ja existe' })

            const user = await User.create({
                email,
                nome,
                senha,
            });

            return res.json({
                user,
                status: true,
                mensagem: "Cadastrado com sucesso"
            });
        } catch (err) {
            return res.send({
                status: false,
                mensagem: err
            });
        }
    },

    async login(req, res) {

        try {
            const { email, senha } = req.body;

            const user = await User.findOne({ email }).select('+senha');

            if (!user)
                return res.send('Usuario não encontrado');

            if (!await bcrypt.compare(senha, user.senha))
                return res.send({
                    status: false,
                    mensagem: "Senha inválida"
                });

            user.senha = undefined;

            return res.json({
                user,
                status: true,
                mensagem: "Sucesso"
            });
        } catch (err) {
            return res.send({
                status: false,
                mensagem: err
            });
        }
    }
}