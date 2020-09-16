import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

export interface Props {
  children: any;
  align: 'right' | 'left';
}

export default function Sidebar({ align, children }: Props) {
  const classes = useStyles();
  let alignStyle: any = {};
  if (align === 'left') {
    alignStyle.left = '0px';
  } else {
    alignStyle.right = '0px';
  }
  return (
    <div className={classes.root} style={alignStyle}>
      {children}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: '0px',
    maxWidth: '394px',
    minWidth: '256px',
    height: '100vh',
    flex: '0 0 auto',
    position: 'absolute',
    display: 'block',
    color: '#202124',
    fontFamily: 'Roboto,RobotoDraft,Helvetica,Arial,sans-serif',
    fontSize: '13px',
    backgroundColor: '#222'
  }
});
