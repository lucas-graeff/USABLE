import React from 'react';
import { Row, Col } from 'reactstrap';
import { Select, InputLabel, MenuItem, Button } from '@material-ui/core';
import * as api from '../util/apiClients/restuarant';

const Item = (props) => {
  const { name, price, orderItems, setOrderItems } = props;
  return (
    <div>
      <p>{name}</p>
      <p>{price}</p>
      <Button
        color='primary'
        onClick={() => {
          let temp = [{ ...orderItems }];
          temp.push({ name, price });
          setOrderItems(temp);
        }}
      >
        Add
      </Button>
    </div>
  );
};

export default Item;
