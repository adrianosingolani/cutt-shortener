import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import {
    Header,
    Icon,
    Segment,
    Button
} from 'semantic-ui-react';

class LandingUrlItem extends Component {
    copyLink = (urlCode) => {
        const el = document.createElement('textarea');
        el.value = this.props.app.baseUrl + urlCode;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    render() {
        const { urlCode, longUrl } = this.props.data;
        const { baseUrl } = this.props.app;

        return (
            <Segment>
                <Header as='h5'>
                    <Icon name='linkify' style={{ paddingTop: '0.35em', verticalAlign: 'top' }} />
                    <Header.Content style={{ width: '100%' }}>
                        <a href={baseUrl + urlCode} target='_blank' rel='noopener noreferrer'>{baseUrl + urlCode}</a>


                        <Header.Subheader style={{ maxHeight: '100px', overflow: 'auto' }}>
                            <span style={{ wordBreak: 'break-all' }}>{longUrl}</span>
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Button
                    color='orange'
                    size='mini'
                    compact 
                    basic
                    icon='copy outline'
                    content='Copy short link' 
                    onClick={() => this.copyLink(urlCode)} 
                    style={{marginLeft: '2.2rem'}}
                />
            </Segment>
        )
    }
}

LandingUrlItem.propTypes = {
    app: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    app: state.app
})

export default connect(mapStateToProps, {})(LandingUrlItem);