import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export interface Props {
  logo?: string;
  title: string;
}

export default function Header({ title, logo }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    borderBottom: "1px solid lightgrey"
  },
  appBar: {
    backgroundColor: '#222'
  },
  title: {
    flexGrow: 1
  }
});
