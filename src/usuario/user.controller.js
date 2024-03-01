import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const userPost = async (req, res) => {
  const { nombre, email, contra } = req.body;
  const user = new User({ nombre, email, contra });

  const salt = bcryptjs.genSaltSync();
  user.contra = bcryptjs.hashSync(contra, salt);

  await user.save();
  res.status(200).json({ user });
};


export const userGet = async (req, res) => {
  const { limit, from } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);
  res.status(200).json({ total, users });
};