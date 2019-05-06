import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Segment,
  Icon,
  Message,
  Header
} from "semantic-ui-react";
import { inject, observer } from "mobx-react";
import { If } from "../helpers";

@inject("commonStore")
@observer
class LoginView extends Component {
  render() {
    const { commonStore } = this.props;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450, top: "15vh" }}>
          <Message
            icon="warning"
            header="Thanks for using Lista"
            content="You have successfully installed Lista. Register an account to create the admin."
          />
          <Button.Group size="large" fluid attached="top">
            <Button color="green" active={true}>
              <Icon name="user" />
              Login
            </Button>
            <If condition={commonStore.allowRegistration}>
              <Button color="teal">
                <Icon name="user plus" />
                Register
              </Button>
            </If>
          </Button.Group>

          <Segment attached="bottom">
            <If condition={true}>
              <Form size="large">
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />

                <Button color="green" fluid size="large">
                  Login
                </Button>
              </Form>
            </If>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default LoginView;
