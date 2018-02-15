import React from 'react';

class Articles extends React.Component {
    getArticleList() {
        const articleList = [];
        this.props.orderEdges.forEach(orderEdge => {
            const dateReceived = new Date(Date.parse(orderEdge.node.state.dateReceived)).toDateString();

            orderEdge.node.article.forEach(article => {
                const imgUrl = 'https://www.cardmarket.com' + article.product.image.slice(1);
                articleList.push({
                    name: article.product.enName,
                    image: imgUrl,
                    dateReceived: dateReceived,
                    price: article.price,
                    amount: article.count
                })
            });

        });
        return articleList;
    }
    render() {
        const articleList = this.getArticleList();
        return (
            <div>
                {articleList.map(article => (
                    <div className="article-container">
                        <div className="article-img">
                            <img src={article.image} />
                        </div>
                        <div className="article-desc">
                            <p>Name: {article.name}</p>
                            <p>Price: {article.price} &euro;</p>
                            <p>Amount: {article.amount}</p>
                            <p>Received: {article.dateReceived}</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Articles