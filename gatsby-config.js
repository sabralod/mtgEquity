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
          MtgArticle: {
            name: node => node.name,
          }
        },
      },
    },
  ],
};
