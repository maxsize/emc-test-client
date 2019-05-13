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
    "Authorization": `JWT ${getToken()}`
  },
  body: JSON.stringify(data)
}).then(res => {
  if (res.status === 401) {
    return Promise.resolve({ code: 'invalid token' });
  } else {
    return res.json();
  }
});

const get = (url: string) => fetch(url, {
  method: 'GET',
  headers: {
    // "Content-Type": "application/json",
    "Authorization": `JWT ${getToken()}`
  },
})
.then(res => {
  if (res.status === 401) {
    return Promise.resolve({ code: 'invalid token' });
  } else {
    return res.json();
  }
})
.catch(err => console.log(err))

const getUser = () => {
  try {
    const { user } = JSON.parse(window.localStorage.getItem('token'));
    return user;
  } catch (error) {
    return {};
  }
}

const invalidToken = ({ code }: any) => code === 'invalid token';

export default { post, get, getUser, invalidToken };