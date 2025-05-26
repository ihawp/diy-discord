const pool = require('./pool');

// Select Statements

const selectUserById = async (id) => {
    const [response] = await pool.execute('SELECT * FROM accounts WHERE id = ?', [id]);
    return response;
}

const selectUserByUsername = async (username) => {
    const [response] = await pool.execute('SELECT * FROM accounts WHERE username = ?', [username]);
    return response;
}

const selectUserByEmail = async (email) => {
    const [response] = await pool.execute('SELECT * FROM accounts WHERE email = ?', [email]);
    return response;
}

const selectUserByUsernameOrEmail = async (username, email) => {
    const [response] = await pool.execute('SELECT * FROM accounts WHERE username = ? OR email = ?', [username, email]);
    return response;
}

const selectAuthById = async (id) => {
    const [response] = await pool.execute('SELECT auth_token FROM accounts WHERE id = ?', [id]);
    return response;
}

// Update Statements

const updateUserUsernameById = async (newUsername, id) => {
    const [response] = await pool.execute('UPDATE accounts SET username = ? WHERE id = ?', [newUsername, id])
    return response;
}

const updateUserAuthById = async (newAuthToken, id) => {
    const [response] = await pool.execute('UPDATE accounts SET auth_token = ? WHERE id = ?', [newAuthToken, id]);
    return response;
}

// Insert Statements

const insertUser = async (username, email, password) => {
    const [response] = await pool.execute('INSERT INTO accounts (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    return response;
}

const insertUserAndAuth = async (username, email, password, authToken) => {
    const [response] = await pool.execute('INSERT INTO accounts (username, email, password, auth_token) VALUES (?, ?, ?, ?)', [username, email, password, authToken]);
    return response;
}

const insertTeam = async (name, description, ownerId) => {
    const [response] = await pool.execute('INSERT INTO teams (name, description, owner_id) VALUES (?, ?, ?)', [name, description, ownerId])
    return response;
}

// Delete Statements

const deleteUserById = async (id) => {
    const [response] = await pool.execute('DELETE FROM accounts WHERE id = ?', [id]);
    return response;
}

module.exports = {

    selectUserById,
    selectUserByUsername,
    selectUserByEmail,
    selectUserByUsernameOrEmail,
    selectAuthById,

    updateUserUsernameById,
    updateUserAuthById,

    insertUser,
    insertUserAndAuth,

    insertTeam,

    deleteUserById,

}