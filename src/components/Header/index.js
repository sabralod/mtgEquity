import React, { Component } from 'react';
import Link from 'gatsby-link';
import { Image } from 'semantic-ui-react';
import banner from './banner.png';


class Header extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}>
        <Link to='/'>
          <Image src={banner} fluid />
        </Link>
      </div>
    )
  }
}

export default Header
