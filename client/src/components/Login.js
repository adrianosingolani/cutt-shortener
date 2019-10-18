import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { LOGIN_SUCCESS } from '../actions/types';

import {
    Button,
    Form,
    Grid,
    Header,
    Container
} from 'semantic-ui-react';

import { default as SiteHeader } from './Header';

import { logIn } from '../actions/authActions';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    componentDidUpdate(prevProps) {
        const { message } = this.props;

        if (message !== prevProps.message && message.id === LOGIN_SUCCESS) {            
            this.props.history.push("/dashboard");
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        const user = {
            email, password
        }

        this.props.logIn(user);
    }

    render() {
        return (
            <React.Fragment>
                <SiteHeader />
                <Container>
                    <Header size="huge" textAlign="center">Log in to start creating short links</Header>
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
                                    label="Password"
                                    type="password"
                                    name="password"
                                    onChange={this.onChange}
                                    value={this.state.password}
                                />
                                <Container fluid textAlign="right" style={{ marginBottom: "1em" }}>
                                    <Link to="forgot">Forgot password?</Link>
                                </Container>
                                <Button type="submit" color="blue" fluid>Log in</Button>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Container>
            </React.Fragment>
        )
    }
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    message: PropTypes.object.isRequired,
    logIn: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    message: state.message
})

export default connect(mapStateToProps, { logIn })(Login);