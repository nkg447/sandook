import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../actions/file';
import { RootState } from '../../store';
import * as Colors from '../../theme/Colors';
import { Position } from '../../types';
import { FileState } from '../../types/file';
import BodyContextMenu from './BodyContextMenu';
import CurrentPath from './CurrentPath';
import FileGroup from './FileGroup';

type Props = ConnectedProps<typeof connector>;

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
  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const uploadFile = e.target.files[0];
      props.uploadFile(uploadFile, props.path);
    }
  };
  const ref = React.createRef<HTMLDivElement>();
  return (
    <Root ref={ref} onContextMenu={onContextMenuHandler}>
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
      {isContextMenuVisible ? <BodyContextMenu contextFor={ref} {...position} /> : null}
      <input
        onChange={uploadHandler}
        id="upload"
        name="file"
        type="file"
        style={{ display: 'none' }}
      />
    </Root>
  );
}

const mapDispatchToProps = {
  onUpdateFiles: (path: string) => actions.updateFiles(path),
  uploadFile: (file: any, path: string) => actions.uploadFile(file, path)
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
