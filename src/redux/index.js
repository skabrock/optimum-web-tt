import { createReducer } from './utils/createReducer';

const initialState = {
  popups: [
    {
      name: 'Terms propose',
      id: "0",
      text: 'Please agree terms',
      type: 'normal',
      body: 'Please make sure you have agreed with terms...'
    }, {
      name: 'Terms agreed',
      id: "1",
      text: 'you have agreed terms',
      type: 'success',
      body: 'Congratulations! You have successfully agred terms.'
    }, {
      name: 'Terms decline',
      id: "2",
      text: 'you have declined terms',
      type: 'failure',
      body: 'We are sorry, but you have to agree terms before continue use service.'
    }
  ],
  popup_queue: []
};

export default createReducer({

  SET_QUEUE: (state, { payload }) => ({
    ...state,
    popup_queue: payload ? payload : initialState.popup_queue
  }),

}, initialState);