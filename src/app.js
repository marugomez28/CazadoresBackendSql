// src/app.js
import express from "express";
import 'dotenv/config';
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import huntersRouter from "./routes/hunters.routes.js";
import { swaggerSpec } from "./swagger/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/hunters-relacionales", huntersRouter);

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Servicio relacional funcionando" });
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Microservicio RELACIONAL corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
});