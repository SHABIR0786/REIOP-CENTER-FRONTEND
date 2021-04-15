import axios from "axios";
const urlPrefix = "http://localhost:8000/api";

export async function get(subURL) {
  return axios
    .get(urlPrefix + subURL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Error " + error);
      return error;
    });
}

export async function post(subURL, data) {
  return axios
    .post(urlPrefix + subURL, data)
    .then((response) => {
      console.log(response, 'new')
      return response.data
    })
    .catch((error) => {
      console.log("error" + error);
      return error;
    });
}