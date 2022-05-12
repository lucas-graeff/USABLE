import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Invoice = (props) => {
  const { employee, orderItems, discount, taxes } = props;
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>QTY</TableCell>
            <TableCell align='right'>DESC</TableCell>
            <TableCell align='right'>AMT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderItems.map((row) => (
            <TableRow key={row.name}>
              <TableCell component='th' scope='row'>
                {}
              </TableCell>
              <TableCell align='right'>{orderItems.name}</TableCell>
              <TableCell align='right'>{orderItems.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Invoice;
