import React from 'react';
import { Row, Col } from 'reactstrap';
import { Select, InputLabel, MenuItem, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const Discount = (props) => {
  const classes = useStyles();
  const { discounts, discount, setDiscount } = props;
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (item) => () => {
    if (checked == item.name) {
      setChecked(null);
      setDiscount(null);
    } else {
      setChecked(item.name);
      setDiscount(item);
    }
  };

  return (
    <div>
      <Typography gutterBottom variant='h6'>
        Discounts
      </Typography>
      <List className={classes.root}>
        {discounts.map((item) => {
          const labelId = `${item.name}`;

          return (
            <ListItem
              key={item}
              role={undefined}
              dense
              button
              onClick={handleToggle(item)}
            >
              <ListItemIcon>
                <Checkbox
                  edge='start'
                  checked={checked == item.name}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={`${item.name}`}
                secondary={
                  item.percentage ? `${item.amount}%` : `$${item.amount}`
                }
              />
              <ListItemSecondaryAction></ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Discount;
