import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { logOut } from '../actions/authActions';

class Logout extends Component {
    componentDidMount() {
        console.log("logout");
        
        this.props.logOut();
    }

    render() {
        return (
            <Fragment />
        )
    }
}

Logout.propTypes = {
    logOut: PropTypes.func.isRequired,
}

export default
    connect(
        null,
        { logOut }
    )(Logout);