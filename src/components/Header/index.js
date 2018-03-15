import React, { Component } from 'react';
import Link from 'gatsby-link';
import { Image } from 'semantic-ui-react'


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
          <Image src='../static/banner.png' fluid />
        </Link>
      </div>
    )
  }
}

export default Header
