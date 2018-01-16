import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { user, editUser, paymentsPlans } from './user.reducer';
import { term } from './term.reducer';
import { recovery } from './recovery.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  user,
  recovery,
  term,
  editUser,
  paymentsPlans
});

export default rootReducer;
