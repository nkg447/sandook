import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import { CloudUpload, CreateNewFolder } from '@material-ui/icons';

import ContextMenu from '../../../components/ContextMenu';
import IconText from '../../../components/IconText';
import Spliter from '../../../components/Spliter';
import * as Colors from '../../../theme/Colors';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  contextFor: any;
};

export default function BodyContextMenu({
  top,
  left,
  right,
  bottom,
  contextFor,
  ...otherProps
}: Props) {
  const position = { top, left, right, bottom };
  return (
    <Root contextFor={contextFor} {...position}>
      <label
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', height: '100%' }}
        htmlFor="upload"
      >
        <StyledIconText icon={<CloudUpload />}>Upload File</StyledIconText>
      </label>
      <Spliter />
      <StyledIconText icon={<CreateNewFolder />}>New Folder</StyledIconText>
    </Root>
  );
}

const Root = styled(ContextMenu)`
  background-color: ${Colors.backgroundColor};
`;
const StyledIconText = styled(IconText)`
  color: ${Colors.textColor};
  min-width: 200px;
`;
