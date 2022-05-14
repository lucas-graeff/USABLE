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
          itemId={item.itemId}
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
          id={item.id}
          name={item.name}
          price={item.price}
          orderItems={orderItems}
          setOrderItems={setOrderItems}
        />
      ))}
    </div>
  );
}

export const Home = () => {
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [discount, setDiscount] = useState(null);
  const [taxes, setTaxes] = useState([]);
  const [appliedTaxes, setAppliedTaxes] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    getData(setEmployeeOptions, setMenuItems, setDiscounts, setTaxes);
  }, []); // eslint-disable-line

  return (
    <div>
      <Row>
        <Col lg={6}>
          {menuItems.length
            ? renderMenuItems(menuItems, orderItems, setOrderItems)
            : console.log('No menu items')}
        </Col>
        <Col lg={6}>
          <div className='d-flex justify-content-center'>
            <FormControl className={classes.formControl}>
              <InputLabel id='employeesLabel'>Employee</InputLabel>
              <Select
                labelId='employeesLabel'
                id='employees'
                onChange={(event) => {
                  setEmployee(event.target.value);
                }}
              >
                {employeeOptions.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option}
                    onClick={() => {
                      setEmployee(option);
                    }}
                  >
                    {`${option.firstName} ${option.lastName}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* {orderItems.length
            ? renderOrderItems(orderItems, setOrderItems)
            : console.log('No order items')} */}
          <Discount discounts={discounts} setDiscount={setDiscount} />
          <Tax
            taxes={taxes}
            appliedTaxes={appliedTaxes}
            setAppliedTaxes={setAppliedTaxes}
          />
          <Invoice
            editing={true}
            employee={employee}
            orderItems={orderItems}
            discount={discount}
            taxes={appliedTaxes}
            setOrderItems={setOrderItems}
            setAppliedTaxes={setAppliedTaxes}
          />
        </Col>
      </Row>
    </div>
  );
};
