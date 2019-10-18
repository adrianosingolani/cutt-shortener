import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    GET_URLS_FAIL,
    ADD_URL_SUCCESS,
    ADD_URL_FAIL,
    UPDATE_URL_SUCCESS,
    UPDATE_URL_FAIL,
    DELETE_URL_SUCCESS,
    DELETE_URL_FAIL,
    AUTH_ERROR,
    LOGIN_FAIL,
    REGISTER_FAIL
} from '../actions/types';

import { clearMessage } from '../actions/messageActions';

import {
    Message,
    Container,
    Transition
} from 'semantic-ui-react';

export class Messages extends Component {
    state = {
        msg: '-',
        msgTimeout: null,
        visible: false,
        animationDuration: 500,
        messageDuration: 4000
    }

    componentDidUpdate(prevProps) {
        const { message } = this.props;

        if (message !== prevProps.message) {
            switch (message.id) {
                case GET_URLS_FAIL:
                case ADD_URL_SUCCESS:
                case ADD_URL_FAIL:
                case UPDATE_URL_SUCCESS:
                case UPDATE_URL_FAIL:
                case DELETE_URL_SUCCESS:
                case DELETE_URL_FAIL:
                case AUTH_ERROR:
                case LOGIN_FAIL:
                case REGISTER_FAIL:
                    this.setMessage(message.msg);
                    break;

                default:
                //do nothing
            }
        }
    }

    setMessage(msg) {
        this.setState({ visible: false }, () => {
            setTimeout(() => {
                this.setState({ msg, msgTimeout }, () => {
                    this.setState({ visible: true });
                });
            }, this.state.animationDuration);
        })

        if (this.state.msgTimeout) {
            clearTimeout(this.state.msgTimeout);
        }

        const msgTimeout = setTimeout(() => {
            this.props.clearMessage();
            this.setState({ visible: false })
        }, this.state.messageDuration);
    }

    render() {
        return (
            <Container style={{ height: '2rem' }}>
                <Transition visible={this.state.visible} animation='fade up' duration={this.state.animationDuration}>
                    <div>
                        <Message compact
                            header={this.state.msg}
                            size='mini'
                            negative
                        />
                    </div>
                </Transition>
            </Container>
        )
    }
}

Messages.propTypes = {
    clearMessage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    message: state.message
})

export default connect(mapStateToProps, { clearMessage })(Messages);