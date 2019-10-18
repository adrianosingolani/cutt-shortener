import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import {
    Button,
    Form,
    Grid,
    Header,
    Container
} from 'semantic-ui-react';

import { default as SiteHeader } from './Header';

import { signUp } from '../actions/authActions';

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        password_confirm: '',
    }

    componentDidUpdate(prevProps) {
        const { message } = this.props;

        if (message !== prevProps.message && message.id === 'REGISTER_SUCCESS') {
            this.props.history.push("/dashboard");
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { email, password, password_confirm } = this.state;

        const newUser = {
            email, password, password_confirm
        }

        this.props.signUp(newUser);
    }

    render() {
        return (
            <React.Fragment>
                <SiteHeader />
                <Container>
                    <Header size="huge" textAlign="center">Sign up to start creating short links</Header>
                </Container>
                <Container>
                    <Grid centered>
                        <Grid.Column style={{ width: "90%", maxWidth: '380px' }}>
                            <Form size="small" onSubmit={this.onSubmit}>
                                <Form.Input
                                    fluid
                                    label="Email"
                                    type="email"
                                    name="email"
                                    onChange={this.onChange}
                                    value={this.state.email}
                                />
                                <Form.Input
                                    fluid
                                    label="New Password"
                                    type="password"
                                    name="password"
                                    onChange={this.onChange}
                                    value={this.state.password}
                                />
                                <Form.Input
                                    fluid
                                    label="Confirm Password"
                                    type="password"
                                    name="password_confirm"
                                    onChange={this.onChange}
                                    value={this.state.password_confirm}
                                />
                                <Button type="submit" color="blue" fluid>Sign up</Button>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Container>
            </React.Fragment>
        )
    }
}

SignUp.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    message: PropTypes.object.isRequired,
    signUp: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    message: state.message
})

export default
    connect(
        mapStateToProps,
        { signUp }
    )(SignUp);