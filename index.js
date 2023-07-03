const express = require('express');
const errorController = require('./controller/error');
const app = express();
const userRouter = require('./routes/users');
const transactionRouter = require('./routes/transaction');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(userRouter);
app.use(transactionRouter);

app.use(errorController.get404);

console.log("Server listening : port->3000");
app.listen(3000);