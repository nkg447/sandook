import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import { Close, DeleteForever, Edit, FolderOpen, GetApp } from '@material-ui/icons';

import * as actions from '../../../../../actions/file';
import ContextMenu from '../../../../../components/ContextMenu';
import IconText from '../../../../../components/IconText';
import Spliter from '../../../../../components/Spliter';
import service from '../../../../../service/FileService';
import { RootState } from '../../../../../store';
import * as Colors from '../../../../../theme/Colors';
import { File, FileState } from '../../../../../types/file';

type Props = React.HTMLAttributes<HTMLDivElement> &
  ConnectedProps<typeof connector> & {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
    file: File;
    closeContextMenu: () => void;
    onRenameClick: () => void;
  };

function FileContextMenu({
  top,
  left,
  right,
  bottom,
  file,
  closeContextMenu,
  onRenameClick,
  ...otherProps
}: Props) {
  const position = { top, left, right, bottom };

  return (
    <Root {...position}>
      {file?.isDir ? (
        <StyledIconText
          onClick={() => {
            closeContextMenu();
            otherProps.onUpdateFiles(file.path);
          }}
          icon={<FolderOpen />}
        >
          Open Folder
        </StyledIconText>
      ) : (
        <StyledIconText
          onClick={() => {
            closeContextMenu();
            service.download(file.path);
          }}
          icon={<GetApp />}
        >
          Download
        </StyledIconText>
      )}
      <Spliter />
      <StyledIconText
        onClick={() => {
          closeContextMenu();
          otherProps.onDeletFile(file.path);
        }}
        icon={<DeleteForever />}
      >
        Remove
      </StyledIconText>
      <Spliter />
      <StyledIconText
        onClick={() => {
          closeContextMenu();
          onRenameClick();
        }}
        icon={<Edit />}
      >
        Rename
      </StyledIconText>
      <Spliter />
      <StyledIconText
        onClick={() => {
          closeContextMenu();
        }}
        icon={<Close />}
      >
        Close
      </StyledIconText>
    </Root>
  );
}

const mapDispatchToProps = {
  onUpdateFiles: (path: string) => actions.updateFiles(path),
  onDeletFile: (path: string) => actions.deleteFile(path)
};

function mapStateToProps(state: RootState): FileState {
  return state.file;
}
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(FileContextMenu);

const Root = styled(ContextMenu)`
  background-color: ${Colors.backgroundColor};
`;
const StyledIconText = styled(IconText)`
  color: ${Colors.textColor};
  min-width: 200px;
  cursor: pointer;
`;
