class MoviesApi {
    constructor(url) {
        this._url = url;
    }

    getMovies() {
        return fetch(`${this._url}/beatfilm-movies`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
            .then(this._checkResponse)
    }


    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

}

const moviesApi = new MoviesApi(
    'https://api.nomoreparties.co',
);

export default moviesApi;