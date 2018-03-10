/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const cardmarket = require('./cardmarket');

exports.sourceNodes = async ({ boundActionCreators }) => {
    const { createNode } = boundActionCreators;
    const nodes = await cardmarket.loadData();

    nodes.forEach(node => {
        createNode(node);
    });

    return;
};