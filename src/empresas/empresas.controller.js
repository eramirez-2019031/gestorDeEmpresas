import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import Empresa from './empresas.model.js';

export const empresaPost = async (req, res) => {
    const { nombreE, nivelImpacto, años, categoria } = req.body;
    const empresa = new Empresa({  nombreE, nivelImpacto, años, categoria });  
    await empresa.save();
    res.status(200).json({ empresa });
};

  export const empresaGet = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { estado: true};
  
    const [total, empresa] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
  
    res.status(200).json({
        total,
        empresa
    });
}

export const businessGET = async (req, res = response) => {
  const { order } = req.params;

  let sortBy, orderBy;

  switch (parseInt(order)) {
    case 1:
      sortBy = "nombre";
      orderBy = "asc";
      break;
    case 2:
      sortBy = "nombre";
      orderBy = "desc";
      break;
    case 3:
      sortBy = "años";
      orderBy = "asc";
      break;
    case 4:
      sortBy = "años";
      orderBy = "desc";
      break;
    case 5:
      sortBy = "categoria";
      orderBy = "asc";
      break;
    case 6:
      sortBy = "categoria";
      orderBy = "desc";
      break;
    default:
      sortBy = "nombre";
      orderBy = "asc";
      break;
  }

  try {
    const empresa = await businessModel.find().sort({ [sortBy]: orderBy });

    res.status(200).json({
      empresa,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "No se pudo",
      error: error.message,
    });
  }
};

export const empresaPut = async (req, res) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;

  const empresa = await Empresa.findByIdAndUpdate(id, resto);
  res.status(200).json({
      msg: 'La Empresa fue  actualizada Correctamente'
  })
}

export const getEmpresaByid = async (req, res) => {
  const { id } = req.params;
  const empresa = await Empresa.findOne({ _id: id });
  res.status(200).json({
      empresa
  });
}


  