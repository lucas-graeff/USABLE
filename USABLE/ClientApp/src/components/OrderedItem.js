import React from 'react';
import { Row, Col } from 'reactstrap';
import { Select, InputLabel, MenuItem, Button } from '@material-ui/core';
import * as api from '../util/apiClients/restuarant';

const OrderedItem = (props) => {
  const { name, price, orderItems, setOrderItems } = props;
  console.log('Loaded');
  return (
    <div>
      <p>{name}</p>
      <p>{price}</p>
      <Button
        color='primary'
        onClick={() => {
          orderItems.splice(orderItems.indexOf({ name, price }), 1);
          setOrderItems(orderItems);
        }}
      >
        Remove
      </Button>
    </div>
  );
};

export default OrderedItem;
