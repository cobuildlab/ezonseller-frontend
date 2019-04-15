import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { user, editUser, paymentsPlans, cancelPlans, home , editCard, paymentHistory} from './user.reducer';
import { term } from './term.reducer';
import { getallplan } from './getallplan.reducer';
import { recovery } from './recovery.reducer';
import { alert } from './alert.reducer';
import { countrys, country } from './country.reducer';
import { search, ebay } from './search.reducer';
import { getplan } from './getplan.reducer';

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
  home,
  editCard,
  paymentHistory,
  getallplan,
  getplan
});

export default rootReducer;
