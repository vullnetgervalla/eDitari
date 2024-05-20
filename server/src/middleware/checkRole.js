require('dotenv').config();
const { db } = require('../db');
const jwt = require('jsonwebtoken');

/** 
 * This middleware checks if the user has the required role capability to access the endpoint.
 * Alternatively, you can set the capability to null and the type to the user type or array of types you want to allow access.
 * @param {string | string[]} capability The capability or array of capabilities required to access the endpoint.
 * @param {string | string[]} type The user type or array of user types required to access the endpoint.
 */
function checkRole(capability, type) {

    return function (req, res, next) {
        const authToken = req.headers['authorization'] || req.headers['Authorization'];
        if (!authToken) return res.sendStatus(401);

        const token = authToken.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
            if (err) return res.sendStatus(401);
            const { userType } = user;
            db.query('SELECT * from getUsersCapabilities($1)', [userType], (err, queryRes) => {
                if (err) {
                    console.error('Error executing query', err);
                    res.sendStatus(500);
                    return;
                }
                const userCapabilities = queryRes.rows;
                
                if (capability 
                    ? Array.isArray(capability) 
                        ? !capability.every(c => !!userCapabilities.find(uc => uc.capability_name === c)) 
                        : !userCapabilities.find(uc => uc.capability_name === capability)
                    : Array.isArray(type) 
                        ? !type.includes(userType)
                        : userType !== type
                ){ 
                    return res.sendStatus(403);
                }
                
                req.user = user;
                next();
            });
        });
    }
}

module.exports = { checkRole };