import React, { Component } from 'react';
import { Statistic, Label } from 'semantic-ui-react';

class Analysis extends Component {
	constructor(props) {
		super(props);
		const { edges } = this.props;
		var totalCost = 0.0;
		var totalSell = 0.0;
		this.state = {
			investment: 0.0,
			totalCost: 0.0,
			totalSell: 0.0,
		}
		new Promise(function (resolve, reject) {
			edges.forEach(({ node }) => {
				if (node.isBuyer) {
					totalCost = totalCost + (node.isPlayset ? (node.price * 4) : (node.price * node.count));
				} else {
					totalSell = totalSell + (node.isPlayset ? (node.price * 4) : (node.price * node.count));
				}
			})
			resolve();
		}).then(() => this.setState({
			investment: totalCost - totalSell,
			totalCost: totalCost,
			totalSell: totalSell,
		}));
	}

	render() {
		const { investment, totalCost, totalSell } = this.state;
		return (
			<div>
			<Statistic.Group>
				<Statistic>
					<Statistic.Value>{Math.round(investment * 100) / 100} &euro;</Statistic.Value>
					<Statistic.Label>investment</Statistic.Label>
				</Statistic>
				<Statistic>
					<Statistic.Value>{Math.round(totalCost * 100) / 100} &euro;</Statistic.Value>
					<Statistic.Label>purchases</Statistic.Label>
				</Statistic>
				<Statistic>
					<Statistic.Value>{Math.round(totalSell * 100) / 100} &euro;</Statistic.Value>
					<Statistic.Label>sales</Statistic.Label>
				</Statistic>
				</Statistic.Group>
			</div>
		);
	}
}

export default Analysis;