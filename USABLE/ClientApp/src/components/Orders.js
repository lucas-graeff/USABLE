import React, { useState, useEffect } from 'react';
import Invoice from './Invoice';
import * as api from '../util/apiClients/restuarant';

async function getData(setOrder) {
  let response = await api.getOrders();
  setOrder(response);
}

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getData(setOrders);
  }, []); // eslint-disable-line

  return (
    <div>
      {orders.map((item, index) => (
        <Invoice
          editing={false}
          key={index}
          employee={item.employee}
          orderItems={item.items}
          discount={item.discount}
          taxes={item.taxes}
          dateTime={item.dateTime}
        />
      ))}
    </div>
  );
};
