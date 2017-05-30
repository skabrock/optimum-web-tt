import React, { Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import './styles.css';

class App extends Component {

  setPopupQueue = () => {
    const { setPopupQueue, popups } = this.props;

    if ( this.selectAllInput.checked ) {
      setPopupQueue(popups.reduce( (sum, cur) => {
        return [...sum, cur.id];
      }, []));
      this.resetInputs();
    } else if (this.popupSelect.value !== 'empty') {
      setPopupQueue([this.popupSelect.value]);
      this.resetInputs();
    }
  }

  resetInputs = () => {
    this.popupSelect.value = 'empty';
    this.selectAllInput.checked = false;
  }

  advanceInQueue = () => {
    const { setPopupQueue, popup_queue } = this.props;
    setPopupQueue(Immutable.List(popup_queue).pop());
  }

  render() {

    const { popups, popup_queue } = this.props;

    return (
      <div>
        <div className="select-panel">
          <label htmlFor="select-popup">Select a popup: </label>
          <select ref={select => {this.popupSelect = select}} defaultValue="empty" id="select-popup">
            {[{id: 'empty', name: ''}, ...popups].map( item => 
              <option key={item.id} value={item.id}>{item.name}</option>
            )}
          </select>
          <br/>
          <br/>
          <label htmlFor="select-all">Select all </label>
          <input id="select-all" type="checkbox" ref={input => {this.selectAllInput = input}} />
          <hr/>
          <button onClick={this.setPopupQueue}>open popup</button>
          <button onClick={this.advanceInQueue}>advance</button>
          <button onClick={this.resetInputs}>reset</button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => state, 
  dispatch => ({
    setPopupQueue: payload => {
      dispatch({type: 'SET_QUEUE', payload})
    }
  })
)(App);