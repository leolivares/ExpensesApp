

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
