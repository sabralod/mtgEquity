const _ = require('lodash')
const OAuth = require('oauth');
const fetch = require('isomorphic-fetch');
const createNodeHelpers = require('gatsby-node-helpers').default;
const oauthParams = require('./creds.json');
const outputType = 'output.json';
const uuid = require('uuid/v4');

exports.loadData = function loadData() {
    return new Promise(function (resolve, reject) {
        var mappedData = [];
        var data = [];
        loadCardmarketData('buyer', 'received', 1, data).then(
            function () {
            const {
                createNodeFactory,
                generateNodeId,
                generateTypeName
            } = createNodeHelpers({
                typePrefix: `mtg`
            });

            const ArticleNode = createNodeFactory('article', node => {
                node.id = generateNodeId('article', uuid());
                return node;
            });
            var articles = [];
            data.forEach(order => {
                order.article.forEach(article => {
                    articles.push({
                        name: article.product.enName,
                        isBuyer: order.isBuyer,
                        language: article.language,
                        price: article.price,
                        count: article.count,
                        isFoil: article.isFoil,
                        isSigned: article.isSigned,
                        isPlayset: article.isPlayset,
                        isAltered: article.isAltered,
                        dateReceived: order.state.dateReceived,
                        dateBought: order.state.dateBought
                    });
                });
            });

            const i = _(articles).size();
            console.log("\nNode Factory Size: " + i);
            mappedData = articles.map(ArticleNode);
        }).then(() => {
            data = [];
            return loadCardmarketData('seller', 'received', 1, data);
        }).then(() => {
            const {
                createNodeFactory,
                generateNodeId,
                generateTypeName
            } = createNodeHelpers({
                typePrefix: `mtg`
            });

            // const OrderNode = createNodeFactory('seller', node => {
            //     node.id = generateNodeId('seller', node.idOrder)
            //     return node;
            // });

            // const i = _(data).size();
            // console.log("\nNode Factory Size: " + i);
            // const concatArray = mappedData.concat(data.map(OrderNode));
            // const j = _(concatArray).size();
            // console.log("\concatArray Factory Size: " + j);

            const ArticleNode = createNodeFactory('article', node => {
                node.id = generateNodeId('article', uuid());
                return node;
            });
            var articles = [];
            data.forEach(order => {
                order.article.forEach(article => {
                    articles.push({
                        name: article.product.enName,
                        isBuyer: order.isBuyer,
                        language: article.language,
                        price: article.price,
                        count: article.count,
                        isFoil: article.isFoil,
                        isSigned: article.isSigned,
                        isPlayset: article.isPlayset,
                        isAltered: article.isAltered,
                        dateReceived: order.state.dateReceived,
                        dateBought: order.state.dateBought
                    });
                });
            });

            const i = _(articles).size();
            console.log("\nNode Factory Size: " + i);
            mappedData = mappedData.concat( articles.map(ArticleNode));
            resolve(mappedData);
        });

    });
}

function loadCardmarketData(actor, state, paging, result) {
    const url = oauthParams.baseUrl + '/' + outputType + '/orders/' + actor + '/' + state + '/' + paging.toString();
    const header = authHeader(url, oauthParams);

    return fetch(
        url, {
            method: 'GET',
            headers: {
                authorization: header
            }
        }).then(response => {
            const contentType = response.headers.get("content-type");
            const status = response.status;
            if (contentType && contentType.includes("application/json")) {
                return response.json().then(json => {
                    const orders = json.order;
                    return Array.prototype.push.apply(result, orders);
                }).then(itemCount => {
                    console.log('\nOrders pushed to result array: ' + itemCount);
                    if (status == '206') {
                        console.log('\nStatus: ' + status + ' paging: ' + paging.toString());
                        paging = paging + 100;
                        return loadCardmarketData(actor, state, paging, result);
                    } else {
                        console.log('\nstatus: ' + status);
                        return result;
                    }
                });
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

