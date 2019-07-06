import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const Statistics = () => {
  if (store.getState().all === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        No feedback given.
      </div>
    )
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <tr>
            <td>Good</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>Neutral</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>Bad</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>All</td>
            <td>{store.getState().all}</td>
          </tr>
          <tr>
            <td>Average</td>
            <td>{(store.getState().good - store.getState().bad)/store.getState().all}</td>
          </tr>
          <tr>
            <td>Positive</td>
            <td>{(store.getState().good/store.getState().all)*100} %</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <h2>Give us feedback</h2>
      <button onClick={good}>good</button>
      <button onClick={ok}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <Statistics />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)