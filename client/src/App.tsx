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
import * as Colors from './theme/Colors';
import { FileState } from './types/file';

function App(props: FileState) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () =>
    theme === 'light' ? setTheme('dark') : setTheme('light');
  return (
    <ThemeProvider theme={{ mode: theme }}>
      <StylesProvider injectFirst>
        <Header toggleTheme={toggleTheme} title="Sandook"></Header>
        <Root>
          <Sidebar align="left">{}</Sidebar>
          <Container>
            <IconText outlined icon={<Folder />}>Hello World! Its Node</IconText>
            <IconText outlined icon={<Folder />}>Hello World! Its Node</IconText>
            <IconText outlined icon={<Folder />}>Hello World! Its Node</IconText>
            <IconText outlined icon={<Folder />}>Hello World! Its Node</IconText>
          </Container>
          <Sidebar align="right">{}</Sidebar>
        </Root>
      </StylesProvider>
    </ThemeProvider>
  );
}

export function mapDispatchToProps(dispatch: Dispatch<actions.FileAction>) {
  return {
    onUpdateFiles: (path: string) => dispatch(actions.updateFiles(path))
  };
}
export function mapStateToProps(state: FileState) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

const Root = styled.div`
  background-color: ${Colors.backgroundColor};
  height: 100vh;
  display: flex;
`;

const Container = styled.div`
  width: 100%;
`;
