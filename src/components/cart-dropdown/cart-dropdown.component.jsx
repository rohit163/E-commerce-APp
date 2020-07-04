import React from "react";
import './cart-dropdown.styles.scss';
import { connect } from 'react-redux';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { CartdropdownContainer, CartitemsContainer, EmptyMessageContainer } from './cart-dropdown.styles';
import { CustomButtonContainer } from "../custom-button/custom-buttom.styles";

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <CartdropdownContainer className='cart-dropdown' >
        <CartitemsContainer >
            {
                cartItems.length ?
                    cartItems.map(cartItem => (
                        <CartItem key={cartItem.id} item={cartItem} />
                    ))
                    : (
                        <EmptyMessageContainer >Your Cart is Empty</EmptyMessageContainer>
                    )
            }

        </CartitemsContainer>
        <CustomButtonContainer onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden() )
            }}>GO TO CHECKOUT</CustomButtonContainer>
    </CartdropdownContainer>
);
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));