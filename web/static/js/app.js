import { createStore, combineReducers, applyMiddleware } from 'redux'
import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import thunk from 'redux-thunk'

function counter(state=0, action){
  switch (action.type) {
    case "INCREMENT":
      return state + 1
    case "DECREMENT":
      return state - 1
    default: 
      return state
  }
}

function factsReducer(state="No Facts yet", action){
  switch (action.type) {
    case "NEW_FACT":
      return action.payload
    default:
      return state
  }
}


function lastMessage(state="No Message Yet", action) {
  switch (action.type) {
    case "INCREMENT":
      return "Was Incremented"
    case "DECREMENT":
      return "Was Decremented"
    default:
      return state
  }
}

function getFact(number){
  return (dispatch, currentState) => {
    dispatch({type: "GETTING_FACT"})
    axios.get(`http://numbersapi.com/${number}/math`).then(({data}) => {
      dispatch({type: "NEW_FACT", payload: data})
    })
  }
}

const rootReducer = combineReducers({
  counter: counter,
  lastMessage: lastMessage,
  fact: factsReducer
})

const store = createStore(
  rootReducer, 
  applyMiddleware(thunk)
)

const App = (props) => {
  return (
    <div>
      <div>
        The current value is: {props.counterValue}
      </div>
      <div>
        The last message was {props.lastMessage}
      </div>
      <div>
        Random Fact {props.fact}
      </div>
      <button onClick={() => store.dispatch({type: "INCREMENT"})}>Up</button>
      <button onClick={() => store.dispatch({type: "DECREMENT"})}>Down</button>
      <button onClick={() => store.dispatch(props.getFact())}>GetFact</button>
    </div>
  )
}

store.subscribe(function(){
  render(<App 
    counterValue={store.getState().counter} 
    lastMessage={store.getState().lastMessage}
    getFact={getFact}
    fact={store.getState().fact}
    />, document.querySelector(".container"))
})

store.dispatch({type: "Banana"})


