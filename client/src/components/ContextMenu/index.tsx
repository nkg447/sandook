import React, { useState } from 'react';
import styled from 'styled-components';

import { Paper } from '@material-ui/core';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  children: any;
};

type State = {
  visible: boolean;
};

export default function ContextMenu(props: Props) {
  const { top, left, bottom, right, children, ...otherProps } = props;
  const style: React.CSSProperties = { top, left, bottom, right };
  return (
    <Root {...otherProps} square elevation={5} style={style}>
      {children}
    </Root>
  );
}

const Root = styled(Paper)`
  position: absolute;
  z-index: 2;
`;
