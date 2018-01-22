import { cardConstants } from '../_constants';

export function card(state = {}, action) {
  switch (action.type) {
    case cardConstants.CARD_REQUEST:
      return {
        loading: true
      };
    case cardConstants.CARD_SUCCESS:
      return {
        items: action.cards
      };
    case cardConstants.CARD_FAILURE:
      return {
        error: action.error
      };
    case cardConstants.DELETE_REQUEST:
      // add 'deleting:true' property to card being deleted
      return {
          items: state.card
     
    /*  return {
        ...state,
        items: state.items.map(card =>
            card.id === action.id
            ? { ...card, deleting: true }
            : card
        )*/
      };
    case cardConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(card => card.id !== action.id)
      };
    case cardConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map(card => {
          if (card.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...cardCopy } = card;
            // return copy of user with 'deleteError:[error]' property
            return { ...cardCopy, deleteError: action.error };
          }

          return card;
        })
      };
    default:
      return state
  }
}
