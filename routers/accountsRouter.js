const express = require('express');

// Controllers
const deleteController = require('../controllers/deleteController');
const updateUsernameController = require('../controllers/updateUsernameController');
const updatePasswordController = require('../controllers/updatePasswordController');
const updateEmailController = require('../controllers/updateEmailController');

// Middleware
const verifyJWT = require('../middleware/verifyJWT');

const accountsRouter = express.Router();

/** 
 * @route POST delete
 * @description User can delete their own account.
 * @middleware verifyJWT
 * @controller deleteController
 */
accountsRouter.post('/delete', 
    verifyJWT, 
    deleteController
);

/**
 * @route POST update-username
 * @description User can update their own username.
 * @middleware verifyJWT
 * @controller updateUsernameController
 */
accountsRouter.post('/update-username', 
    verifyJWT, 
    updateUsernameController
);

/**
 * @route POST update-password
 * @description User can update their own password
 * @middleware verifyJWT
 * @controller updatePasswordController
 */
accountsRouter.post('/update-password', 
    verifyJWT,
    updatePasswordController
);

/**
 * Send an email to the new updated email to verify that email
 * 
 * @route POST update-email
 * @description User can update their own email
 * @middleware verifyJWT
 * @controller updateEmailController
 */
accountsRouter.post('/update-email',
    verifyJWT,
    updateEmailController
);

module.exports = accountsRouter;