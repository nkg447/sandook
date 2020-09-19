import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../actions/file';
import { RootState } from '../../store';
import * as Colors from '../../theme/Colors';
import { FileState } from '../../types/file';
import FileGroup from './FileGroup';

type Props = ConnectedProps<typeof connector>;

function Content(props: Props) {
  useEffect(() => props.onUpdateFiles(window.location.pathname), [
    window.location.pathname
  ]);
  const { files, folders } = props;
  return (
    <Root>
      <FileGroup type="Folders" files={folders} />
      <FileGroup type="Files" files={files} />
    </Root>
  );
}

const mapDispatchToProps = {
  onUpdateFiles: (path: string) => actions.updateFiles(path)
};

function mapStateToProps(state: RootState): FileState {
  return state.file;
}
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Content);

const Root = styled.div``;
