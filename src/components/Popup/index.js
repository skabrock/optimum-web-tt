import React from 'react';
import './styles.css';

const Popup = ({children, onCloseRequest}) => (
  <div className={`popup popup--${children.type || 'normal'}`} onClick={onCloseRequest}>
    <div className="popup__window" onClick={e => e.stopPropagation()}>
      <button className="popup__close" onClick={onCloseRequest}>x</button>
      <div className="popup__title">
        {children.name}
      </div>
      <div className="popup__body">
        {children.body}
      </div>
    </div>
  </div>
)

export default Popup;