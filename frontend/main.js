async function getUserAuthStatus() {

    const response = await fetch('http://localhost:3000/auth/verify', {
        credentials: 'same-origin',
    });

    if (!response.ok) {
        return false;
    }

    const { data, error } = await response.json();

    if (error) {
        return false;
    }

    return data || false;

}

async function getUserCreatedTeams() {

    const response = await fetch('http://localhost:3000/teams/selectUserTeams', {
        credentials: 'same-origin',
    });

    if (!response.ok) {
        return false;
    }

    const { data, error } = await response.json();

    if (error) {
        return false;
    }

    return data || false;

}

async function getUserTeams() {

    const response = await fetch('http://localhost:3000/teams/selectJoinedUserTeams', {
        credentials: 'same-origin',
    });

    if (!response.ok) {
        return false;
    }

    const { data, error } = await response.json();

    if (error) {
        return false;
    }

    return data || false;

}

const { verified, user } = await getUserAuthStatus();
console.log(verified, user);

const userCreatedTeams = await getUserCreatedTeams();
console.log(userCreatedTeams);

const allUserTeams = await getUserTeams();
console.log(allUserTeams);

const root = document.getElementById('root');

const currentPage = {
    page: undefined,
}

function getLocation() {
    return window.location.pathname;
}

function updateLocation(data, location) {
    history.pushState(data, '', location);
}

currentPage.page = getLocation();

switch (currentPage.page) {
    case ('/'):
        console.log('/');
        break;
    case ('/teams'):
        console.log('/teams');
        break;
    case ('/settings'):
        console.log('/settings');
        break;
}