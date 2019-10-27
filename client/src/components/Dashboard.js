import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Header from './Header';

import DashboardAddUrl from './DashboardAddUrl';
import DashboardUrlsList from './DashboardUrlsList';
import Stats from './Stats';
import { Grid, Divider, Responsive, Container, Segment } from 'semantic-ui-react';

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <Segment compact basic style={{padding: '0', margin: '0', paddingTop: '0.45rem'}}>
                    <Responsive as='div' minWidth={800}>
                        <Grid padded='horizontally' columns='equal'>
                            <Grid.Row>
                                <Grid.Column>
                                    <DashboardAddUrl />
                                    <Divider hidden />
                                    <Stats />
                                    <Divider hidden />
                                </Grid.Column>
                                <Grid.Column>
                                    <DashboardUrlsList />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Responsive>
                    <Responsive as='div' maxWidth={799}>
                        <Container>
                            <Stats />
                            <Divider hidden />
                            <DashboardAddUrl />
                            <Divider hidden />
                            <DashboardUrlsList />
                            <Divider hidden />
                        </Container>
                    </Responsive>
                </Segment>
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