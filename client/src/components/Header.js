import React, { Component } from 'react';

import Navbar from './Navbar';
import Messages from './Messages';

class Header extends Component {

  render() {
    return (
        <div style={{ position: 'sticky', top: '0', marginBottom: '1rem', zIndex: '9999', textAlign: 'center' }}>
          <Navbar />
          <Messages />
        </div>
    );
  }
}

export default Header;