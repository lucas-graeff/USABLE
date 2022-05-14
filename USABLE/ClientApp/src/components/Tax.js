import React, { useState } from 'react';
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
import IconButton from '@material-ui/core/IconButton';

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

const Tax = (props) => {
  const classes = useStyles();
  const { taxes, appliedTaxes, setAppliedTaxes } = props;
  const [checked, setChecked] = useState([]);

  const handleToggle = (item) => () => {
    const currentIndex = checked.indexOf(item.name);
    const newChecked = [...checked];
    let newTaxes = [...appliedTaxes];

    if (currentIndex === -1) {
      newChecked.push(item.name);
      newTaxes.push(item);
    } else {
      newChecked.splice(currentIndex, 1);
      console.log(appliedTaxes.indexOf(item));
      console.log(...appliedTaxes.slice(0, appliedTaxes.indexOf(item)));
      newTaxes = [
        ...appliedTaxes.slice(0, appliedTaxes.indexOf(item)),
        ...appliedTaxes.slice(appliedTaxes.indexOf(item) + 1),
      ];
    }

    setChecked(newChecked);
    setAppliedTaxes(newTaxes);
  };

  return (
    <div>
      <Typography gutterBottom variant='h6'>
        Taxes
      </Typography>
      <List className={classes.root}>
        {taxes.map((item, index) => {
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
                  checked={checked.indexOf(item.name) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={`${item.name}`}
                secondary={`${item.percentage}%`}
              />
              <ListItemSecondaryAction></ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Tax;
