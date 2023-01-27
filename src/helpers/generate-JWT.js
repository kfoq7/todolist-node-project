import jwt from "jsonwebtoken";

export const generateJWT = (data) => {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "20d" });

    if (token) {
      resolve(token);
    } else {
      reject(new Error("Error en generar token"));
    }
  });
};
 