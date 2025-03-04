import { body, param } from "express-validator";
import { emailExists, empresaExiste } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";

export const agregarEmpresaValidator = [
    validateJWT,
    body("nombreEmpresa").notEmpty().withMessage("El nombre de la empresa es requerido"),
    body("direccionEmpresa").notEmpty().withMessage("La dirección es requerida"),
    body("emailEmpresa").notEmpty().withMessage("El email es requerido"),
    body("emailEmpresa").isEmail().withMessage("No es un email válido"),
    body("emailEmpresa").custom(emailExists),
    body("ContactoDueño").notEmpty().withMessage("El nombre del dueño es requerido"),
    body("anoFundacion").notEmpty().withMessage("El nombre de la empresa es requerido"),
    body("categoriaEmpresa").notEmpty().withMessage("Debes ingresear una categoria"),
    body("nivelImpacto").notEmpty().withMessage("El teléfono es requerido"),
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const editarEmpresaValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(empresaExiste),
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const generarExcelreporte = [
    validateJWT,
    validarCampos,
    deleteFileOnError,
    handleErrors
];
