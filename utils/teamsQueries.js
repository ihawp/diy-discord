const pool = require('./pool');

// ##########################################################
// ##########################################################
// ##########################################################
// Select Statements:
// -----------------

/**
 * Get a row from the `teams` table by it's `id`
 * 
 * @param {number} id - User ID
 * @returns {Object<Promise>} - Query Result
 */
const selectTeamById = async (id) => {
    const [response] = await pool.execute('SELECT * FROM teams WHERE id = ?', [id]);
    return response;
}

// ##########################################################
// ##########################################################
// ##########################################################
// Update Statements:
// -----------------

const updateTeamNameById = async (newName, id) => {
    const [response] = await pool.execute('UPDATE teams SET name = ? WHERE id = ?', [newName, id]);
    return response;
}

// ##########################################################
// ##########################################################
// ##########################################################
// Insert Statements:
// -----------------

const insertTeam = async (name, description, owner_id, private) => {
    const [response] = await pool.execute('INSERT INTO teams (name, description, owner_id, private) VALUES (?, ?, ?, ?)', [name, description, owner_id, private]);
    return response;
}

// ##########################################################
// ##########################################################
// ##########################################################
// Delete Statements:
// -----------------

const deleteTeamById = async (id) => {
    const [response] = await pool.execute('DELETE FROM teams WHERE id = ?', [id]);
    return response;
}

module.exports = {

    selectTeamById,

    updateTeamNameById,

    insertTeam,

    deleteTeamById,

}