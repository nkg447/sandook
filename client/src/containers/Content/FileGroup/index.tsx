import React from 'react';
import styled from 'styled-components';

import * as Colors from '../../../theme/Colors';
import { File } from '../../../types/file';
import FileCard from './FileCard';

interface Props {
  files: File[];
  type: string;
  onFileCardClick?: (path: string) => void;
}

export default function FileGroup({ files, type, onFileCardClick }: Props) {
  return (
    <>
      <Header>{type}</Header>
      <Root>
        {files.map((file, i) => (
          <FileCard
            onClickHandler={onFileCardClick ? onFileCardClick : undefined}
            file={file}
            key={i}
          />
        ))}
      </Root>
    </>
  );
}

const Root = styled.div`
  padding-bottom: 8px;
  contain: style;
  display: block;
  flex: 1 0 auto;
  width: 100%;
  min-height: 100%;
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
`;

const Header = styled.div`
  color: ${Colors.textColor};
  margin-left: 22px;
  padding: 8px 0 16px;
  font-weight: 500;
  font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-size: 13px;
`;
