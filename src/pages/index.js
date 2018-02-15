import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import _ from 'lodash'
import Articles from '../components/Articles/Articles'

class IndexPage extends React.Component {
  render() {
    const orderEdges = get(this, 'props.data.allMtgOrder.edges');
    return (
      <Articles orderEdges={orderEdges} />
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
query IndexQuery {
  allMtgOrder{
    edges {
      node {
        state{
          dateReceived
        }
        article{
          product{
            enName
            image
          }
          price
          count
        }
        totalValue
      }
    }
  }
}
`