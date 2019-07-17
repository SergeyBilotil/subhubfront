


export const userService = {
    login,
    logout,
    refreshToken
};

function login(username, password ) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`https://stubhub.dataforest.tech/api/login`, requestOptions , { withCredentials: true})
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(username + password );
                sessionStorage.setItem('access_token', JSON.stringify(user.access_token));
                sessionStorage.setItem('user', JSON.stringify(user));
            }
               
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('user');
    
}

function refreshToken() {
    
    let user =  JSON.parse(sessionStorage.getItem('user'));
   
        
        const requestOptions = {
            method: 'POST',
            headers: {'Authorization': 'Bearer ' + user.refresh_token }
        
        }
        
        return fetch(`https://stubhub.dataforest.tech/api/refresh`, requestOptions )
        .then(res => res.json())
        .then(
          (token) => {
            sessionStorage.setItem('access_token', JSON.stringify(token.access_token));
            window.location.reload()
           
          });
    
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}