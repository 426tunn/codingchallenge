import express from "express";
import { Config } from "./Config/config";
import { DepartureRouter } from "./Routes/DepartureRoute";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import cors from 'cors';
import path from 'path';

const PORT = Config.PORT;
const app = express();
app.use(express.json());
app.use(cors()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use('/', express.static('static')); 

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/departures", DepartureRouter); 

//Error Handling
app.use(
  (
      err: Error,
      _req: express.Request,
      res: express.Response,
      next: express.NextFunction,
  ) => {
      res.status(500).json({
          error: err.message,
      });
      next(err);
  },
);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
