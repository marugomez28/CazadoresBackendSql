// src/config/swagger.js
import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Microservicio Hunters Relacional",
      version: "1.0.0",
      description: "API para gestionar hunters con base de datos relacional (Supabase)"
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 4001}`,
        description: "Servidor local"
      },
      {
        url: "cazadoresbackendsql-production.up.railway.app",
        description: "Servidor de producción"
      }
    ],
  },
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);