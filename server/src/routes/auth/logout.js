const { Router } = require('express');

const logoutRouter = Router();

logoutRouter.post('/', (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.refreshToken) {
        return res.sendStatus(204);
    }

    res.clearCookie('refreshToken', {httpOnly: true});
    res.sendStatus(204);
});

module.exports = { logoutRouter };