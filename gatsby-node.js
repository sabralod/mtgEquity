/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const _ = require('lodash')
const OAuth = require('oauth');
const fetch = require('isomorphic-fetch');
const createNodeHelpers = require('gatsby-node-helpers').default

const closedOrders = 'output.json/orders/2/8/';

const oauthParams = {
    baseUrl: 'https://api.cardmarket.com/ws/v2.0/',
    appToken: '4z6JOHFFMmOtB2XI',
    appSecret: 'kmJ9eN0gmsbfW7iZWsJqELMfePgt6aSX',
    accessToken: 'MxFvCXznhFp0dbiNLo7PJdMPCin8YOnX',
    accessSecret: 'pg5L011d289ZKNt4C6a97enY15mb7qs8',
    signatureMethod: 'HMAC-SHA1',
    version: '1.0'
};

exports.sourceNodes = async ({ boundActionCreators }) => {
    const { createNode } = boundActionCreators;
    const data = await getData();

    data.forEach(order => {
        createNode(order);
    });

    return;
};

function getData() {
    return new Promise(function (resolve, reject) {
        var result = [];
        getPage(1, result, function (err, results) {
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

                const OrderNode = createNodeFactory('order', node => {
                    node.id = generateNodeId("order", node.idOrder)
                    return node;
                });

                const i = _(results).size();
                console.log("\nSize: " + i);

                resolve(results.map(OrderNode));
            }
        });
    });
}

function getPage(paging, result, callback) {
    var url = oauthParams.baseUrl + closedOrders + paging.toString();
    var header = authHeader(url, oauthParams);

    return fetch(
        url, {
            method: 'GET',
            headers: {
                authorization: header
            }
        }
    ).then(function (response) {
        var contentType = response.headers.get("content-type");
        var status = response.status;
        if (contentType && contentType.includes("application/json")) {
            response.json().then(function (res) {
                _(res).forEach(orders => {
                    _(orders).forEach(order => {
                        result.push(order);
                    });
                });
            });
        }

        if (status && status == '206') {
            console.log('status: ' + status + ' paging: ' + paging.toString());

            paging = paging + 100;
            getPage(paging, result, callback);
        } else {
            callback(null, result)
        }

    });
}

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