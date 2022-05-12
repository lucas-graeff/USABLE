import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { Select, InputLabel, MenuItem } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import * as api from '../util/apiClients/restuarant';
import Item from './Item';
import Discount from './Discount';
import Tax from './Tax';
import OrderedItem from './OrderedItem';
import Invoice from './Invoice';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

async function getData(
  setEmployeeOptions,
  setMenuItems,
  setDiscounts,
  setTaxes
) {
  let employees = await api.getEmployees();
  setEmployeeOptions(employees);
  let items = await api.getItems();
  setMenuItems(items);
  let discounts = await api.getDiscounts();
  setDiscounts(discounts);
  let taxes = await api.getTaxes();
  setTaxes(taxes);
}

function renderMenuItems(menuItems, orderItems, setOrderItems) {
  return (
    <div>
      {menuItems.map((item, index) => (
        <Item
          key={index}
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
      {orderItems.map((item, index) => (
        <OrderedItem
          index={index}
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
  const [employee, setEmployee] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [discount, setDiscount] = useState(null);
  const [taxes, setTaxes] = useState([]);
  const [appliedTaxes, setAppliedTaxes] = useState([]);

  const [subTotal, setSubTotal] = useState(0.0);
  const [total, setTotal] = useState(0.0);

  const classes = useStyles();

  useEffect(() => {
    getData(setEmployeeOptions, setMenuItems, setDiscounts, setTaxes);
  }, []); // eslint-disable-line

  return (
    <div>
      <Row>
        <Col>
          <FormControl className={classes.formControl}>
            <InputLabel id='employeesLabel'>Employee</InputLabel>
            <Select labelId='employeesLabel' id='employees'>
              {employeeOptions.map((option) => (
                <MenuItem
                  key={option.id}
                  value={`${option.firstName} ${option.lastName}`}
                >{`${option.firstName} ${option.lastName}`}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {menuItems.length
            ? renderMenuItems(menuItems, orderItems, setOrderItems)
            : console.log('No menu items')}
          {orderItems.length
            ? renderOrderItems(orderItems, setOrderItems)
            : console.log('No order items')}
          <Discount discounts={discounts} setDiscount={setDiscount} />
          <Tax
            taxes={taxes}
            appliedTaxes={appliedTaxes}
            setAppliedTaxes={setAppliedTaxes}
          />
          <p onClick={() => console.log(appliedTaxes)}>Click me</p>
        </Col>
      </Row>
      <Invoice
        employee={employee}
        orderItems={orderItems}
        discount={discount}
        taxes={taxes}
      />
    </div>
  );
};
