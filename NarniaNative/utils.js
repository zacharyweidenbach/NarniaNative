import ip from './network.js';

export async function POSTfetch(path, body) {
  var api = 'http://' + ip.address + ':3000/api/' + path;
  if (body) {
    var info = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
  } else {
    var info = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
  }

  try {
    return fetch(api, info).then((res) => res.json());
  } catch(err) {
    console.log(err);
  }
};

export async function GETfetch(path) {
  var api = 'http://' + ip.address + ':3000/api/' + path;
  var info = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  try {
    return fetch(api, info).then((res) => res.json());
  } catch(err) {
    console.log(err);
  }
};

