import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error, info) {
    this.setState({hasError: true});
    console.log('error', error);
    console.log('info', info);
  }

  render() {
    console.log('this.state.hasError', this.state.hasError);
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}
