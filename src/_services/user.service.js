import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
   
}

function logout() {
  
}

function getAll() {
    
}

function getById(id) {
  
}

function register(user) {
   
}

function update(user) {
   
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    
}

function handleResponse(response) {
   
}