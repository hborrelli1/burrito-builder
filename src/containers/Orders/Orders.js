import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setOrders } from '../../actions';
import { getOrders, deleteOrder } from '../../apiCalls';
import './Orders.css';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    getOrders()
      .then(data => this.props.setOrders(data.orders))
      .catch(err => console.error('Error fetching:', err));
  }

  handleDelete = (id) => {
    deleteOrder(id)
      .then(info => {
        if (info === 204) {
          getOrders()
            .then(data => this.props.setOrders(data.orders))
            .catch(err => console.error('Error fetching:', err));
        }
      })
  }

  render() {
    const orderEls = this.props.orders.map(order => {
      return (
        <div key={order.id} className="order">
          <h3>{order.name}</h3>
          <ul className="ingredient-list">
            {order.ingredients.map(ingredient => {
              return <li key={ingredient} >{ingredient}</li>
            })}
          </ul>
          <button
            data-testid={`delete-${order.id}`}
            className="delete-button"
            onClick={() => this.handleDelete(order.id)}
          >X</button>
        </div>
      )
    });

    return (
      <section>
        { orderEls.length ? orderEls : <p>No orders yet!</p> }
      </section>
    )

  }
}

const mapStateToProps = ({ orders }) => ({
  orders,
})

const mapDispatchToProps = dispatch => ({
  setOrders: (orders) => dispatch( setOrders(orders) )
})

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
