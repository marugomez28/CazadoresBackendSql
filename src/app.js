import express from "express";
import 'dotenv/config';
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import huntersRouter from "./routes/hunters.routes.js";
import { swaggerSpec } from "./config/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/hunters-relacionales", huntersRouter);

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Servicio relacional funcionando" });
});

// Usar el puerto de Railway o 3001 por defecto
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(` Microservicio RELACIONAL corriendo en puerto ${PORT}`);
  console.log(` Documentación Swagger en http://localhost:${PORT}/api-docs`);
});