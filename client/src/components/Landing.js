import React, { Component } from 'react';

import {
    Container,
    Header,
    Icon,
    Segment,
    Divider,
    Grid,
    Message
} from 'semantic-ui-react';

import { default as SiteHeader } from './Header';
import LandingAddUrl from './LandingAddUrl';
import LandingUrlsList from './LandingUrlsList';

class Landing extends Component {
    render() {
        return (
            <React.Fragment>
                <SiteHeader />
                <Container textAlign='center'>
                    <Header as='h1'>
                        Free customizable URL shortener with click statistics
                        <Header.Subheader style={{ marginTop: '1rem' }}>
                            Sign up for FREE to transform boring and long links into simplified and outstanding ones.
                        </Header.Subheader>
                    </Header>
                </Container>

                <Divider hidden section />

                <Segment color='blue' inverted basic padded='very'>
                    <Container>
                        <LandingAddUrl />

                        <Divider section />
                        <div style={{ maxWidth: '780px', margin: '1rem auto' }}>
                            <Message floating color='orange' size='huge' style={{ textAlign: 'center' }}>
                                Log in to customize, edit, delete and track clicks
                            </Message>

                            <LandingUrlsList />
                        </div>
                    </Container>
                </Segment>

                <Divider hidden section />

                <Container>
                    <Grid doubling stackable columns={4} textAlign='center'>
                        <Grid.Column>
                            <Header as='h3' icon>
                                <Icon name='chain' style={{ marginBottom: '1rem' }} />
                                Shorten
                                <Header.Subheader style={{ textAlign: 'justify', marginTop: '1rem' }}>
                                    Simplify long URLs into customized links that are easier to recognize
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h3' icon>
                                <Icon name='edit' style={{ marginBottom: '1rem' }} />
                                Manage
                                <Header.Subheader style={{ textAlign: 'justify', marginTop: '1rem' }}>
                                    If you change your mind, you can edit or delete your links for free
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h3' icon>
                                <Icon name='share alternate' style={{ marginBottom: '1rem' }} />
                                Share
                                <Header.Subheader style={{ textAlign: 'justify', marginTop: '1rem' }}>
                                    Share unique and recognizable links with the world and get more clicks
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h3' icon>
                                <Icon name='chart line' style={{ marginBottom: '1rem' }} />
                                Track
                                <Header.Subheader style={{ textAlign: 'justify', marginTop: '1rem' }}>
                                    Track each shortened link and see how many times they were clicked
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid>
                </Container>

                <Divider hidden section />

            </React.Fragment>
        )
    }
}

export default Landing;