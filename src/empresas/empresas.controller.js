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
  