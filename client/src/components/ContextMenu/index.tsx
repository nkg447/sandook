import React from 'react';
import styled from 'styled-components';

import { Paper } from '@material-ui/core';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  visible: boolean;
  children: any;
};

export default function ContextMenu({
  top,
  left,
  bottom,
  right,
  children,
  visible,
  ...otherProps
}: Props) {
  const style: React.CSSProperties = { top, left, bottom, right };
  if (!visible) {
    style.display = 'none';
  }
  return (
    <Root {...otherProps} square elevation={5} style={style}>
      {children}
    </Root>
  );
}

const Root = styled(Paper)`
  position: absolute;
`;
