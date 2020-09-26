import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import { FolderOpen } from '@material-ui/icons';

import * as actions from '../../../../../actions/file';
import ContextMenu from '../../../../../components/ContextMenu';
import IconText from '../../../../../components/IconText';
import Spliter from '../../../../../components/Spliter';
import { RootState } from '../../../../../store';
import * as Colors from '../../../../../theme/Colors';
import { FileState } from '../../../../../types/file';

type Props = React.HTMLAttributes<HTMLDivElement> &
  ConnectedProps<typeof connector> & {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
    folderPath?: string;
    closeContextMenu: () => void;
  };

function FileContextMenu({
  top,
  left,
  right,
  bottom,
  folderPath,
  closeContextMenu,
  ...otherProps
}: Props) {
  const position = { top, left, right, bottom };

  return (
    <Root {...position}>
      {folderPath ? (
        <StyledIconText
          onClick={() => {
            closeContextMenu();
            otherProps.onUpdateFiles(folderPath);
          }}
          icon={<FolderOpen />}
        >
          Open Folder
        </StyledIconText>
      ) : null}
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

export default connector(FileContextMenu);

const Root = styled(ContextMenu)`
  background-color: ${Colors.backgroundColor};
`;
const StyledIconText = styled(IconText)`
  color: ${Colors.textColor};
  min-width: 200px;
`;
