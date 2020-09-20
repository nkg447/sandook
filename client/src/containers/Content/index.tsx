import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../actions/file';
import { RootState } from '../../store';
import * as Colors from '../../theme/Colors';
import { FileState } from '../../types/file';
import BodyContextMenu from './BodyContextMenu';
import CurrentPath from './CurrentPath';
import FileGroup from './FileGroup';

type Props = ConnectedProps<typeof connector>;

type Position = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

function Content(props: Props) {
  useEffect(() => props.onUpdateFiles(props.path), []);
  const { files, folders, path } = props;
  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const [position, setPosition] = useState<Position>({});
  const onContextMenuHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setPosition({ top: e.clientY, left: e.clientX });
    setContextMenuVisible(true);
  };
  return (
    <Root
      onClick={() => setContextMenuVisible(false)}
      onContextMenu={onContextMenuHandler}
    >
      <CurrentPath onPathChangeHandler={props.onUpdateFiles} path={path} />
      <FileGroup
        onFileCardClick={(path: string) => {
          setContextMenuVisible(false);
          props.onUpdateFiles(path);
        }}
        type="Folders"
        files={folders}
      />
      <FileGroup type="Files" files={files} />
      <BodyContextMenu visible={isContextMenuVisible} {...position} />
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
  height: 100%;
`;
