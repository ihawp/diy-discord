const pool = require('./pool');

// ##########################################################
// ##########################################################
// ##########################################################
// Select Statements:
// -----------------

/**
 * Get a row from the `teams` table by it's `id`
 * 
 * @param {number} userId
 * @returns {Object<Promise>} - Query Result
 */
const selectUserTeamsById = async (userId) => {
    const [response] = await pool.execute('SELECT * FROM teams WHERE owner_id = ?', [userId]);
    return response;
}

const selectJoinedUserTeamsById = async (userId) => {
    const [response] = await pool.execute('SELECT teams.* FROM teams JOIN team_members tm ON tm.team_id = teams.id WHERE tm.user_id = ? OR teams.owner_id = ?', [userId, userId]);
    console.log(response);
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

const insertTeamMember = async (teamId, id) => {
    const [response] = await pool.execute('INSERT INTO team_members (team_id, user_id) VALUES (?, ?)', [teamId, id]);
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

    selectUserTeamsById,
    selectJoinedUserTeamsById,

    updateTeamNameById,

    insertTeam,
    insertTeamMember,

    deleteTeamById,

}