import React, { Component } from 'react';
import Card from '../Card/Card';


class StockListItem extends Component {
	constructor(...rest) {
		super(...rest);
		this.state = { showCard: false };
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState(prevState => ({
			showCard: !prevState.showCard
		}));
	}

	render() {
		const { node } = this.props;
		const actor = node.isBuyer ? 'buyer' : 'seller';

		return (
			<div className="stockListItem">
				<div className={`stockListItem-${actor}`} onClick={this.handleClick}>
					{node.name}
					{
						this.state.showCard
							? <Card node={node} />
							: null
					}
				</div>
			</div>
		);
	}
}
export default StockListItem;
