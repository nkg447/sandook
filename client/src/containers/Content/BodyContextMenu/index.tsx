import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import { CloudUpload, CreateNewFolder, Http } from '@material-ui/icons';

import ContextMenu from '../../../components/ContextMenu';
import IconText from '../../../components/IconText';
import Spliter from '../../../components/Spliter';
import socket from '../../../socket';
import * as Colors from '../../../theme/Colors';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  onNewFolderClick: () => void;
  onUploadFromUrlClick: () => void;
};

export default function BodyContextMenu({
  top,
  left,
  right,
  bottom,
  onNewFolderClick,
  onUploadFromUrlClick,
  ...otherProps
}: Props) {
  const position = { top, left, right, bottom };
  return (
    <Root {...position}>
      <label
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', height: '100%' }}
        htmlFor="upload"
      >
        <StyledIconText icon={<CloudUpload />}>Upload File</StyledIconText>
      </label>
      <Spliter />
      <StyledIconText onClick={onUploadFromUrlClick} icon={<Http />}>
        Upload from URL
      </StyledIconText>
      <Spliter />
      <StyledIconText onClick={onNewFolderClick} icon={<CreateNewFolder />}>
        New Folder
      </StyledIconText>
    </Root>
  );
}

const Root = styled(ContextMenu)`
  background-color: ${Colors.backgroundColor};
`;
const StyledIconText = styled(IconText)`
  color: ${Colors.textColor};
  min-width: 200px;
  cursor: pointer;
`;
