import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled, { ThemeProvider } from 'styled-components';

import { StylesProvider } from '@material-ui/core/styles';
import { Folder } from '@material-ui/icons';

import * as actions from './actions/file';
import Header from './components/Header';
import IconText from './components/IconText';
import Sidebar from './components/Sidebar';
import Content from './containers/Content';
import * as Colors from './theme/Colors';
import { FileState } from './types/file';

export default function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  );
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };
  return (
    <ThemeProvider theme={{ mode: theme }}>
      <StylesProvider injectFirst>
        <Header toggleTheme={toggleTheme} title="Sandook"></Header>
        <Root>
          {/* <Sidebar align="left">{}</Sidebar> */}
          <Container>
            <Content></Content>
          </Container>
          {/* <Sidebar align="right">{}</Sidebar> */}
        </Root>
      </StylesProvider>
    </ThemeProvider>
  );
}

const Root = styled.div`
  background-color: ${Colors.backgroundColor};
  height: 100vh;
  display: flex;
`;

const Container = styled.div`
  width: 100%;
`;
