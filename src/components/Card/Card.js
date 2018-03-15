import React, { Component } from 'react';
import { Image, Item, Divider, List, Label } from 'semantic-ui-react';

class Card extends Component {
	render() {
		const { node } = this.props;
		const imgUrl = 'https://www.cardmarket.com' + node.image.slice(1);

		return (
			<Item>
				<Item.Image size='tiny' src={imgUrl} />
				<Item.Content>
					<Item.Header>{node.name}</Item.Header>
					<Item.Description>
						<Label.Group size='tiny'>
							{
								node.isBuyer ? <Label color='teal'>buyer</Label> : <Label color='yellow'>seller</Label>
							}
							<Label>
								price:
      					<Label.Detail>{node.price} &euro;</Label.Detail>
							</Label>
							<Label>
								count:
      					<Label.Detail>{node.count}</Label.Detail>
							</Label>
							<Label>
								bought:
      					<Label.Detail>{new Date(Date.parse(node.dateBought)).toDateString()}</Label.Detail>
							</Label>
							{
								node.condition
									? <Label>
										condition:
										<Label.Detail>{node.condition}</Label.Detail>
									</Label>
									: null
							}
							{
								node.language
									? <Label>
										{node.language}
									</Label>
									: null
							}
							{
								node.isFoil
									? <Label>
										Foil
									</Label>
									: null
							}
							{
								node.isPlayset
									? <Label>
										4x
									</Label>
									: null
							}
						</Label.Group>
					</Item.Description>
					<Item.Extra>
						<List size='mini'>
							{
								node.expansion
									? <List.Item>expansion: {node.expansion}</List.Item>
									: null
							}
							{
								node.rarity
									? <List.Item>rarity: {node.rarity}</List.Item>
									: null
							}
							{
								node.dateReceived
									? <List.Item>received: {new Date(Date.parse(node.dateReceived)).toDateString()}</List.Item>
									: null
							}
						</List>
					</Item.Extra>
				</Item.Content>
			</Item>
		);
	}
}

export default Card;