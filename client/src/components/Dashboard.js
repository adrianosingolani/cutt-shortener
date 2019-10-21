import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Header from './Header';

import DashboardAddUrl from './DashboardAddUrl';
import DashboardUrlsList from './DashboardUrlsList'

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <DashboardAddUrl />
                <DashboardUrlsList />
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