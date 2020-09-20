import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import { CloudUpload, CreateNewFolder } from '@material-ui/icons';

import * as actions from '../../../actions/file';
import ContextMenu from '../../../components/ContextMenu';
import IconText from '../../../components/IconText';
import { RootState } from '../../../store';
import * as Colors from '../../../theme/Colors';
import { FileState } from '../../../types/file';

type Props = React.HTMLAttributes<HTMLDivElement> &
  ConnectedProps<typeof connector> & {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
    visible: boolean;
  };

function BodyContextMenu({
  top,
  left,
  right,
  bottom,
  visible,
  ...otherProps
}: Props) {
  const position = { top, left, right, bottom };

  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const uploadFile = e.target.files[0];
      otherProps.uploadFile(uploadFile, otherProps.path);
    }
  };

  return (
    <Root visible={visible} {...position}>
      <label style={{ width: '100%', height: '100%' }} htmlFor="upload">
        <StyledIconText icon={<CloudUpload />}>Upload File</StyledIconText>
      </label>
      <input
        onChange={uploadHandler}
        id="upload"
        name="file"
        type="file"
        style={{ display: 'none' }}
      />
      <Spliter />
      <StyledIconText icon={<CreateNewFolder />}>New Folder</StyledIconText>
    </Root>
  );
}

const mapDispatchToProps = {
  uploadFile: (file: any, path: string) => actions.uploadFile(file, path)
};

function mapStateToProps(state: RootState): FileState {
  return state.file;
}
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(BodyContextMenu);

const Root = styled(ContextMenu)`
  background-color: ${Colors.backgroundColor};
`;
const StyledIconText = styled(IconText)`
  color: ${Colors.textColor};
  min-width: 200px;
`;
const Spliter = styled.div`
  width: 90%;
  margin-left: 5%;
  height: 1px;
  background-color: lightgrey;
`;
