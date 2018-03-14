import React, { Component } from 'react';
import { Image, Item } from 'semantic-ui-react';

class Card extends Component {
	render() {
		const { node } = this.props;
		const imgUrl = 'https://www.cardmarket.com' + node.image.slice(1);
		const actor = node.isBuyer ? 'orange' : 'olive';

		return (
			<Item
				color={actor}
			>
				<Item.Image fluid size='tiny' src={imgUrl} />
				<Item.Content>
					<Item.Header>{node.name}</Item.Header>
					<Item.Meta>Description</Item.Meta>
					<Item.Description>
						isBuyer: {node.isBuyer ? 'true' : 'false'}, language: {node.language}, price: {node.price}, count: {node.count}, dateBought: {node.dateBought}, condition: {node.condition}
					</Item.Description>
					<Item.Extra>Additional Details</Item.Extra>
				</Item.Content>
			</Item>
		);
	}
}

export default Card;