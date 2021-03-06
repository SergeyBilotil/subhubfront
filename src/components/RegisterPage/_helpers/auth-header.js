export function authHeader() {
    // return authorization header with basic auth credentials
    let token = JSON.parse(sessionStorage.getItem('access_token'));
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.authdata ) {
        
        return {'Authorization': 'Bearer ' + token };
        
    } else {
        return {};
    }
}