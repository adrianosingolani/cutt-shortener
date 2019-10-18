import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Header from './Header';

import AddUrl from './AddUrl';
import UrlsList from './UrlsList'

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <AddUrl />
                <UrlsList />
            </React.Fragment>
        )
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(Dashboard);