import React from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';

import * as Colors from '../../theme/Colors';

export interface Props {
  children: any;
  align: 'right' | 'left';
}

export default function Sidebar({ align, children }: Props) {
  let alignStyle: any = {};
  if (align === 'left') {
    alignStyle.left = '0px';
  } else {
    alignStyle.right = '0px';
  }
  return <Root style={alignStyle}>{children}</Root>;
}

const Root = styled.div`
  width: 0px;
  max-width: 394px;
  min-width: 256px;
  height: 100vh;
  flex: 0 0 auto;
  position: absolute;
  display: block;
  color: ${Colors.textColor};
  font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-size: 13px;
  background-color: ${Colors.backgroundColor};
  border: 1px solid lightgrey;
`;
