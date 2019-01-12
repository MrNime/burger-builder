import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) =>
  class extends Component {
    state = {
      error: null,
    };
    componentWillMount() {
      this.responseInterceptor = axios.interceptors.response.use(
        res => res,
        (error) => {
          this.setState({ error });

          // Error.message zit in het prototype van dit error object
          // console.log('errorHandler create', Object.create(error));
        },
      );
      this.requestInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <React.Fragment>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };

export default withErrorHandler;
