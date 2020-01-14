import React from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';

const SignupForm = () => {
  const colorScheme = 'olive';
  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color={colorScheme} textAlign="center">
          New Account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Email"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button color={colorScheme} fluid size="large">
              Sign Up
            </Button>
          </Segment>
        </Form>

        <Message>
          Already have an account ? <Link to="/">Sign in here</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SignupForm;
