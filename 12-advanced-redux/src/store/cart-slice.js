import { createSlice } from '@reduxjs/toolkit'
import { uiActions } from './ui-slice'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload
      const existingItem = state.items.find((item) => item.id === newItem.id)
      state.totalQuantity++
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        })
      } else {
        existingItem.quantity++
        existingItem.totalPrice = existingItem.totalPrice + newItem.price
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload
      const existingItem = state.items.find((item) => item.id === id)
      state.totalQuantity--
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id)
      } else {
        existingItem.quantity--
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price
      }
    },
  },
})

// the great thing about Redux, when using Redux toolkit, is that it's prepared for that. It does not just accept action objects
// with a type property. Instead it also does accept, action creators that return functions. And if it sees,
// that you're dispatching, an action which is actually a function, instead of action object, it will execute
// that function for you. So Redux will execute that function for you. And with that function, I mean this function here,
// ( return async (dispatch) => {} ) it will give us that dispatch argument automatically. So that in that executed function,
// we can dispatch again,
// because there's a such a common pattern that we wanna have action creators that can perform side effects.
// And that can then dispatch another actions, which eventually reached the reducers, as part of a flow off side-effects,
// or as a flow of steps that should be taken. And that's what we have here. So we can use a function
// that returns another function, as a action as well. That is built into Redux when using Redux toolkit.

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      }),
    )

    const sendRequest = async () => {
      const response = await fetch('https://react-9043f-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart),
      })

      if (!response.ok) {
        throw new Error('Sending cart data failed.')
      }
    }

    try {
      await sendRequest()
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        }),
      )
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        }),
      )
    }
  }
}

export const cartActions = cartSlice.actions

export default cartSlice
