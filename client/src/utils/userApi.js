// import Cookies from 'js-cookie';

export const authUser = async (email, password) => {
    try {
        const response = await fetch(
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
        return response.json();
    } catch(error) {
        console.log(error);
    } 
}

export const createUser = async (email, first_name, last_name, birthday, password) => {
    try {
        const response = await fetch(
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
        return response.json();
    } catch(error) {
        console.log(error);
    }
}
