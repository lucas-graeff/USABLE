import axios from 'axios';

const base = '/api/restaurant';

//Create
export const createOrder = async (
  employee,
  items,
  discount,
  taxes,
  dateTime,
  totalPrice
) => {
  axios.post(`${base}/createorder`, {
    employee,
    items,
    discount,
    taxes,
    dateTime,
    totalPrice,
  });
};

//Read
export const getEmployees = async () =>
  axios.get(`${base}/getemployees`).then((response) => response.data);

export const getItems = async () =>
  axios.get(`${base}/getitems`).then((response) => response.data);

export const getDiscounts = async () =>
  axios.get(`${base}/getdiscounts`).then((response) => response.data);

export const getTaxes = async () =>
  axios.get(`${base}/gettaxes`).then((response) => response.data);

export const getOrders = async () =>
  axios.get(`${base}/getorders`).then((response) => response.data);

//Update

//Delete
