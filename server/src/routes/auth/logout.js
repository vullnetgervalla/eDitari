const { Router } = require('express');

const logoutRouter = Router();

logoutRouter.get('/', (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.refreshToken) {
        return res.sendStatus(204);
    }

    res.clearCookie('refreshToken', {httpOnly: true, sameSite: 'none', secure: true});
    res.sendStatus(204);
});

module.exports = { logoutRouter };