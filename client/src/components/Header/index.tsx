import React from 'react';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import * as Colors from '../../theme/Colors';

export interface Props {
  logo?: string;
  title: string;
  toggleTheme: () => void;
}

export default function Header({ title, logo, toggleTheme }: Props) {
  return (
    <Root>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
        <ThemeButton onClick={toggleTheme}>🌓</ThemeButton>
      </StyledAppBar>
    </Root>
  );
}

const Root = styled.div`
  flex-grow: 1;
  border-bottom: 1px solid lightgrey;
`;

const StyledAppBar = styled(AppBar)`
  background-color: ${Colors.backgroundColor};
  color: ${Colors.textColor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ThemeButton = styled.div`
  padding: 10px;
  cursor: pointer;
`;
