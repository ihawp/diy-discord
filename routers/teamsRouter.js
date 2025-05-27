const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');

const teamsRouter = express.Router();

// Controllers
const teamsCreateController = require('../controllers/teamsCreateController');
const selectUserTeamsController = require('../controllers/selectUserTeamsController');
const selectJoinedUserTeamsController = require('../controllers/selectJoinedUserTeamsController');

/**
 * @route POST /create
 * @description Allow a user to create a team, this user is the team owner (owner_id)
 */
teamsRouter.post('/create', verifyJWT, teamsCreateController);

/**
 * @route GET /selectUserTeams
 * @description Get teams where id (user id) is owner_id
 */
teamsRouter.get('/selectUserTeams', verifyJWT, selectUserTeamsController);

/**
 * @route GET /selectJoinedUserTeams
 * @description Get teams where id (user id) is a member or owner of the team
 */
teamsRouter.get('/selectJoinedUserTeams', verifyJWT, selectJoinedUserTeamsController);

module.exports = teamsRouter;