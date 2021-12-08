import {baseURL} from '../constants';

async function getUserByToken(token){
    return fetch(baseURL + 'getuserbytoken', {
        method: 'GET',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        }
      }).then(res => {
        return res.json();
      }).then(data => {
          return getUserById(data.id, token);
      })
}

async function getUserById(id, token){
    return fetch(baseURL + 'getuser/' + id, {
        method: 'GET',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        }
      }).then(res => {
        return res.json();
      }).then(data => {
        return data;
      })
}

export default {getUserByToken};