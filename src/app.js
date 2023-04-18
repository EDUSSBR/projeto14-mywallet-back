import app from "./routes/index.js";
import dotenv from 'dotenv';
dotenv.config()

app.listen(process.env.PORT, ()=>console.log(`Server listening at ${process.env.PORT}...`))