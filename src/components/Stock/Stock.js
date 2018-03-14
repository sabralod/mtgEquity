import React, { Component } from 'react';
import Search from '../Search/Search';
import StockListItem from './StockListItem';

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
			<div className="stock">
				<Search
					data={searchData}
					onSearch={(text, hits) =>
						this.setState({
							hits: text !== '' ? hits : null,
						})
					}
				/>
				<div>
					{edges
						.filter(
							({ node }) =>
								!hits || hits.filter(hit => hit.id === node.id).length > 0,
					)
						.map(({ node }, index) => (
							<StockListItem
								key={node.id}
								node={node}
							/>
						))}
				</div>
			</div>
		);
	}
}

export default Stock;
