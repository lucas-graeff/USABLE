import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { Select, InputLabel, MenuItem } from '@material-ui/core';
import * as api from '../util/apiClients/restuarant';
import Item from './Item';
import OrderedItem from './OrderedItem';

async function getData(setEmployeeOptions, setMenuItems) {
  let employees = await api.getEmployees();
  setEmployeeOptions(employees);
  let items = await api.getItems();
  setMenuItems(items);
}

function renderMenuItems(menuItems, orderItems, setOrderItems) {
  return (
    <div>
      {menuItems.map((item) => (
        <Item
          key={item.id}
          name={item.name}
          price={item.price}
          orderItems={orderItems}
          setOrderItems={setOrderItems}
        />
      ))}
    </div>
  );
}

function renderOrderItems(orderItems, setOrderItems) {
  return (
    <div>
      {orderItems.map((item) => (
        <OrderedItem
          key={item.id}
          name={item.name}
          price={item.price}
          orderItems={orderItems}
          setOrderItems={setOrderItems}
        />
      ))}
    </div>
  );
}

export const Home = (props) => {
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    getData(setEmployeeOptions, setMenuItems);
  }, []); // eslint-disable-line

  return (
    <div>
      <Row>
        <Col>
          <InputLabel id='employeesLabel'>Employee</InputLabel>
          <Select labelId='employeesLabel' id='employees'>
            {employeeOptions.map((option) => (
              <MenuItem
                key={option.id}
                value={`${option.firstName} ${option.lastName}`}
              >{`${option.firstName} ${option.lastName}`}</MenuItem>
            ))}
          </Select>

          {menuItems.length
            ? renderMenuItems(menuItems, orderItems, setOrderItems)
            : console.log('No menu items')}
          {orderItems.length
            ? renderOrderItems(orderItems, setOrderItems)
            : console.log('No order items')}
          <p onClick={() => console.log(orderItems)}>Click me</p>
        </Col>
      </Row>
    </div>
  );
};
