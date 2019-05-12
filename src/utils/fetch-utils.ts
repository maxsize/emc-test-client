const getToken = () => {
  try {
    const obj = JSON.parse(window.localStorage.getItem('token'));
    return obj.token;
  } catch (error) {
    return '';
  }
}

const post = (url: string, data: object) => fetch(url, {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "x-access-token": getToken()
  },
  body: JSON.stringify(data)
}).then(res => res.json());

const get = (url: string) => fetch(url, {
  method: 'GET',
  headers: {
    // "Content-Type": "application/json",
    "x-access-token": getToken()
  },
}).then(res => res.json());

const getUser = () => {
  try {
    const obj = JSON.parse(window.localStorage.getItem('token'));
    return JSON.parse(obj.user);
  } catch (error) {
    return {};
  }
}

const invalidToken = ({ code }: any) => code === 'invalid token';

export default { post, get, getUser, invalidToken };