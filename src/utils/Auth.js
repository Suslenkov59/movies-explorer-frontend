class Auth {
    constructor({url}) {
        this._url = url;
    }

    handleResponse = (res) => {
        if (res.ok) {
            return res.json();
        }
        return res.text().then((text) => {
            return Promise.reject({
                status: res.status,
                errorText:
                    JSON.parse(text).message === 'Validation failed'
                        ? JSON.parse(text).validation.body.message
                        : JSON.parse(text).message
            });
        });
    };

    register = (name, email, password) => {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        }).then((response) => {
            return this.handleResponse(response);
        });
    };

    authorize = (email, password) => {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        }).then((response) => this.handleResponse(response));
    };

    checkToken = (token) => {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            }
        }).then((res) => this.handleResponse(res));
    };
}

export const auth = new Auth({
    url: 'https://api.movies.suslenkov.nomoredomains.xyz'
});
