import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { REDIRECT_SUCCESS, REDIRECT_FAIL } from '../actions/types';

import { addClickAndRedirect } from '../actions/urlActions';

export class Redirect extends Component {
    state = {
        redirectUrl: null
    }

    componentDidMount = () => {        
        const urlCode = this.props.match.params.urlCode;
        this.props.addClickAndRedirect(urlCode);
    }

    componentDidUpdate(prevProps) {
        const { message } = this.props;
        const { redirectUrl } = this.props;

        if (message !== prevProps.message) {
            switch (message.id) {
                case REDIRECT_SUCCESS:
                    console.log('REDIRECT_SUCCESS');
                    this.setState({ redirectUrl });
                    console.log(redirectUrl.longUrl);

                    window.location.href = redirectUrl.longUrl;
                    break;
                case REDIRECT_FAIL:
                    console.log('REDIRECT_FAIL');
                    break;
                default:
                // do nothing
            }
        }
    }

    render() {
        const { redirectUrl } = this.state;
        
        return (            
            <React.Fragment>
                {/* {redirectUrl ? redirectUrl.longUrl : null} */}
                {/* {redirectUrl ? (
                    <Route 
                        path={`/${redirectUrl.urlCode}`}
                        component={() => {
                            console.log("teste");
                            window.location.href=redirectUrl.longUrl;
                            return null;
                        }} 
                    />
                ) : null} */}
            </React.Fragment>
        )
    }
}

Redirect.propTypes = {
    redirectUrl: PropTypes.object,
    addClickAndRedirect: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    redirectUrl: state.urls.redirectUrl,
    message: state.message
})

export default connect(mapStateToProps, { addClickAndRedirect })(Redirect);