export default class JogsService {

  _apiBase = 'https://jogtracker.herokuapp.com/api';

  async getToken() {
    const url = `${this._apiBase}/v1/auth/uuidLogin`;
    const res = await fetch(url, {
                  method: "POST",
                  body: JSON.stringify({ uuid: "hello" }),
                }).then(
                  function (response) {
                    if (response.status !== 200) {
                      // console.log('Looks like there was a problem. Status Code: ' + response.status);
                    }
                    return response.json();
                })
                .then(function (data) {
                  return data;
                })
    return res;
  }

  async getJogs(token, token_type) {
    const url = `${this._apiBase}/v1/data/sync`;
    const res = await fetch(url, {
                        method: "GET",
                        headers: {
                          "Accept": "application/json",
                          "Authorization": `${token_type} ${token}`
                        }
                      }).then(
                          function (response) {
                            if (response.status !== 200) {
                              // console.log('Looks like there was a problem. Status Code: ' + response.status);
                            }
                            return response.json();
                          })
                        .then(function (data) {
                          return data
                        })
    return res;
  }
  async addRun(token, token_type, obj) {
    const url = `${this._apiBase}/v1/data/jog`;
    const res = await fetch(url, {
                        method: "POST",
                        headers: {
                          "Accept": "application/json",
                          "Authorization": `${token_type} ${token}`
                        },
                        body: JSON.stringify(obj)
                      }).then(
                          function (response) {
                            if (response.status !== 200) {
                              // console.log('Looks like there was a problem. Status Code: ' + response.status);
                            }
                            return response.json();
                          })
                        .then(function (data) {
                          return data
                        })
  }
  async editRun(token, token_type, obj) {
    const url = `${this._apiBase}/v1/data/jog`;
    const res = await fetch(url, {
                        method: "PUT",
                        headers: {
                          "Accept": "application/json",
                          "Authorization": `${token_type} ${token}`
                        },
                        body: JSON.stringify(obj)
                      }).then(
                          function (response) {
                            if (response.status !== 200) {
                              // console.log('Looks like there was a problem. Status Code: ' + response.status);
                            }
                            return response.json();
                          })
                        .then(function (data) {
                          return data
                        })
  }
}
