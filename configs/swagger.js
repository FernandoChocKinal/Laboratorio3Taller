import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Empresa Coperex",
            version: "1.0.0",
            description: "API para gestionar las empresas",
            contact:{
                name: "Fernando Choc 2020 619",
                email: "fchoc-2020619@kinal.edu.gt"
            }
        },
        servers: [
            {
                url: "http://127.0.0.1:3001/empresaCoperex/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/empresa/empresa.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export {swaggerDocs, swaggerUi};
