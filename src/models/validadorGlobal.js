import mongoose from "mongoose";

//Adiciona uma validação global de strings, para não permitir que haja strings vazias
mongoose.Schema.Types.String.set("validate", {
  validator: (valor) => valor !== "",
  message: ({ path }) => `O campo '${path}' foi fornecido em branco`
});