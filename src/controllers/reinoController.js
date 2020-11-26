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
                mensagem: err 
            });
           
        }
    },

    async buscar(req, res) {
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
                mensagem: err 
            });
           
        }
    },

}