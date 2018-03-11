import React, { Component } from 'react';
import Search from '../Search/Search';

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
        <nav>
          <dl>
            {edges
              .filter(
                ({ node }) =>
                  !hits || hits.filter(hit => hit.id === node.id).length > 0,
              )
              .map(({ node }, index) => (
                <div>
                  {node.name}, {index}
                </div>
              ))}
          </dl>
        </nav>
      </div>
    );
  }
}

export default Stock;
