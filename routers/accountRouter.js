const express = require('express');

// Controllers
const deleteController = require('../controllers/deleteController');
const updateUsernameController = require('../controllers/updateUsernameController');
const updatePasswordController = require('../controllers/updatePasswordController');

// Middleware
const verifyJWT = require('../middleware/verifyJWT');

const accountRouter = express.Router();

/** 
 * @route POST delete
 * @description User can delete their own account.
 * @middleware verifyJWT
 * @controller deleteController
 */
authRouter.post('/delete', 
    verifyJWT, 
    deleteController
);

/**
 * @route POST update-username
 * @description User can update their own username.
 * @middleware verifyJWT
 * @controller updateUsernameController
 */
authRouter.post('update-username', 
    verifyJWT, 
    updateUsernameController
);

/**
 * @route POST update-password
 * @description User can update their own password
 * @middleware verifyJWT
 * @controller updatePasswordController
 */
authRouter.post('update-password', 
    verifyJWT,
    updatePasswordController
)

module.exports = accountRouter;