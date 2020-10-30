const User = require('../models/user');
const Inc = require('../models/inc');
const bcrypt = require('bcryptjs');
const { db } = require('../models/user');

module.exports = {
    async cadastrar(req, res) {
        try {
            const { email, nome, senha } = req.body;

            const inc = await Inc.findOne({ buscador: "increment" })

            if (await User.findOne({ email }))
                return res.status(400).json({ status: false, mensagem: 'Esse usuário ja existe' })

            const user = await User.create({
                id: "#" + inc.inc,
                email,
                nome,
                senha,
            });
            inc.inc++;
            inc.save();

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
                return res.json({ status: false, mensagem: 'Usuario não encontrado' });

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
    },
    async alterarnome(req, res) {

        try {
            const { id, nome } = req.body;

            const user = await User.findOne({ id });

            if (!user)
                return res.status(400).json({ status: false, mensagem: 'Usuário não encontrado' })

            user.nome = nome;

            user.save();

            return res.json({
                user,
                status: true,
                mensagem: "Sucesso"
            });
        } catch (err) {
            return res.json({
                status: false,
                mensagem: err
            });
        }
    },
    async buscaruserid(req, res) {

        try {
            const { ids } = req.body;

            const user = await User.find({ "id": { "$in": ids } });

            if (!user)
                return res.status(400).json({ status: false, mensagem: 'Usuário não encontrado' })

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
    },
    //inacabado
    async adicionaramigo(req, res) {

        try {
            const { id, idamigo } = req.body;

            const user = await User.findOne({ id: id });
            if (!user)
                return res.status(400).json({ status: false, mensagem: 'Usuário não encontrado' })


            const amigo = await User.findOne({ id: idamigo });

            if (!amigo)
                return res.status(400).json({ status: false, mensagem: 'Amigo não encontrado' })

            await User.updateOne(
                { id: id },
                { $push: { amigos: { _id: amigo._id, nome: amigo.nome, idamigo: amigo.id } } },
            );

            return res.json({
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