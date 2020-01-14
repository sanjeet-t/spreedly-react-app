"use strict";
const express_1 = require("express");
const loginRouter = express_1.Router();
loginRouter.get('/', (req, res) => {
    return res.status(200).send('Login route OK');
});
// to-do : add JSON web token
loginRouter.post('/', (req, res) => {
    const { data } = req.body;
    // simulate a network call
    setTimeout(() => {
        if (data.userName === 'admin' && data.password === 'password') {
            return res.status(200).send({ userId: data.userName });
        }
        return res.status(400).send(`Username or password is incorrect`);
    }, 2000);
});
module.exports = loginRouter;
//# sourceMappingURL=login.js.map