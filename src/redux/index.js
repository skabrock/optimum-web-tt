import { createReducer } from './utils/createReducer';

const initialState = {
  popups: [
    {
      name: 'terms propose',
      id: "0",
      text: 'Please agree terms',
      type: 'normal'
    }, {
      name: 'terms agree',
      id: "1",
      text: 'you have agreed terms',
      type: 'success'
    }, {
      name: 'terms decline',
      id: "2",
      text: 'you have declined terms',
      type: 'failure'
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