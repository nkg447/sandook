import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../actions/file';
import { RootState } from '../../store';
import * as Colors from '../../theme/Colors';
import { FileState } from '../../types/file';
import CurrentPath from './CurrentPath';
import FileGroup from './FileGroup';

type Props = ConnectedProps<typeof connector>;

function Content(props: Props) {
  useEffect(() => props.onUpdateFiles(props.path), []);
  const { files, folders, path } = props;
  return (
    <Root>
      <CurrentPath onPathChangeHandler={props.onUpdateFiles} path={path} />
      <FileGroup
        onFileCardClick={props.onUpdateFiles}
        type="Folders"
        files={folders}
      />
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

const Root = styled.div`
  width: 100%;
`;
