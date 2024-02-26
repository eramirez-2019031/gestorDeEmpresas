const Usuario = require('../usuario/user.model');

const existenteEmail = async (email = '') => {
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
        throw new Error(`El email ${ email } ya fue registrado`);
    }
}

const noExistenteEmail = async (email = '') => {
    const existeEmail = await Usuario.findOne({email});
    if(!existeEmail){
        throw new Error(`El email ${ email } no existe`);
    }
}

const existeUsuarioById = async ( id = '') => {
    const existeUsuario = await Usuario.findOne({id});
    if(existeUsuario){
        throw new Error(`El usuario con el id: ${ id } no existe`);
    }
}

module.exports = {
    existenteEmail,
    existeUsuarioById,
    noExistenteEmail,
}