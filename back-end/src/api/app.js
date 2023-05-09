const express = require('express');
const cors = require('cors');
const router = require('../server/routers');
const errorMiddleware = require('../server/middlewares/error');

const app = express();

app.use(cors());
app.use(express.json());
app.get('/coffee', (_req, res) => res.status(418).end());
app.use(express.static('public'));
app.use('/login', router.loginRouter);
app.use('/user', router.userRouter);
app.use('/admin', router.adminRouter);
app.use('/seller', router.sellerRouter);
app.use('/products', router.productRouter);

app.use(errorMiddleware);
module.exports = app;
