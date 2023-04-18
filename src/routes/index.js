import express from 'express';
import cors from 'cors';
import loginRoute from './loginRoute.js'
import signupRoute from './signupRoute.js'
import transactionRoute from './transactionRoute.js'
const app = express();

app.use(express.json())
app.use(cors())
app.use(loginRoute)
app.use(signupRoute)
app.use(transactionRoute)

export default app;
