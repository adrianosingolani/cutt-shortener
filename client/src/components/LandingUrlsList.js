import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { ADD_URL_SUCCESS } from '../actions/types';
import { setStoredUrls } from '../actions/guestActions';

import LandingUrlItem from './LandingUrlItem';


class UrlsList extends Component {
    state = {
        urls: null
    }

    componentDidMount() {
        // add localStorage stored urls to guest state
        const storedUrls = JSON.parse(localStorage.getItem('urls'));
        this.props.setStoredUrls(storedUrls);
        this.setState({urls: storedUrls});
    }

    componentDidUpdate(prevProps) {
        const { urls, message } = this.props;

        if (message !== prevProps.message && (message.id === ADD_URL_SUCCESS)) {
            localStorage.setItem('urls', JSON.stringify(urls));
            this.setState({urls});
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
        const { urls } = this.state;

        return (
            <React.Fragment>
                {urls ? (                    
                    urls.map(url => (
                        <LandingUrlItem key={url.urlCode} data={url} />
                    ))
                ) : null}
                {/* { urls ? console.log(urls) : console.log('erro') } */}
            </React.Fragment>
        )
    }
}

UrlsList.propTypes = {
    setStoredUrls: PropTypes.func.isRequired,
    message: PropTypes.object.isRequired,
    urls: PropTypes.array.isRequired,
    app: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    message: state.message,
    urls: state.guest.urls,
    app: state.app
})

export default connect(mapStateToProps, {setStoredUrls})(UrlsList);