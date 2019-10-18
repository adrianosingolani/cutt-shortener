import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { GET_CODE_SUCCESS, GET_CODE_FAIL, ADD_URL_SUCCESS } from '../actions/types';
import { addUrl, getCode } from '../actions/urlActions';

import {
    Container,
    Header,
    Icon,
    Segment,
    Divider,
    Form,
    Button,
    Label,
    Input,
    TextArea,
    Grid,
    Image
} from 'semantic-ui-react';

import { default as SiteHeader } from './Header';

class Landing extends Component {
    state = {
        urlCode: '',
        longUrl: ''
    }

    componentDidMount() {
        this.props.getCode();
    }

    componentDidUpdate(prevProps) {
        const { urls, message } = this.props;

        if (message !== prevProps.message) {
            switch (message.id) {
                case GET_CODE_SUCCESS:
                    this.setState({ urlCode: urls.newCode });
                    break;
                case GET_CODE_FAIL:
                    this.props.getCode();
                    break;
                case ADD_URL_SUCCESS:
                    this.setState({ urlCode: '', longUrl: '' });
                    this.props.getCode();
                    break;
                default:
                // do nothing
            }
        }
    }

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { urlCode, longUrl } = this.state;

        const newUrl = {
            urlCode, longUrl
        }

        this.props.addUrl(newUrl);
    }

    render() {
        return (
            <React.Fragment>
                <SiteHeader />
                <Container textAlign='center'>
                    <Header as='h1'>
                        Free customizable URL Shortener with click statistics
                        <Header.Subheader style={{ marginTop: '1rem' }}>
                            Sign up to create custom short links, edit, delete and measure clicks. It's FREE!
                        </Header.Subheader>
                    </Header>
                </Container>

                <Divider hidden section />

                <Segment color='blue' inverted basic padded='very'>
                    <Container>
                        <Form style={{ maxWidth: '780px', margin: 'auto' }}>
                            <Form.Field
                                name='longUrl'
                                onChange={this.onChangeInput}
                                value={this.state.longUrl}

                            >
                                <Label color='orange' pointing='below'>Paste a long URL</Label>
                                <TextArea rows='3' style={{ fontSize: '1.03em', resize: 'none' }} />
                            </Form.Field>
                            <Form.Button
                                type='submit'
                                color='orange'
                                content='Shorten'
                                size='large'
                                fluid
                            />
                        </Form>
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
                                    Manage your account settings and set e-mail preferences.
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h3' icon>
                                <Icon name='edit' style={{ marginBottom: '1rem' }} />
                                Manage
                                <Header.Subheader style={{ textAlign: 'justify', marginTop: '1rem' }}>
                                    Manage your account settings and set e-mail preferences.
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h3' icon>
                                <Icon name='share alternate' style={{ marginBottom: '1rem' }} />
                                Share
                                <Header.Subheader style={{ textAlign: 'justify', marginTop: '1rem' }}>
                                    Manage your account settings and set e-mail preferences.
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h3' icon>
                                <Icon name='chart line' style={{ marginBottom: '1rem' }} />
                                Track
                                <Header.Subheader style={{ textAlign: 'justify', marginTop: '1rem' }}>
                                    Manage your account settings and set e-mail preferences.
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

Landing.propTypes = {
    getCode: PropTypes.func.isRequired,
    addUrl: PropTypes.func.isRequired,
    urls: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    urls: state.urls,
    message: state.message,
    app: state.app
})

export default connect(mapStateToProps, { getCode, addUrl })(Landing);