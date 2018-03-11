module.exports = {
  siteMetadata: {
    title: 'mtgEquity',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `@andrew-codes/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [
          'name',
        ],
        // How to resolve each field's value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields' values
          MtgArticle: {
            name: node => node.name
          }
        },
      },
    },
  ],
};
