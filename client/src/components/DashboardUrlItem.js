import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { UPDATE_URL_SUCCESS, UPDATE_URL_FAIL } from '../actions/types';
import { updateUrl, deleteUrl } from '../actions/urlActions';

import {
    Table,
    Header,
    Icon,
    Button,
    Form,
    Confirm
} from 'semantic-ui-react';

class DashboardUrlItem extends Component {
    state = {
        editing: false,
        urlId: this.props.data._id,
        urlCode: this.props.data.urlCode,
        longUrl: this.props.data.longUrl,
        initialUrlCode: null,
        initialLongUrl: null,
        editConfirmOpen: false,
        deleteConfirmOpen: false
    }

    componentDidUpdate(prevProps, prevState) {
        const { message } = this.props;

        if (message !== prevProps.message) {
            switch (message.id) {
                case UPDATE_URL_SUCCESS:
                    this.setState({
                        urlCode: this.props.data.urlCode,
                        longUrl: this.props.data.longUrl,
                        initialUrlCode: null,
                        initialLongUrl: null
                    });
                    break;
                case UPDATE_URL_FAIL:
                    const { initialUrlCode, initialLongUrl } = this.state;

                    this.setState({
                        urlCode: initialUrlCode,
                        longUrl: initialLongUrl,
                        initialUrlCode: null,
                        initialLongUrl: null
                    });
                    break;
                default:
                //do nothing
            }
        }
    }

    copyLink = () => {
        const el = document.createElement('textarea');
        el.value = this.props.app.baseUrl + this.state.urlCode;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    // BEGIN EDIT
    enableEdit = () => {
        const { urlCode, longUrl } = this.state;
        this.setState({
            editing: true,
            initialUrlCode: urlCode,
            initialLongUrl: longUrl
        });
    }

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    confirmSaveEdit = (e) => {
        e.preventDefault();
        console.log('confirmSaveEdit');


        this.setState({ editConfirmOpen: true });
    }

    saveEdit = () => {
        const { urlId, urlCode, longUrl, initialUrlCode, initialLongUrl } = this.state;

        // only request API to update url if it changed
        if ((urlCode !== initialUrlCode) || (longUrl !== initialLongUrl)) {
            const updatedUrl = {
                urlId, urlCode, longUrl
            }

            this.props.updateUrl(updatedUrl);

            this.setState({
                editing: false,
                editConfirmOpen: false
            });
        } else {
            // url didn't change. Cancel editing
            this.cancelEdit();
        }
    }

    cancelEdit = () => {
        const { initialUrlCode, initialLongUrl } = this.state;

        this.setState({
            editing: false,
            urlCode: initialUrlCode,
            longUrl: initialLongUrl,
            initialUrlCode: null,
            initialLongUrl: null,
            editConfirmOpen: false
        });
    }
    // END EDIT

    deleteLink = () => {
        const { urlId } = this.state;
        this.props.deleteUrl(urlId);
    }

    render() {
        const { date, clicks } = this.props.data;
        const { editing, urlCode, longUrl, editConfirmOpen, deleteConfirmOpen } = this.state;

        return (
            <React.Fragment>
                <Table.Row>
                    <Table.Cell>
                        <Header as='h5'>
                            <Icon name='linkify' style={{ paddingTop: '0.35em', verticalAlign: 'top' }} />
                            <Header.Content style={{ width: '100%' }}>
                                {editing ?
                                    (
                                        <Form size='mini' onSubmit={this.confirmSaveEdit}>
                                            <Form.Input
                                                type='text'
                                                name='urlCode'
                                                width={16}
                                                onChange={this.onChangeInput}
                                                value={urlCode ? urlCode : ''}
                                            />
                                            <Form.TextArea
                                                name='longUrl'
                                                width={16}
                                                onChange={this.onChangeInput}
                                                value={longUrl ? longUrl : ''}
                                                style={{ wordBreak: 'break-all' }}
                                            />
                                            <Button
                                                type='submit' content='Save' icon='save' size='mini' primary compact
                                            />
                                            <Button
                                                content='Cancel' icon='cancel' size='mini' compact
                                                onClick={this.cancelEdit}
                                            />
                                        </Form>
                                    ) : (
                                        <React.Fragment>
                                            <span>{urlCode}</span>
                                            <Header.Subheader>
                                                <span style={{ wordBreak: 'break-all' }}>{longUrl}</span>
                                            </Header.Subheader>
                                        </React.Fragment>
                                    )
                                }
                            </Header.Content>
                        </Header>
                        {!editing ? (
                            <React.Fragment>
                                <Button
                                    color='orange' size='mini' compact basic icon='copy outline' content='Copy short link'
                                    onClick={this.copyLink}
                                />
                                <Button
                                    color='green' size='mini' compact basic icon='chart bar outline' content='Statistics'
                                />
                                <Button
                                    color='blue' size='mini' compact basic icon='edit outline' content='Edit'
                                    onClick={this.enableEdit}
                                />
                                <Button
                                    color='red' size='mini' compact basic icon='trash alternate outline' content='Delete'
                                    onClick={() => this.setState({ deleteConfirmOpen: true })}
                                />
                            </React.Fragment>
                        ) : null}
                    </Table.Cell>
                    <Table.Cell textAlign='center' collapsing>{clicks.length}</Table.Cell>
                    <Table.Cell textAlign='center' collapsing>{date}</Table.Cell>
                </Table.Row>
                <Confirm
                    open={editConfirmOpen}
                    header='Edit link'
                    content={'If you edit the short URL code, the links with the old code won\'t be available anymore. Are you sure?'}
                    onCancel={this.cancelEdit}
                    onConfirm={this.saveEdit}
                />
                <Confirm
                    open={deleteConfirmOpen}
                    header='Delete link'
                    content={'If you delete it, the links with this code won\'t be available anymore. Are you sure?'}
                    onCancel={() => this.setState({ deleteConfirmOpen: false })}
                    onConfirm={this.deleteLink}
                />
            </React.Fragment>
        )
    }
}

DashboardUrlItem.propTypes = {
    updateUrl: PropTypes.func.isRequired,
    deleteUrl: PropTypes.func.isRequired,
    message: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    message: state.message,
    app: state.app
})

export default connect(mapStateToProps, { updateUrl, deleteUrl })(DashboardUrlItem);