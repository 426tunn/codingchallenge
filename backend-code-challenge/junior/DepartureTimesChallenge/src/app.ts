import express from "express";
import { Config } from "./Config/config";


const PORT = Config.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


