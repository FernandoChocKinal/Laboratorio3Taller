import { Router } from "express"
import { agregarEmpresa, editarEmpresa, generarReporte } from "./empresa.controller.js"
import { agregarEmpresaValidator, editarEmpresaValidator, generarExcelreporte } from "../middlewares/empresa-validators.js"

const router = Router()

/**
 * @swagger
 * /agregarEmpresa:
 *   post:
 *     summary: Agregar una nueva empresa
 *     tags: [Empresa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Empresa agregada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post(
    "/agregarEmpresa",
    agregarEmpresaValidator,
    agregarEmpresa
)

/**
 * @swagger
 * /editarEmpresa/{uid}:
 *   put:
 *     summary: Editar una empresa existente
 *     tags: [Empresa]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empresa editada exitosamente
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Empresa no encontrada
 */
router.put( 
    "/editarEmpresa/:uid",
    editarEmpresaValidator,
    editarEmpresa
)

/**
 * @swagger
 * /generarReporte:
 *   post:
 *     summary: Generar un reporte de empresas
 *     tags: [Empresa]
 *     responses:
 *       200:
 *         description: Reporte generado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post(
    "/generarReporte",
    generarExcelreporte ,
    generarReporte
)

export default router
