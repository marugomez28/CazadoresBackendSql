import swaggerJsdoc from "swagger-jsdoc";

const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction 
  ? 'https://cazadoresbackendsql-production.up.railway.app'
  : `http://localhost:${process.env.PORT || 4001}`;

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
        url: baseUrl,
        description: isProduction ? "Servidor de producción" : "Servidor de desarrollo"
      }
    ],
  },
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);