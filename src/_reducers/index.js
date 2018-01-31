import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { user, editUser, paymentsPlans, cancelPlans, home } from './user.reducer';
import { term } from './term.reducer';
import { recovery } from './recovery.reducer';
import { alert } from './alert.reducer';
import { countrys, country } from './country.reducer';
import { search, ebay } from './search.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  user,
  recovery,
  term,
  editUser,
  paymentsPlans,
  cancelPlans,
  countrys,
  country,
  search,
  ebay,
  home
});

export default rootReducer;
