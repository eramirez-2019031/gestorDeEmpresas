const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('./user.model');
const { generarJWT } = require("../helpers/generate-jwt");

const usuarioGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        usuarios
    });
}
const usuarioDelete = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
        msg: 'El Usuario fue eliminado exitosamente'
    });
}
const usuarioPost = async (req, res) => {
    const { nombre, email, contra } = req.body;
    const usuario = new Usuario({ nombre, email, contra, rol });

    const salt = bcryptjs.genSaltSync();
    usuario.contra = bcryptjs.hashSync(contra, salt);
    await usuario.save();
    res.status(200).json({
        usuario
    });
}
const usuarioLogin = async (req, res) => {
    const { email, contra } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario no encontrado'
            });
        }
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario borrado de la base de datos'
            })
        }
        const contraValida = bcryptjs.compareSync(contra, usuario.contra);

        if (!contraValida) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }
        const token = await generarJWT(usuario.id)

        res.status(200).json({
            msg_1: 'Inicio sesión exitosamente',
            msg_2: 'Bienvenido: ' + usuario.nombre,
            msg_3: 'token: ' + token,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Error, consultar con admin'
        })
    }

}

module.exports = {
    usuarioDelete,
    usuarioPost,
    usuarioGet,
    usuarioLogin
}