import axios from 'axios';

const base = '/api/restaurant';

//Create

//Read
export const getEmployees = async () =>
  axios.get(`${base}/getemployees`).then((response) => response.data);

export const getItems = async () =>
  axios.get(`${base}/getitems`).then((response) => response.data);

//Update

//Delete
