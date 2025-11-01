import express from "express";
import {
  obtenerTodosHunters,
  obtenerHunter,
  crearHunter,
  actualizarHunter,
  eliminarHunter,
} from "../controllers/hunters.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Hunters Relacionales
 *   description: API para gestionar hunters con base de datos relacional (Supabase)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Hunter:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único del hunter (UUID)
 *         nombre:
 *           type: string
 *           description: Nombre del hunter (único)
 *         edad:
 *           type: integer
 *           description: Edad del hunter
 *         altura:
 *           type: string
 *           description: Altura del hunter
 *         peso:
 *           type: string
 *           description: Peso del hunter
 *         imageUrl:
 *           type: string
 *           description: URL de la imagen del hunter
 *         descripcion:
 *           type: string
 *           description: Descripción del hunter
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         nombre: "Gon Freecss"
 *         edad: 12
 *         altura: "154 cm"
 *         peso: "45 kg"
 *         imageUrl: "https://example.com/gon.jpg"
 *         descripcion: "Protagonista de Hunter x Hunter"
 *         created_at: "2024-01-01T00:00:00.000Z"
 */

/**
 * @swagger
 * /api/hunters-relacionales:
 *   get:
 *     summary: Obtener todos los hunters
 *     tags: [Hunters Relacionales]
 *     responses:
 *       200:
 *         description: Lista de hunters obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hunter'
 *       500:
 *         description: Error del servidor
 */
router.get("/", obtenerTodosHunters);

/**
 * @swagger
 * /api/hunters-relacionales/{nombre}:
 *   get:
 *     summary: Obtener un hunter por nombre
 *     tags: [Hunters Relacionales]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del hunter a buscar
 *     responses:
 *       200:
 *         description: Hunter encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hunter'
 *       404:
 *         description: Hunter no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/:nombre", obtenerHunter);

/**
 * @swagger
 * /api/hunters-relacionales:
 *   post:
 *     summary: Crear un nuevo hunter
 *     tags: [Hunters Relacionales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - imageUrl
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del hunter (debe ser único)
 *               edad:
 *                 type: integer
 *                 description: Edad del hunter
 *               altura:
 *                 type: string
 *                 description: Altura del hunter
 *               peso:
 *                 type: string
 *                 description: Peso del hunter
 *               imageUrl:
 *                 type: string
 *                 description: URL de la imagen del hunter
 *               descripcion:
 *                 type: string
 *                 description: Descripción del hunter
 *             example:
 *               nombre: "Killua Zoldyck"
 *               edad: 12
 *               altura: "158 cm"
 *               peso: "45 kg"
 *               imageUrl: "https://static.wikia.nocookie.net/hunterxhunter/images/9/9c/Killua_Zoldyck_2011.png"
 *               descripcion: "Amigo de Gon y experto asesino"
 *     responses:
 *       201:
 *         description: Hunter creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hunter'
 *       400:
 *         description: Datos inválidos o hunter ya existe
 *       500:
 *         description: Error del servidor
 */
router.post("/", crearHunter);

/**
 * @swagger
 * /api/hunters-relacionales/{nombre}:
 *   put:
 *     summary: Actualizar un hunter por nombre
 *     tags: [Hunters Relacionales]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del hunter a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               edad:
 *                 type: integer
 *                 description: Edad del hunter
 *               altura:
 *                 type: string
 *                 description: Altura del hunter
 *               peso:
 *                 type: string
 *                 description: Peso del hunter
 *               imageUrl:
 *                 type: string
 *                 description: URL de la imagen del hunter
 *               descripcion:
 *                 type: string
 *                 description: Descripción del hunter
 *             example:
 *               edad: 13
 *               altura: "160 cm"
 *               imageUrl: "https://example.com/gon-updated.jpg"
 *               descripcion: "Cazador profesional"
 *     responses:
 *       200:
 *         description: Hunter actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hunter'
 *       404:
 *         description: Hunter no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/:nombre", actualizarHunter);

/**
 * @swagger
 * /api/hunters-relacionales/{nombre}:
 *   delete:
 *     summary: Eliminar un hunter por nombre
 *     tags: [Hunters Relacionales]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del hunter a eliminar
 *     responses:
 *       200:
 *         description: Hunter eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hunter eliminado correctamente"
 *                 data:
 *                   $ref: '#/components/schemas/Hunter'
 *       404:
 *         description: Hunter no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/:nombre", eliminarHunter);

export default router;