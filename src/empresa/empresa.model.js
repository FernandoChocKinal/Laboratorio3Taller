import { Schema, model } from "mongoose";

const empresaSchema = Schema({
    nombreEmpresa: {
        type: String,
        required: [true, "Nombre de la empresa es requerido"],
        maxLength: [40, "Nombre de la empresa no puede exceder de 40 caracteres"]
    },
    direccionEmpresa: {
        type: String,
        required: [true, "Dirección es requerida"],
        maxLength: [150, "Dirección no puede exceder de 150 caracteres"]
    },
    telefonoEmpresa: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    emailEmpresa: {
        type: String,
        required: [true, "Email es requerido"],
        unique: true
    },
    ContactoDueño:{
        type: String,
        required: [true, "El nombre del dueño es requerido"],
    },
    anoFundacion: {
        type: Number,
        required: [true, "Fecha de fundación es requerida"]
    },
    categoriaEmpresa: {
        type: String,
        required: [true, "Categoría empresarial es requerida"],
    },
    nivelImpacto: {
        type: String,
        required: [true, "Nivel de impacto es requerido"],
        enum: ["BAJO", "MEDIO", "ALTO"]
    },
    trayectoria: {
        type: Number
    },
},
{
    timestamps: true,
    versionKey: false
});

export default model("Empresa", empresaSchema);
