import express from 'express';
import { router } from "./routes";
import "reflect-metadata";
import cors from "cors";
import path from "path";

import './database';

const app = express();

app.use(cors())

app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({limit: '5mb', extended: true, parameterLimit: 50000}));
app.use(router);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "tmp", "uploads")) );

app.listen(3333, () =>{
    console.log("Rodando na porta 3333")
})