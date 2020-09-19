import React from 'react';
import styled from 'styled-components';

import { KeyboardArrowRight } from '@material-ui/icons';

import * as Colors from '../../../theme/Colors';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  path: string;
  onPathChangeHandler?: (path: string) => void;
};

export default function CurrentPath({ path, onPathChangeHandler }: Props) {
  let folders = path
    .split('/')
    .map((folder, index) => ({ name: folder, index }))
    .filter((folder) => folder.name.length > 0);
  if (folders.length > 2) {
    folders = [
      { name: '...', index: -1 },
      ...folders.slice(folders.length - 2)
    ];
  }

  return (
    <Root>
      <PathContainer
        onClick={() => (onPathChangeHandler ? onPathChangeHandler('/') : null)}
      >
        <Path>Sandook</Path>
      </PathContainer>
      {folders.map((folder, i) => (
        <PathContainer
          onClick={() => {
            if (onPathChangeHandler && folder.index >= 0) {
              onPathChangeHandler(
                path
                  .split('/')
                  .slice(0, folder.index + 1)
                  .join('/')
              );
            }
          }}
        >
          <KeyboardArrowRight />
          <Path>{folder.name}</Path>
        </PathContainer>
      ))}
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  color: ${Colors.textColor};
  width: 100%;
  border-bottom: 1px solid grey;
  padding: 11px;
  box-sizing: border-box;
  align-items: center;
`;
const Path = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  padding-right: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  font-family: Google Sans, Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-variant-ligatures: no-contextual;
  font-size: 18px;
  line-height: 24px;
  margin: 2px 0;
  padding: 4px 8px 4px;
  cursor: pointer;
  border-radius: 6px;
  &:hover {
    background-color: lightgrey;
  }
`;
const PathContainer = styled.div`
  display: flex;
  align-items: center;
`;
