/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const _ = require('lodash')
const OAuth = require('oauth');
const fetch = require('isomorphic-fetch');
const createNodeHelpers = require('gatsby-node-helpers').default

const outputType = 'output.json';

const oauthParams = require('./creds.json')

exports.sourceNodes = async ({ boundActionCreators }) => {
    const { createNode } = boundActionCreators;
    const nodes = await getData();

    nodes.forEach(node => {
        createNode(node);
    });

    return;
};

function getData() {
    return new Promise(function (resolve, reject) {
        fetchData('buyer', 'received').then(function (buyer) {
            console.log("\n\nBuyer size: " + _.size(buyer));

            fetchData('seller', 'received').then(function (seller) {
                var result = [];
                buyer.forEach(obj => {
                    result.push(obj);
                });
                seller.forEach(obj => {
                    result.push(obj);
                });

                resolve(result);
            });
        });
    });
}

function fetchData(actor, state) {
    return new Promise(function (resolve, reject) {
        var result = [];
        getPage(actor, state, 1, result, function (err, results) {
            if (err) {
                reject(err);
            } else {
                const {
                    createNodeFactory,
                    generateNodeId,
                    generateTypeName
                } = createNodeHelpers({
                    typePrefix: `mtg`
                });

                const OrderNode = createNodeFactory(actor, node => {
                    node.id = generateNodeId(actor, node.idOrder)
                    return node;
                });

                const i = _(results).size();
                console.log("\nNode Factory Size: " + i);

                resolve(results.map(OrderNode));
            }
        });
    });
};

function getPage(actor, state, paging, result, callback) {
    const url = oauthParams.baseUrl + '/' + outputType + '/orders/' + actor + '/' + state + '/' + paging.toString();
    const header = authHeader(url, oauthParams);
    // console.log("\nCalling mkm api with " + url + "\n\n" + header + "\n");
    return fetch(
        url, {
            method: 'GET',
            headers: {
                authorization: header
            }
        }
    ).then(function (response) {
        const contentType = response.headers.get("content-type");
        const status = response.status;
        if (contentType && contentType.includes("application/json")) {
            response.json().then(function (res) {
                const orders = res.order;

                orders.forEach(order => {
                    result.push(order);
                });
            }).then(() => {
                if (status && status === '206') {
                    console.log('\nstatus: ' + status + ' paging: ' + paging.toString());
                    paging = paging + 100;
                    getPage(actor, state, paging, result, callback);
                } else {
                    console.log('\nstatus: ' + status);
                    callback(null, result);
                }
            });
        }

    });
};

function authHeader(url, params) {
    var oauth = new OAuth.OAuthEcho(
        url,
        url,
        params.appToken,
        params.appSecret,
        params.version,
        params.signatureMethod,
        null,
        null
    );

    return oauth.authHeader(url, params.accessToken, params.accessSecret);
};