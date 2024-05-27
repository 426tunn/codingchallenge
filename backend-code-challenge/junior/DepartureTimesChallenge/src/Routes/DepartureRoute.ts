import express from 'express';
import { getDepartures } from '../Controllers/DepartureController';

const DepartureRouter = express.Router();

DepartureRouter.post('/', getDepartures);

/**
 * @swagger
 * /departures:
 *   post:
 *     summary: Fetch real-time departure times based on location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 description: Address or ZIP code of the user
 *               latitude:
 *                 type: number
 *                 description: Latitude of the user location
 *               longitude:
 *                 type: number
 *                 description: Longitude of the user location
 *     responses:
 *       200:
 *         description: Departure data
 *       400:
 *         description: Invalid location data
 *       404:
 *         description: Address not found
 *       500:
 *         description: Error fetching departure data
 */

export { DepartureRouter };