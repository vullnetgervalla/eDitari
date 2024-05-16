const { Router } = require('express');
const { db } = require('../../db');
const { isAdminToken } = require('../../middleware/isAdminToken');

const createRoleRouter = Router();

createRoleRouter.post('/create-role', isAdminToken, async (req, res) => {
  const { roleName, capabilities } = req.body;
  console.log('roleName', roleName)
  console.log('capabilities', capabilities)
  try {
    await db.query('SELECT insertRoleAndCapabilities($1, $2)', [roleName, capabilities]);
    res.status(200).json({ message: 'Role created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = { createRoleRouter };
