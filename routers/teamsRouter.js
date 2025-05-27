const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');


const teamsRouter = express.Router();

// Controllers
const teamsCreateController = require('../controllers/teamsCreateController');
const getTeamsController = require('../controllers/getTeamsController');

/**
 * @route POST /create
 * @description Allow a user to create a team, this user is the team owner (owner_id)
 */
teamsRouter.post('/create', verifyJWT, teamsCreateController);

teamsRouter.get('/getTeams', verifyJWT, getTeamsController);

module.exports = teamsRouter;