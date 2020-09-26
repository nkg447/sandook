import React from 'react';
import styled from 'styled-components';

import * as Colors from '../../theme/Colors';

type Props = React.HTMLAttributes<HTMLButtonElement> & {};

export default (props: Props) => {
  const { children, ...otherProps } = props;
  return <Button {...otherProps}>{children}</Button>;
};
const Button = styled.button`
  border: 1px solid transparent;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  margin: 0 8px;
  outline: none;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1),
    background 200ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 400ms cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2px;
  font-weight: 500;
  font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  min-width: 64px;
  padding: 0 16px;
  text-align: center;
  text-transform: uppercase;
  font-size: 13px;
  line-height: 30px;
  min-height: 32px;
  background: ${Colors.backgroundColor};
  color: ${Colors.textColor};
`;
