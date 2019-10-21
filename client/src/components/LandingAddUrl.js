import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { getCode } from '../actions/urlActions';
import { addGuestUrl } from '../actions/guestActions';

import { GET_CODE_SUCCESS, GET_CODE_FAIL, ADD_URL_SUCCESS } from '../actions/types';

import {
    Form,
    Label,
    TextArea
} from 'semantic-ui-react';

class LandingAddUrl extends Component {
    state = {
        urlCode: '',
        longUrl: 'http://google.com'
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

        this.props.addGuestUrl(newUrl);
    }

    render() {
        const { longUrl } = this.state;
        return (
            <Form style={{ maxWidth: '780px', margin: 'auto' }} onSubmit={this.onSubmit}>
                <Form.Field>
                    <Label color='orange' pointing='below'>Paste a long URL</Label>
                    <TextArea
                        rows='3'
                        style={{ fontSize: '1.03em', resize: 'none' }}
                        name='longUrl'
                        onChange={this.onChangeInput}
                        value={longUrl}
                    />
                </Form.Field>
                <Form.Button
                    type='submit'
                    color='orange'
                    content='Shorten'
                    size='large'
                    fluid
                />
            </Form>
        )
    }
}

LandingAddUrl.propTypes = {
    getCode: PropTypes.func.isRequired,
    addGuestUrl: PropTypes.func.isRequired,
    message: PropTypes.object.isRequired,
    urls: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    message: state.message,
    urls: state.urls
})

export default connect(mapStateToProps, { getCode, addGuestUrl })(LandingAddUrl);