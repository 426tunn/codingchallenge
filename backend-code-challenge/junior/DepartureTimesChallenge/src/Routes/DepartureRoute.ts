import express from 'express';
import { getDepartures } from '../Controllers/DepartureController';

const DepartureRouter = express.Router();

DepartureRouter.post('/', getDepartures);


export { DepartureRouter };