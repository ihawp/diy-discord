async function getUserAuthStatus() {
    const response = await fetch('http://localhost:3000/auth/verify');

    if (!response.ok) {
        return false;
    }

    const { data, error } = await response.json();

    if (error) {
        return false;
    }

    return data;
}

const { verified, user } = await getUserAuthStatus();

console.log(verified, user);

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