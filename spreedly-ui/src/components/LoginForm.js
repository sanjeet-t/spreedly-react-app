import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react';

import ErrorMessage from './ErrorMessage';

class LoginForm extends Component {
  state = {
    userName: '',
    password: '',
    disabled: true,
    loading: false,
    isAuthenticated: false
  };

  handleSubmit = async () => {
    this.setState({ loading: true });
    await this.props.loginUser(_.pick(this.state, ['userName', 'password']));
    this.setState({ loading: false });
    const isAuthenticated = this.props.login.loginUser !== null;
    this.setState({ isAuthenticated: isAuthenticated });
    if (isAuthenticated) {
      this.props.history.push('/spreedly');
    }
  };

  enableLoginButton = () => {
    const { userName, password } = this.state;
    const invalidUser = userName.length < 5 || userName.length > 15;
    const invalidPass = password.length < 5 || password.length > 15;
    const enableLogin = invalidUser || invalidPass;
    this.setState({ disabled: enableLogin });
  };

  hanldeUserNameChange = e => {
    this.setState({ userName: e.target.value });
    this.enableLoginButton();
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
    this.enableLoginButton();
  };

  render() {
    const colorScheme = 'olive';
    const { loading } = this.state;
    const { loginError } = this.props.login;

    return (
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color={colorScheme} textAlign="center">
            <Image src="/logo192.png" />
            Spreedly Integration
          </Header>
          <Form size="large" loading={loading}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="User name"
                minLength="5"
                maxLength="15"
                onChange={this.hanldeUserNameChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                minLength="5"
                maxLength="15"
                onChange={this.handlePasswordChange}
              />

              <Button
                color={colorScheme}
                fluid
                size="large"
                disabled={this.state.disabled}
                onClick={this.handleSubmit}
              >
                Login
              </Button>
            </Segment>
          </Form>
          <ErrorMessage
            show={loginError}
            header="Invalid Credentials"
            content="Username or password incorrect"
          ></ErrorMessage>
          <Message>
            New user ? <Link to="/signup">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return { login: state.login };
};

export default connect(mapStateToProps, { loginUser })(LoginForm);
