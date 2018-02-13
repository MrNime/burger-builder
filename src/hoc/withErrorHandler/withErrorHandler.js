import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) =>
  class extends Component {
    state = {
      error: null,
    };
    componentDidMount() {
      axios.interceptors.response.use(
        res => res,
        (error) => {
          this.setState({ error });
          console.log('errorHandler object:', error);
          console.log('errorHandler stringified:', JSON.stringify(error, null, 2));
        },
      );
      axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <React.Fragment>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };

export default withErrorHandler;
