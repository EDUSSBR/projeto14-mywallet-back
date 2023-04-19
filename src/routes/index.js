import express from 'express';
import cors from 'cors';
import loginRoute from './loginRoute.js'
import cadastroRoute from './cadastroRoute.js'
import transactionRoute from './transacaoRoute.js'
const app = express();

app.use(express.json())
app.use(cors())
app.use(loginRoute)
app.use(cadastroRoute)
app.use(transactionRoute)

export default app;
