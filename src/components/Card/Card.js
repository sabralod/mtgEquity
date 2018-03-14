import React, { Component } from 'react';

class Card extends Component {
	render() {
		const { node } = this.props;

		return (
			<div>
				isBuyer: {node.isBuyer ? 'true' : 'false'}, language: {node.language}, price: {node.price}, count: {node.count}, dateBought: {node.dateBought}, condition: {node.condition}
			</div>
		);
	}
}

export default Card;