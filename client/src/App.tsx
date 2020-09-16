import './App.css';

import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as actions from './actions/file';
import logo from './logo.svg';
import { FileState } from './types/file';

function App(props: FileState) {
  console.log(props);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
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
