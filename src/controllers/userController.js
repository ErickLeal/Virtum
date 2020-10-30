const User = require('../models/user');
const Inc = require('../models/inc');
const bcrypt = require('bcryptjs');
const { db } = require('../models/user');

module.exports = {
    async cadastrar(req, res) {
        try {
            const { email, nome, senha } = req.body;
            
            const inc = await Inc.findOne({buscador :"increment"})
            
            if (await User.findOne({ email }))
                return res.status(400).json({status: false,mensagem: 'Esse usuário ja existe' })

            const user = await User.create({
                id: "#"+inc.inc,
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
    },
    async editar(req, res) {

        try {
            const {id, novonome} = req.body;

            const user = await User.findOne({ id });

            if (!user)
            return res.send('Usuario não encontrado');

            user.nome = novonome;

            user.save();

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
    async buscaruserid(req, res) {

        try {
            const {id} = req.body;

            const user = await User.findOne({id});

            if (!user)
            return res.send('Usuario não encontrado');

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
            const {id, idamigo} = req.body;

            const user = await User.findOne({id});
            const amigo = await User.findOne({id:idamigo});

            await User.updateOne(
                {id: user.id},
                {
                    $push : {
                        amigos: {
                            idamigo: amigo.id, nome: amigo.nome
                        } 
                    }
                }
            )

            if (!user)
            return res.send('Usuario não encontrado');

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