import axios from "axios";

const urlPrefix = process.env.VUE_APP_API_URL;

export function setHeader(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
        axios.defaults.headers.common['Authorization'] = '';
    }
}

export async function get(subURL) {
  setHeaderTeamAccessId();
  return axios.get(urlPrefix + subURL)
      .then((response) => {
        if(response.status == 401) {
          this.$store.dispatch('loginModule/logout', null, {root: true})
        }
        return response.data;
      }).catch((error) => {
        console.warn("Error GET" + error);
        return error;
      });
}

export async function post(subURL, data) {
  setHeaderTeamAccessId();
  return axios.post(urlPrefix + subURL, data)
    .then((response) => {
      if(response.status == 401) {
        this.$store.dispatch('loginModule/logout', null, {root: true})
      }
      return response.data
    }).catch((error) => {
      console.warn("Error POST" + error);
      return error;
    });
}

export async function put(subURL, data) {
  setHeaderTeamAccessId();
  return axios.put(urlPrefix + subURL, data)
    .then((response) => {
      if(response.status == 401) {
        this.$store.dispatch('loginModule/logout', null, {root: true})
      }
      return response.data
    }).catch((error) => {
      console.warn("Error PUT" + error);
      return error;
    });
}

export async function deleteAPI(subURL) {
  setHeaderTeamAccessId();
  return axios.delete(urlPrefix + subURL)
    .then((response) => {
      if(response.status == 401) {
        this.$store.dispatch('loginModule/logout', null, {root: true})
      }
      return response.data
    }).catch((error) => {
      console.warn("Error DELETE" + error);
      return error;
    });
}

function setHeaderTeamAccessId() {
  let teamId = sessionStorage.getItem('teamAccessId');
  if (teamId) {
      axios.defaults.headers.common['teamAccessId'] = teamId;
  }

}
