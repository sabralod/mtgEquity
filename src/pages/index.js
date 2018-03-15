import graphql from 'graphql-tag';
import Helmet from 'react-helmet';
import React from 'react';
import Stock from '../components/Stock/Stock';
import Analysis from '../components/Analysis/Analysis'

const App = ({ data: { allMtgArticle, site, siteSearchIndex } }) => (
  <div>
    <Helmet
      title={`${site.siteMetadata.title}`}
    />
    <Analysis
      edges={allMtgArticle.edges}
    />
    <Stock
      edges={allMtgArticle.edges}
      searchData={siteSearchIndex}
    />
  </div>
);
export default App;

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    siteSearchIndex {
      index
    }
    allMtgArticle {
      edges {
        node {
          id
          name
          isBuyer
          language
          price
          count
          isFoil
          isSigned
          isPlayset
          isAltered
          dateReceived
          dateBought
          image
          condition
          condition
          expansion
          rarity
        }
      }
    }
  }
`;