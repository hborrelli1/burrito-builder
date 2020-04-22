import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addOrders } from '../../apiCalls';
import { setOrders } from '../../actions';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error: ''
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleIngredientChange = e => {
    e.preventDefault();
    this.setState({ingredients: [...this.state.ingredients, e.target.name]});
  }

  handleSubmit = e => {
    e.preventDefault();
    addOrders({ name: this.state.name, ingredients: this.state.ingredients })
      .then(data => {
        if (data.name) {
          this.props.setOrders([...this.props.orders, data]);
        }
      })
      .catch(err => console.error('Error fetching:', err));
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  validateForm = () => {
    const hasIngredients = this.state.ingredients.length;
    const hasName = this.state.name.length;

    return (hasIngredients && hasName) ? false : true ;
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button
          onClick={e => this.handleSubmit(e)}
          disabled={this.validateForm()}
        >
          Submit Order
        </button>
      </form>
    )
  }
}

const mapStateToProps = ({ orders }) => ({
  orders,
})

const mapDispatchToProps = dispatch => ({
  setOrders: (orders) => dispatch( setOrders(orders) ),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
