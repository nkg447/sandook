import React from 'react';
import styled from 'styled-components';

type Props = React.HTMLAttributes<HTMLInputElement> & {
  type?: string;
};

export default function InputText({ type, ...otherProps }: Props) {
  return <Root {...otherProps} type={type ? type : 'text'} />;
}
const Root = styled.input`
  width: 80%;
  border-radius: 1px;
  border: 1px solid #d9d9d9;
  border-top: 1px solid #c0c0c0;
  font-size: 13px;
  height: 25px;
  padding: 1px 8px;
`;
