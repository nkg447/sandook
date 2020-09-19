import * as CSS from 'csstype';
import React from 'react';
import styled from 'styled-components';

import * as Colors from '../../theme/Colors';

export interface Props {
  children: string;
  icon: any;
  outlined?: boolean;
}

export default function IconText({
  icon,
  children,
  outlined,
  ...otherProps
}: Props) {
  const rootStyle: CSS.Properties = {
    border: outlined ? '1px solid lightgrey' : 'none'
  };
  return (
    <Root {...otherProps} style={rootStyle}>
      <Icon>{icon}</Icon>
      <Text>{children}</Text>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  align-items: center;
  cursor: inherit;
  border-radius: 6px;
  color: ${Colors.textColor};
`;

const Icon = styled.div`
  flex: 0 0 auto;
  height: 24px;
  padding: 12px 16px;
  position: relative;
  width: 24px;
  z-index: 1;
  display: block;
  font-size: 13px;
`;
const Text = styled.div`
  flex: 1 1 auto;
  font-weight: 500;
  overflow: hidden;
  padding-right: 12px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
`;
