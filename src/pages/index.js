import graphql from 'graphql-tag';
import Helmet from 'react-helmet';
import React from 'react';
import Stock from '../components/Stock/Stock';

const App = ({ data: { allMtgArticle, site, siteSearchIndex } }) => (
  <div>
    <Helmet
      title={`${site.siteMetadata.title}`}
    />
    <div>
      <Stock
        edges={allMtgArticle.edges}
        searchData={siteSearchIndex}
      />
    </div>
    <div>{}</div>
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
        }
      }
    }
  }
`;