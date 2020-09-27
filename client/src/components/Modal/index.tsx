import React from 'react';
import styled from 'styled-components';

import { Close } from '@material-ui/icons';

import * as Colors from '../../theme/Colors';

type Props = {
  closeModal: () => void;
  children: any;
};

export default function Modal({ closeModal, children }: Props) {
  return (
    <Root>
      <Container>
        <Close onClick={closeModal} style={{ float: 'right', cursor: 'pointer' }} />
        <div>{children}</div>
      </Container>
    </Root>
  );
}
const Root = styled.div`
  position: fixed;
  z-index: 99;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  background-color: ${Colors.backgroundColor};
  color: ${Colors.textColor};
  height: max-content;
  padding: 12px;
  border-radius: 6px;
`;
