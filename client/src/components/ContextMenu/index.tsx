import React, { useState } from 'react';
import styled from 'styled-components';

import { Paper } from '@material-ui/core';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  children: any;
  contextFor: any;
};

type State = {
  visible: boolean;
};

export default class ContextMenu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  componentDidMount() {
    if (this.props.contextFor && this.props.contextFor.current) {
      this.props.contextFor.current.addEventListener(
        'contextmenu',
        this.handleContextMenu
      );
    }
    // document.addEventListener('contextmenu', () =>
    //   this.setState({ visible: false })
    // );
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    if (this.props.contextFor && this.props.contextFor.current) {
      this.props.contextFor.current.parentNode.removeEventListener(
        'contextmenu',
        this.handleContextMenu
      );
    }
    document.removeEventListener('click', this.handleClick);
  }

  handleClick = (e: MouseEvent) => {
    if (this.state.visible) {
      this.setState({ visible: false });
    }
  };

  handleContextMenu = (e: MouseEvent) => {
    // e.preventDefault();
    // e.stopPropagation();
    this.setState({
      visible: true
    });
  };

  render() {
    console.log(this.props.contextFor);
    if (!this.state.visible) return null;
    const { top, left, bottom, right, children, ...otherProps } = this.props;
    const style: React.CSSProperties = { top, left, bottom, right };
    return (
      <Root {...otherProps} square elevation={5} style={style}>
        {children}
      </Root>
    );
  }
}

const Root = styled(Paper)`
  position: absolute;
  z-index: 2;
`;
