export const makeFetch = async (url) => {

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
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

export const makeFetchPost = async (url, body) => {

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(body)
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