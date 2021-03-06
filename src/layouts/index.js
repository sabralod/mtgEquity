import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Header from '../components/Header'

import './index.css'
import 'semantic-ui-css/semantic.min.css'


const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="mtgEquity"
      meta={[
        { name: 'description', content: 'Display your received mtg trading cards from \'cardmarket.com\'.' },
        { name: 'keywords', content: 'magic the gathering, mtg, equity' },
      ]}
    />
    <Header/>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
