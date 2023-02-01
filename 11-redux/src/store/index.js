import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialState = { counter: 0, showCounter: true }

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // here we don't need the action because these methods will automatically be called for you
    // depending on which action was triggered.
    // NOTE: why you are mutating the state here?
    // Redux toolkit internally uses another package, called immerjs, which will detect code like this
    // and which will automatically clone the existing state, create a new state object, keep all the state
    // which we're not editing, and override the state which we are editing in an immutable way.
    // So we still have immutable code here
    // another great thing here is that we don't have to return the WHOLE object each time ,
    // but we return what is actualy related to this functionality (in this case its the INCREMENTING)
    increment(state) {
      state.counter++
    },
    decrement(state) {
      state.counter--
    },
    increase(state, action) {
      state.counter = state.counter + action.payload // this payload name is not up to you
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter
    },
  },
})

// ConfigureStore like createStore creates a store but it makes merging multiple reducers into one reducer easier.
const store = configureStore({
  // reducer: { counter: counterSlice.reducer }, // with multiple reducers. but in this case:
  reducer: counterSlice.reducer,
})

// const counterReducer = (state = initialState, action) => {
//   if (action.type === 'increment') {
//     return {
//       counter: state.counter + 1,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === 'increase') {
//     return {
//       counter: state.counter + action.amount,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === 'decrement') {
//     return {
//       counter: state.counter - 1,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === 'toggle') {
//     return {
//       showCounter: !state.showCounter,
//       counter: state.counter,
//     };
//   }

//   return state;
// };

// const store = createStore(counterReducer);

// calling the actoin is a something that reduc-toolkit will do for us, for exampe: for the toggleCounter
// counterActions.actions.toggleCounter  will return an action object of this shape:
// {  type: 'auto-generated-unique-name-action' }
export const counterActions = counterSlice.actions

export default store
