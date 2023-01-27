import { handleErrorResponse } from '../helpers/handleErrors.js'
import { userModel, taskModel } from '../models/index.js'
import bcrypt from "bcrypt";
import { generateJWT } from "../helpers/generate-JWT.js";

export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    // Crear una instancia de un registro
    const newUser = new userModel(req.body);

    // Encriptar pass
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(hash);
    newUser.password = hash;

      // Guardar en nuestra DB
    await newUser.save();

    // Responder si la creacion fue correcta
    res.status(201).json({
      message: "Usuario creado",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear usuario",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('login..', email, password);

  try {
    // Verificar si existe el usuario por email
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(400).json({
        msg: "Usuario no encontrado",
      });

    // Verificar password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        msg: "Password incorrecto",
      });

    // generar el token
    const token = await generateJWT({
      id: user._id,
      name: `${user.username}`,
    });

    res.status(200).json({
      msg: "Usuario login exitoso",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const createTaskUser = async (req, res) => {
  const { userId } = req.params

  try {
    const task = await taskModel.create(req.body)

    const user = await userModel
      .findByIdAndUpdate(
        userId,
        { $push: { tasks: task } },
        { new: true, upsert: true }
      )
      .populate('tasks')
      .lean()

    const { username, tasks } = user

    res.status(200).json({
      message: 'Task added',
      username,
      tasks,
    })
  } catch (error) {
    handleErrorResponse(res, 500, error)
  }
}

export const listTaskUser = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await userModel.findById(userId).populate('tasks').lean()

    const { username, tasks } = user

    res.status(200).json({
      message: 'Task list user',
      username,
      tasks,
    })
  } catch (error) {
    handleErrorResponse(res, 500, error)
  }
}

export const listUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(404).json({
      error: "Error al listar usuarios",
      message: error.message,
    });
  }
};
