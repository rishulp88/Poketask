const BASE_URL = 'http://localhost:3009';


const apiService = {};

apiService.register = (user) => {
  return fetch(`http://localhost:3009/register`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.text();
    })
    .then((text) => {
      return JSON.parse(text);
    })
    .catch((err) => {console.log('Error during fetch:', err);
    throw err});
};

apiService.login = (user) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  })
  .then((res) => {
    return res.text();
  })
  .then((text) => {
    return JSON.parse(text);
  })
    .catch((err) => console.log(err));
};

apiService.logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

apiService.profile = () => {
  return fetch(`${BASE_URL}/me`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
  })
    .then((res) => {
      return res.text();
    })
    .then((text) => {
      return JSON.parse(text);
    })
      .catch((err) => console.log('api error profile ' ,err));
}

apiService.addTask = (task)=> {
  return fetch(`${BASE_URL}/addTask`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(task),
  })
  .then((res) => {
    return res.text();
  })
   .catch((err) => console.log(err));
}

apiService.remove = async (task) => {
  return fetch(`${BASE_URL}/remove`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(task),
  })
  .then((res) => {
    return res;
  }
  )
  .catch((err) => console.log(err));
}

apiService.check = async (task) => {
  return fetch(`${BASE_URL}/check`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(task),
  })
  .then((res) => {
    return res.json();
  }
  )
  .catch((err) => console.log(err));
}

apiService.getUserPoints = async () => {
  return fetch(`${BASE_URL}/points`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
  })
    .then((res) => {
      
      return res.json();
    })
      .catch((err) => console.log('api error profile ' ,err));
}

apiService.getTaskStatus = async (task) => {
  return fetch(`${BASE_URL}/isChecked`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(task),
  })
  .then((res) => {
    return res.json();
  }
  )
  .catch((err) => console.log(err));
}


export default apiService;
