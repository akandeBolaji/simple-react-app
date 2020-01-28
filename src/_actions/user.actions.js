import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(username, password) {
   
}

function logout() {
   
}

function register(user) {
    
}

function getAll() {
   
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  
}