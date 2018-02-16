import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) =>
  class extends Component {
    state = {
      error: null,
    };
    componentWillMount() {
      axios.interceptors.response.use(
        res => res,
        (error) => {
          this.setState({ error });

          // Error.message zit in het prototype van dit error object
          console.log('errorHandler object:', error);
          console.log('errorHandler stringified:', JSON.stringify(error, null, 2));
          console.log('errorHandler entries', Object.entries(error));
          console.log('errorHandler create', Object.create(error));
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
