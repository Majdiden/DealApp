const express = require("express");
const router = express.Router();
const requestController = require("../controllers/request");
const auth = require("../middleware/auth");

/**
 * @swagger
 * /requests:
 *   post:
 *     summary: Create a new property request.
 *     description: Create a new property request.  Accessible only by users with the AGENT role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request'
 *     responses:
 *       201:
 *         description: Request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Request:
 *       type: object
 *       properties:
 *         propertyType:
 *              type: string
 *         area:
 *              type: string
 *         city:
 *              type: string
 *         district:
 *              type: string
 *         description:
 *              type: string
 *         price:
 *              type: number
 *     Response:
 *         type: object
 *         properties:
 *           message:
 *              type: string
 *           data:
 *              type: object
 *              properties:
 *                propertyType:
 *                  type: string
 *                area:
 *                  type: string
 *                city:
 *                  type: string
 *                district:
 *                  type: string
 *                description:
 *                  type: string
 *                price:
 *                  type: number
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */
router.post(
  "/",
  auth.authenticate,
  auth.restrictAccess("CLIENT"),
  requestController.createRequest
);
router.post(
  "/",
  auth.authenticate,
  auth.restrictAccess("CLIENT"),
  requestController.createRequest
);

router.patch(
  "/:id",
  auth.authenticate,
  auth.restrictAccess("CLIENT"),
  requestController.updateRequest
);

module.exports = router;
