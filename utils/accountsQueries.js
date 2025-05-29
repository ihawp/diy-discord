const pool = require('./pool');

// ##########################################################
// ##########################################################
// ##########################################################
// Select Statements:
// -----------------

/**
 * Select a user profile row by their id
 * 
 * @param {number} id 
 * @returns {Promise<Object|null>} User object OR null
 */
const selectUserById = async (id) => {
    const [response] = await pool.execute('SELECT * FROM accounts WHERE id = ?', [id]);
    return response;
}

/**
 * Select a user profile row for the frontend display
 * 
 * @param {number} id 
 * @returns {Promise<Object|null>} User object OR null
 */
const selectFrontendUserById = async (id) => {
    const [response] = await pool.execute('SELECT username, email, email_verified, pfp_url, account_created FROM accounts WHERE id = ?', [id]);
    return response;
}

/**
 * Select a user profile row by their username
 * 
 * @param {string} username 
 * @returns {Promise<Object|null>} User object OR null
 */
const selectUserByUsername = async (username) => {
    const [response] = await pool.execute('SELECT * FROM accounts WHERE username = ?', [username]);
    return response;
}

/**
 * Select a user profile ID by their username
 * 
 * @param {string} username - A potential user username
 * @returns {Promise<Object|null>} User id OR null
 */
const selectUserIdByUsername = async (username) => {
    const [response] = await pool.execute('SELECT id FROM accounts WHERE username = ?', [username]);
    return response;
}

/**
 * Select a user profile row by their email
 * 
 * @param {string} email 
 * @returns {Promise<Object|null>} User object OR null
 */
const selectUserByEmail = async (email) => {
    const [response] = await pool.execute('SELECT * FROM accounts WHERE email = ?', [email]);
    return response;
}

/**
 * Select a user profile row by their username OR email
 * 
 * @param {string} username 
 * @param {string} email 
 * @returns {Promise<Object|null>} User object OR null
 */
const selectUserByUsernameOrEmail = async (username, email) => {
    const [response] = await pool.execute('SELECT * FROM accounts WHERE username = ? OR email = ?', [username, email]);
    return response;
}

/**
 * Select the auth_token of a user profile row by the users ID
 * 
 * @param {number} id 
 * @returns {Promise<Object|null>} User object containing only auth_token OR null
 */
const selectAuthById = async (id) => {
    const [response] = await pool.execute('SELECT auth_token FROM accounts WHERE id = ?', [id]);
    return response;
}

// ##########################################################
// ##########################################################
// ##########################################################
// Update Statements:
// -----------------

/**
 * Updates the username of the accounts row for a given user id to a new username
 * 
 * @param {string} newUsername 
 * @param {number} id 
 * @returns {Promise<Object|null>} 
 */
const updateUserUsernameById = async (newUsername, id) => {
    const [response] = await pool.execute('UPDATE accounts SET username = ? WHERE id = ?', [newUsername, id])
    return response;
}

/**
 * Updates the auth_token of the accounts row for a given user id
 * 
 * @param {string} newAuthToken
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
const updateUserAuthById = async (newAuthToken, id) => {
    const [response] = await pool.execute('UPDATE accounts SET auth_token = ? WHERE id = ?', [newAuthToken, id]);
    return response;
}

const updateUserPasswordById = async (newPasswordHash, id) => {
    const [response] = await pool.execute('UPDATE accounts SET password = ? WHERE id = ?', [newPasswordHash, id]);
    return response;
}

const updateUserEmailVerifiedById = async (newEmailVerifiedLevel, id) => {
    const [response] = await pool.execute('UPDATE accounts SET email_verified = ? WHERE id = ?', [newEmailVerifiedLevel, id]);
    return response;
}

// ##########################################################
// ##########################################################
// ##########################################################
// Insert Statements:
// -----------------

/**
 * Insert a new user with username, email, and password
 * 
 * @param {string} username 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object|null>} 
 */
const insertUser = async (username, email, password) => {
    const [response] = await pool.execute('INSERT INTO accounts (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    return response;
}

/**
 * Insert a new user with username, email, password, and auth_token
 * 
 * @param {string} username 
 * @param {string} email 
 * @param {string} password 
 * @param {string} authToken
 * @returns {Promise<Object|null>} 
 */
const insertUserAndAuth = async (username, email, password, authToken) => {
    const [response] = await pool.execute('INSERT INTO accounts (username, email, password, auth_token) VALUES (?, ?, ?, ?)', [username, email, password, authToken]);
    return response;
}

// ##########################################################
// ##########################################################
// ##########################################################
// Delete Statements:
// -----------------

/**
 * Delete a user by their id
 * 
 * @param {number} id 
 * @returns {Promise<Object|null>} 
 */
const deleteUserById = async (id) => {
    const [response] = await pool.execute('DELETE FROM accounts WHERE id = ?', [id]);
    return response;
}

module.exports = {
    selectUserById,
    selectFrontendUserById,
    selectUserByUsername,
    selectUserIdByUsername,
    selectUserByEmail,
    selectUserByUsernameOrEmail,
    selectAuthById,

    updateUserUsernameById,
    updateUserAuthById,
    updateUserPasswordById,
    updateUserEmailVerifiedById,

    insertUser,
    insertUserAndAuth,

    deleteUserById,
}