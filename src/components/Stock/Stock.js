import React, { Component } from 'react';
import Search from '../Search/Search';
import { Item, Segment } from 'semantic-ui-react';
import Card from '../Card/Card';

class Stock extends Component {
	constructor(...rest) {
		super(...rest);
		this.state = {
			hits: null,
		};
	}
	
	render() {
		const { edges, searchData } = this.props;
		const { hits } = this.state;

		return (
			<div>
				<Search
					data={searchData}
					onSearch={(text, hits) =>
						this.setState({
							hits: text !== '' ? hits : null,
						})
					}
				/>
				<Item.Group>
					{
						edges.filter(
							({ node }) =>
								!hits || hits.filter(hit => hit.id === node.id).length > 0,
						).map(({ node }, index) => (
							<Card key={index} node={node} />
						))
					}
				</Item.Group>
			</div>
		);
	}
}

export default Stock;
