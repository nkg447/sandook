import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../actions/system';
import Sidebar from '../../components/Sidebar';
import { RootState } from '../../store';
import * as Colors from '../../theme/Colors';
import { SystemState } from '../../types/system';

type Props = ConnectedProps<typeof connector>;

function LeftSidebar(props: Props) {
  useEffect(() => props.fetchSystemData(), []);
  const { hostname, osType, totalmem, freemem } = props;
  const usedPer = 100 - (Number(freemem) / Number(totalmem)) * 100;
  const totalMem = (Number(totalmem) / 1024 / 1024 / 1024).toFixed(2);
  const usedMem = ((usedPer * Number(totalMem)) / 100).toFixed(2);
  return (
    <Root align="left">
      <Info>
        <strong>Hostname</strong>: {hostname}
      </Info>
      <Info>
        <strong>OS</strong>: {osType}
      </Info>
      <Info>
        <strong>Storage</strong>
      </Info>
      <ProgressBar>
        <Progress style={{ width: usedPer + '%' }} />
      </ProgressBar>
      <Info>
        <strong>{usedMem}</strong>/<strong>{totalMem}</strong>GB
        <strong> {usedPer.toFixed(2)}%</strong> USED
      </Info>
    </Root>
  );
}

const mapDispatchToProps = {
  fetchSystemData: () => actions.fetchSystemData()
};

function mapStateToProps(state: RootState): SystemState {
  return state.system;
}
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LeftSidebar);

const Root = styled(Sidebar)`
  padding: 12px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    display: none;
  }
`;
const Info = styled.div`
  font-size: 13px;
  font-family: monospace;
  margin-bottom: 12px;
`;
const ProgressBar = styled.div`
  width: 100%;
  height: 5px;
  margin-bottom: 12px;
  background-color: ${Colors.textColor};
  border-radius: 6px;
`;
const Progress = styled.div`
  background-color: blue;
  height: 100%;
  border-radius: 6px;
`;
