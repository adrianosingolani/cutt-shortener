import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class ProtectedRoute extends Component {
    render() {
        const { component: Component, ...props } = this.props;

        const token = localStorage.getItem('token');        

        return (
            <Route
                {...props}
                render={props => (token ? <Component {...props} /> : <Redirect to='/login' />)}
            />
        )
    }
}

ProtectedRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(ProtectedRoute);
