import express from "express";
import { Config } from "./Config/config";
import { DepartureRouter } from "./Routes/DepartureRoute";


const PORT = Config.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static('static'));
app.use("/departures", DepartureRouter); 


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


