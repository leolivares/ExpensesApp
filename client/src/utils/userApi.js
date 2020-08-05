

export const authUser = async (email, password) => {

    let response = await fetch(
        "http://localhost/api/users/auth",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    );
    response = await response.json();
    if (response.error) {
        throw new Error('Invalid Email/Password');
    }
    return response;
}

export const createUser = async (email, first_name, last_name, birthday, password) => {
    let response = await fetch(
        "http://localhost/api/users/create",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                first_name,
                last_name,
                birthday,
                password
            })
        }
    );
    response = await response.json();
    if (response.error) {
        throw new Error('Email already in use');
    }
    return response;

}
