import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import {
    Container,
    Menu,
    Dropdown,
    Header,
    Icon
} from 'semantic-ui-react';

class Navbar extends Component {
    render() {
        const { isAuthenticated, user } = this.props.auth;

        const userMenu = (
            <React.Fragment>
                <span><span>{user ? user.email : null}</span> <Icon name='user' /></span>
            </React.Fragment>
        )

        return (
            <Menu borderless style={{borderRadius: '0'}} size='massive'>
                <Container>
                    <Menu.Item color='orange' header as={Link} to='/'>
                        {/* <Header as='h1' color='orange'> */}
                            {/* <Link to='/' color='orange'> */}
                                <Icon name='cut' style={{ margin: '0'}} />
                                {this.props.app.name}
                            {/* </Link> */}
                        {/* </Header> */}
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        {isAuthenticated ? (
                            <Fragment>
                                    <Dropdown item simple icon={null} trigger={userMenu}>
                                        <Dropdown.Menu>
                                            <Dropdown.Item as={Link} to='dashboard'>Dashboard</Dropdown.Item>
                                            <Dropdown.Item as={Link} to='password'>Change password</Dropdown.Item>
                                            <Dropdown.Item as={Link} to='logout'>Log out</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Menu.Item as={Link} to='login'>Log in</Menu.Item>
                                <Menu.Item as={Link} to='signup'>Sign up</Menu.Item>
                            </Fragment>
                        )}
                    </Menu.Menu>
                </Container>
            </Menu>
        )
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    app: state.app
})

export default connect(mapStateToProps, null)(Navbar);