import React from 'react';
import { Row, Col } from 'reactstrap';
import { Select, InputLabel, MenuItem, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import * as api from '../util/apiClients/restuarant';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
}));

const Item = (props) => {
  const { name, price, orderItems, setOrderItems } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography gutterBottom variant='h4'>
              {name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant='h6'>
              ${price}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div className={classes.section3}>
        <Button
          color='primary'
          onClick={() => {
            // let temp = [{ or...orderItems }];
            // temp.push({ name, price });
            let id = orderItems.length;
            setOrderItems((orderItems) => [...orderItems, { id, name, price }]);
          }}
        >
          Add to cart
        </Button>
      </div>
      <Divider />
    </div>
  );
};

export default Item;
