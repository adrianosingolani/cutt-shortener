import React, { Component } from 'react';

export default class FadedText extends Component {
    state = {
        fade: true
    }

    toggleFade = (e) => {
        const { fade } = this.state;

        this.setState({fade: !fade});
    }

    render() {
        const { text } = this.props;
        const { fade } = this.state;

        const fadeOn = {
            position: 'absolute',
            right: '0',
            bottom: '0',
            left: '0',
            height: '2rem',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 100%)'
        }

        const fadeOff = {
            display: 'none'
        }

        const textCropped = {
            wordBreak: 'break-all', 
            height: '2rem', 
            overflow: 'hidden'
        }

        const textFull = {
            wordBreak: 'break-all'
        }

        return (
            <React.Fragment>
                <div style={{ position: 'relative', cursor: 'pointer' }} onClick={(e) => this.toggleFade(e)}>
                    <div style={ fade ? textCropped : textFull }>{text}</div>
                    <div style={ fade ? fadeOn : fadeOff } />
                </div>
            </React.Fragment>
        )
    }
}