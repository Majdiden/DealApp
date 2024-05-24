const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../middleware/auth");

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get user statistics
 *     description: Retrieves statistics for all users. Accessible only by users with the ADMIN role.
 *     responses:
 *       200:
 *         description: Successful response with user statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserStatsResponse'
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
 *     UserStatsResponse:
 *       type: object
 *       properties:
 *         users:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               phone:
 *                 type: integer
 *               status:
 *                 type: string
 *               adsCount:
 *                 type: integer
 *               totalAdsAmount:
 *                 type: integer
 *               requestsCount:
 *               totalRequestsAmount:
 *                 type: integer
 *         paginator:
 *           type: object
 *           properties:
 *             usersCount:
 *               type: integer
 *             perPage:
 *               type: integer
 *             currentPage:
 *               type: integer
 *             pageCount:
 *               type: integer
 *             pageCounter:
 *               type: integer
 *             hasPrev:
 *               type: boolean
 *             hasNext:
 *               type: boolean
 *             prev:
 *               type: string
 *               nullable: true
 *             next:
 *               type: string
 *               nullable: true
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Error message"
 */

router.get(
  "/stats",
  auth.authenticate,
  auth.restrictAccess("ADMIN"),
  userController.getUserStats
);

module.exports = router;
