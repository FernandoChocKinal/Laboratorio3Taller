import Empresa from "./empresa.model.js";
import ExcelJS from "exceljs"; 
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const agregarEmpresa = async (req, res) => {
    try {
        const data = req.body;
        const AñoActual = new Date().getFullYear();
        data.trayectoria = AñoActual - data.anoFundacion;

        const empresa = await Empresa.create(data);

        res.status(201).json({
            success: true,
            message: "Empresa creada",
            empresa
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear la empresa",
            error: err.message
        })
    }
}

export const editarEmpresa = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const AñoActual = new Date().getFullYear();
        data.trayectoria = AñoActual - Number(data.anoFundacion);

        const empresa = await Empresa.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            message: "Empresa actualizada",
            empresa
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar la empresa",
            error: err.message
        });
    }
};

export const generarReporte = async (req, res) => {
    try {
        const { minTrayectoria, maxTrayectoria, categoriaEmpresa, orden } = req.body;
        let filtro = {};

        if (categoriaEmpresa) {
            filtro.categoriaEmpresa = categoriaEmpresa;
        }
        if (minTrayectoria && maxTrayectoria) {
            const minimo = parseInt(minTrayectoria);
            const maximo = parseInt(maxTrayectoria);
            filtro.trayectoria = { $gte: minimo, $lte: maximo };
        }

        let sort = {};
        if (orden === 'A-Z') {
            sort.nombreEmpresa = 1;
        } else if (orden === 'Z-A') {
            sort.nombreEmpresa = -1;
        }

        const empresas = await Empresa.find(filtro).sort(sort);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Reporte de Empresas');

        worksheet.columns = [
            { header: 'Nombre de Empresa', key: 'nombreEmpresa', width: 30 },
            { header: 'Dirección', key: 'direccionEmpresa', width: 30 },
            { header: 'Teléfono', key: 'telefonoEmpresa', width: 15 },
            { header: 'Email', key: 'emailEmpresa', width: 30 },
            { header: 'Contacto Dueño', key: 'ContactoDueño', width: 30 },
            { header: 'Año Fundación', key: 'anoFundacion', width: 15 },
            { header: 'Categoría', key: 'categoriaEmpresa', width: 20 },
            { header: 'Nivel de Impacto', key: 'nivelImpacto', width: 15 },
            { header: 'Trayectoria', key: 'trayectoria', width: 15 }
        ];

        empresas.forEach((empresa) => {
            worksheet.addRow({
                nombreEmpresa: empresa.nombreEmpresa,
                direccionEmpresa: empresa.direccionEmpresa,
                telefonoEmpresa: empresa.telefonoEmpresa,
                emailEmpresa: empresa.emailEmpresa,
                ContactoDueño: empresa.ContactoDueño,
                anoFundacion: empresa.anoFundacion,
                categoriaEmpresa: empresa.categoriaEmpresa,
                nivelImpacto: empresa.nivelImpacto,
                trayectoria: empresa.trayectoria
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();

        const reportPath = path.join(__dirname, '../../public/reporteExcel');
        if (!fs.existsSync(reportPath)) {
            fs.mkdirSync(reportPath, { recursive: true });
        }
        
        const now = new Date();
        const timestamp = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
        const filePath = path.join(reportPath, `reporteEmpresas_${timestamp}.xlsx`);
        fs.writeFileSync(filePath, buffer);
        console.log(`Se guardó el archivo ${filePath} en la carpeta reportesExcel.`);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=reporteEmpresas_${timestamp}.xlsx`);
        res.send(buffer);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error general',
            error: error.message
        })
    }
}
