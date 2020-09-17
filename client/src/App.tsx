import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled, { ThemeProvider } from 'styled-components';

import { StylesProvider } from '@material-ui/core/styles';

import * as actions from './actions/file';
import Header from './components/Header';
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
        <Root>
          <Header toggleTheme={toggleTheme} title="Sandook"></Header>
          <Sidebar align="left">{}</Sidebar>
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
`;
