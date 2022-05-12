import axios from 'axios';

const base = '/api/restaurant';

//Create

//Read
export const getEmployees = async () =>
  axios.get(`${base}/getemployees`).then((response) => response.data);

export const getItems = async () =>
  axios.get(`${base}/getitems`).then((response) => response.data);

export const getDiscounts = async () =>
  axios.get(`${base}/getdiscounts`).then((response) => response.data);

export const getTaxes = async () =>
  axios.get(`${base}/gettaxes`).then((response) => response.data);

//Update

//Delete
