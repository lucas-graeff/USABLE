import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import * as api from '../util/apiClients/restuarant';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function handleSubmit(employee, items, discount, taxes, totalPrice) {
  if (!items.isEmpty) {
    var date = new Date();
    var dotNetDate = date.toISOString();
    api.createOrder(employee, items, discount, taxes, dotNetDate, totalPrice);
  }
}

const Invoice = (props) => {
  const {
    editing,
    employee,
    orderItems,
    discount,
    taxes,
    setOrderItems,
    dateTime,
  } = props;
  let discountAmount = 0.0;

  let subTotal = 0.0;
  orderItems.map((item) => {
    subTotal += item.price;
  });
  if (discount != null) {
    if (discount.percentage) {
      discountAmount = subTotal * (discount.amount * 0.01);
      subTotal -= discountAmount;
    } else {
      discountAmount = discount.amount;
      subTotal -= discount.amount;
    }
  }

  let taxTotal = 0.0;
  taxes.map((item) => {
    taxTotal += item.percentage;
  });
  if (subTotal < 0) {
    subTotal = 0.0;
  }
  const constantSubtotal = subTotal;
  taxTotal *= 0.01;
  let total = subTotal + subTotal * taxTotal;

  const classes = useStyles();

  return (
    <div>
      <Typography gutterBottom variant='h6'>
        Summary
      </Typography>
      {employee != null ? (
        <Typography gutterBottom variant='subtitle1'>
          Employee: {employee.firstName} {employee.lastName}
        </Typography>
      ) : null}
      {!editing ? (
        <Typography gutterBottom variant='subtitle1'>
          Submitted: {dateTime}
        </Typography>
      ) : null}

      <Container>
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>DESC</TableCell>
                <TableCell>AMT</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderItems.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  {editing ? (
                    <TableCell>
                      <Button
                        color='primary'
                        onClick={() => {
                          setOrderItems([
                            ...orderItems.slice(0, index),
                            ...orderItems.slice(index + 1),
                          ]);
                        }}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  ) : null}
                </TableRow>
              ))}
              <TableRow>
                <TableCell>DISCOUNT</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              {discount != null ? (
                <TableRow>
                  <TableCell>{discount.name}</TableCell>
                  <TableCell>({discountAmount.toFixed(2)})</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ) : null}
              <TableRow>
                <TableCell>SUBTOTAL</TableCell>
                <TableCell>{subTotal}</TableCell>
                <TableCell></TableCell>
              </TableRow>

              <TableRow>
                <TableCell>TAXES</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>

              {taxes.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {row.name} Tax - ({row.percentage.toFixed(2)}%)
                  </TableCell>
                  <TableCell>
                    {(constantSubtotal * (row.percentage * 0.01)).toFixed(2)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell>TOTAL</TableCell>
                <TableCell>${total.toFixed(2)}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {editing ? (
          <Button
            onClick={() =>
              handleSubmit(employee, orderItems, discount, taxes, total)
            }
          >
            Submit
          </Button>
        ) : null}
      </Container>
    </div>
  );
};

export default Invoice;
