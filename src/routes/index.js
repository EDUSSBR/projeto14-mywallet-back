import express from 'express';
import cors from 'cors';
import signInRoute from './signInRoute.js'
import signUpRoute from './signUpRoute.js'
import logoutRoute from './logoutRoute.js'
import transactionRoute from './transactionRoute.js'
const app = express();

app.use(express.json())
app.use(cors())
app.use(signInRoute)
app.use(signUpRoute)
app.use(transactionRoute)
app.use(logoutRoute)

export default app;
