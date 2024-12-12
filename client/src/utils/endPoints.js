let baseUrl = " http://localhost:8000/api";

export { baseUrl };

const ENDPOINTS = {
  REGISTER: `${baseUrl}/users/register`,
  LOGIN: `${baseUrl}/users/login`,
  LOGOUT: `${baseUrl}/users/logout`,
  ADD_INCOME: `${baseUrl}/incomes`,
  GET_ALL_INCOME: `${baseUrl}/incomes`,
  GET_ONE_INCOME: `${baseUrl}/incomes`,
  UPDATE_INCOME: `${baseUrl}/incomes`,
  DELETE_INCOME: `${baseUrl}/incomes`,
  ADD_EXPENSES: `${baseUrl}/expenses`,
  GET_ALL_EXPENSES: `${baseUrl}/expenses`,
  GET_ONE_EXPENSE: `${baseUrl}/expenses`,
  UPDATE_EXPENSE: `${baseUrl}/expenses`,
  DELETE_EXPENSE: `${baseUrl}/expenses`,
};

export default ENDPOINTS;
