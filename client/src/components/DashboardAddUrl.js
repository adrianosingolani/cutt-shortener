import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { GET_CODE_SUCCESS, GET_CODE_FAIL, ADD_URL_SUCCESS } from '../actions/types';
import { addUrl, getCode } from '../actions/urlActions';

import {
    Form,
    Grid,
    Container,
    Label
} from 'semantic-ui-react';

class DashboardAddUrl extends Component {
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
            <Container>
                <Grid centered>
                    <Grid.Column mobile={16} tablet={10} computer={8} largeScreen={6} widescreen={4}>
                        <Form size='small' onSubmit={this.onSubmit} >
                            <Form.TextArea
                                label='Long URL'
                                name='longUrl'
                                placeholder='Paste the long URL including "http://" here'
                                onChange={this.onChangeInput}
                                value={this.state.longUrl}
                            />
                            <Form.Group>
                                <Form.Input
                                    width={12}
                                    labelPosition='left'
                                    type='text'
                                    name='urlCode'
                                    onChange={this.onChangeInput}
                                    value={this.state.urlCode}
                                    style={{ marginBottom: '1em' }}
                                >
                                    <Label basic>{this.props.app.baseUrl}</Label>
                                    <input />
                                </Form.Input>
                                <Form.Button width={4} fluid type='submit' color='orange'>Shorten</Form.Button>
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}

DashboardAddUrl.propTypes = {
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

export default connect(mapStateToProps, { getCode, addUrl })(DashboardAddUrl);