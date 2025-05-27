const express = require('express');

const teamRouter = express.Router();

// Controllers
const teamCreateController = require('../controllers/teamCreateController');

/**
 * @route POST /create
 * @description Allow a user to create a team, this user is the team owner (owner_id)
 */
teamRouter.post('/create', verifyJWT, teamCreateController);

module.exports = teamRouter;