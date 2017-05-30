import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from '../Popup';
import './styles.css';

class App extends Component {

  componentDidMount() {
    document.addEventListener("keyup", this.handleShortcuts);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleShortcuts);
  }

  handleShortcuts = e => {
    if(e.which === 27) {
      this.advanceInQueue();
    }
  }

  setPopupQueue = () => {
    const { setPopupQueue, popups } = this.props;

    if ( this.selectAllInput.checked ) {
      setPopupQueue(popups.reduce( (sum, cur) => {
        return [...sum, cur.id];
      }, []));
    } else if (this.popupSelect.value !== 'empty') {
      setPopupQueue([this.popupSelect.value]);
    }
    this.resetInputs();
  }

  resetInputs = () => {
    this.popupSelect.value = 'empty';
    this.selectAllInput.checked = false;
  }

  advanceInQueue = () => {
    const { setPopupQueue, popup_queue } = this.props;
    setPopupQueue(popup_queue.slice(1));
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
          <button onClick={this.setPopupQueue}>Open</button>
        </div>
        {
          popup_queue.length
            ? <Popup onCloseRequest={this.advanceInQueue}>
                {
                  popups.filter(item => {
                    return item.id === popup_queue[0]
                  })[0]
                }
              </Popup>
            : null
        }
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