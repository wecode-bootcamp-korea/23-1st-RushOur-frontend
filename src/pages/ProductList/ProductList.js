import React, { Component } from 'react';
import ListMenu from './ListMenu/ListMenu';
import ListHeader from './ListHeader/ListHeader';
import Product from './Product/Product';
import { withRouter } from 'react-router-dom';
import PageButton from './PageButton/PageButton';
import { API } from '../../config';
import './ProductList.scss';

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      productInfo: [],
      categoryInfo: [],
      priceSort: '',
      offset: 0,
      limit: 16,
    };
  }

  productListFetch = (prevProps, prevState) => {
    const { subcategoryId, categoryId } = this.props.match.params;
    const urlChecker = Number(subcategoryId)
      ? `${
          API.PRODUCTLIST
        }?category=${categoryId}&subcategory=${subcategoryId}&sort=${
          this.state.priceSort && this.state.priceSort
        }&limit=16&offset=${this.state.offset}`
      : `${API.PRODUCTLIST}?sort=${
          this.state.priceSort && this.state.priceSort
        }&limit=16&offset=${this.state.offset}`;

    fetch(urlChecker)
      .then(res => res.json())
      .then(data => {
        this.setState({
          productInfo: data.products,
        });
      });
  };

  componentDidMount() {
    this.productListFetch();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.match !== prevProps.match ||
      this.state.priceSort !== prevState.priceSort ||
      this.state.offset !== prevState.offset
    ) {
      this.productListFetch();
    }
  }

  priceSorter = price => {
    this.setState({
      priceSort: price,
    });
  };

  pageHandler = offset => {
    console.log(offset);
    this.setState({
      offset: offset,
    });
  };

  render() {
    const { priceSorter, pageHandler } = this;
    const { productInfo } = this.state;
    const { params } = this.props.match;

    return (
      <div className="productList">
        <ListHeader idInfo={params} />
        <ListMenu idInfo={params} priceSorter={priceSorter} />
        <div className="productContainer">
          {productInfo &&
            productInfo.map(product => {
              return (
                <Product
                  key={product.id}
                  name={product.name}
                  idInfo={params}
                  price={product.price}
                  tag={product.tags}
                  img={product.thumbnail}
                  id={product.id}
                />
              );
            })}
        </div>
        <PageButton
          idInfo={params}
          productInfo={productInfo}
          pageHandler={pageHandler}
        />
      </div>
    );
  }
}

export default withRouter(ProductList);
