import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import {
    Table,
    Header,
    Icon,
    Button,
    Accordion
} from 'semantic-ui-react';

class Stats extends Component {
    state = {
        loading: true,
        activeIndex: null
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        console.log(this.props);
        
        const { date, urlCode, longUrl, clicks, actionsMenu } = this.props.data;
        const { activeIndex } = this.state;

        return (
            <Table.Row key={urlCode}>
                {actionsMenu !== 'accordion' ? (
                    <Table.Cell textAlign='center' collapsing>
                        <Button.Group vertical size='tiny'>
                            <Button color='green' icon='chart bar outline' />
                            <Button color='blue' icon='edit outline' />
                            <Button color='red' icon='trash alternate outline' />
                        </Button.Group>
                    </Table.Cell>
                ) : null}
                <Table.Cell>
                    <Header as='h5'>
                        <Icon name='linkify' />
                        <Header.Content>
                            {urlCode}
                            <Header.Subheader>
                                <span style={{ wordBreak: 'break-all' }}>{longUrl}</span>
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                    {actionsMenu === 'accordion' ? (
                        <Accordion>
                            <Accordion.Title
                                active={activeIndex === urlCode}
                                index={urlCode}
                                onClick={this.handleClick}
                            >
                                <Icon name='dropdown' />
                                more...
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === urlCode}>
                                <Button color='green' size='mini' compact icon='chart bar outline' content='Stats' />
                                <Button color='blue' size='mini' compact icon='edit outline' content='Edit' />
                                <Button color='red' size='mini' compact icon='trash alternate outline' content='Delete' />
                            </Accordion.Content>
                        </Accordion>
                    ) : null}
                </Table.Cell>
                <Table.Cell textAlign='center' collapsing>{clicks.length}</Table.Cell>
                <Table.Cell textAlign='center' collapsing>{date}</Table.Cell>
            </Table.Row>
        )
    }
}

Stats.propTypes = {
}

const mapStateToProps = (state) => ({
    message: state.message
})

export default connect(mapStateToProps, { })(Stats);