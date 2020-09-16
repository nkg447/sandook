import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as actions from './actions/file';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { FileState } from './types/file';

function App(props: FileState) {
  console.log(props);

  return (
    <div>
      <Header title="Sandook"></Header>
      <Sidebar align="left">{}</Sidebar>
      <Sidebar align="right">{}</Sidebar>
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
