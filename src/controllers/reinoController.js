const Reino = require('../models/reino');
const Inc = require('../models/inc');

module.exports = {
    async criar(req, res) {
        try {
            const { nome, id_mestre, nome_mestre,categoria,descricao } = req.body;

            const inc = await Inc.findOne({ buscador: "increment" })

            const reino = await Reino.create({
                id: "#" + inc.reino,
                nome,
                id_mestre,
                nome_mestre,
                categoria,
                descricao
            });
            inc.reino++;
            inc.save();

            return res.json({
                status: true,
                mensagem: "Reino criado com sucesso"
            });
        } catch (err) {
            return res.json({
                status: false,
                mensagem: err.message
            });
           
        }
    },

    async buscar(req, res) {

        try {
            const { nome } = req.body;
            var reinos = []

            if(nome){
                reinos = await Reino.find({ "nome": { $regex: nome, $options: 'i' } });
            }else{
                reinos = await Reino.find({});
            }

            return res.json({
                reinos,
                status: true,
                mensagem: "Sucesso"
            });
        } catch (err) {
            return res.send({
                status: false,
                mensagem: err.message
            });
        }
    },

    async editar(req, res) {

        try {
            const { id, descricao } = req.body;

            const reino = await Reino.findOne({ id });

            if (!reino)
                return res.status(400).json({ status: false, mensagem: 'Reino não encontrado' })

            reino.descricao= descricao;

            reino.save();

            return res.json({
                status: true,
                mensagem: "Sucesso"
            });
        } catch (err) {
            return res.json({
                status: false,
                mensagem: err.message
            });
        }
    },

}