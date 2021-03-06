import { CALL_API } from '../middlewares/api';
import * as Actions from '../actions/constants';

export const currentGithubScopeVersion = Actions.CURRENT_SCOPE_VERSION;

export const createGithubUserRequest = (account, code, state, scopeVersion = currentGithubScopeVersion) => ({
  [CALL_API]: {
    types: [ Actions.CREATE_GITHUB_USER_REQUEST, Actions.CREATE_GITHUB_USER_SUCCESS, Actions.CREATE_GITHUB_USER_FAILURE ],
    endpoint: `users`,
    schema: null,
    method: 'POST',
    payload: {
      account,
      code,
      state,
      scopeVersion
    },
    additionalParams: {},
    absolute: false,
  }
});

export const createGithubUser = (account, code = "-", state = "-") => dispatch => dispatch(createGithubUserRequest(account, code, state));

export const getUserRequest = (account) => ({
  [CALL_API]: {
    types: [ Actions.GET_USER_REQUEST, Actions.GET_USER_SUCCESS, Actions.GET_USER_FAILURE ],
    endpoint: `users/${account}`,
    schema: null,
    method: 'GET',
    payload: {},
    additionalParams: {},
    absolute: false
  }
});

export const getUser = (account) => dispatch => dispatch(getUserRequest(account));

export const confirmExistenceRequest = (account) => ({
  [CALL_API]: {
    types: [ Actions.CHECK_USER_REQUEST, Actions.CHECK_USER_SUCCESS, Actions.CHECK_USER_FAILURE ],
    endpoint: `users/${account}/check`,
    schema: null,
    method: 'POST',
    payload: {
      account
    },
    additionalParams: {},
    absolute: false
  }
});

export const confirmExistence = (account) => dispatch => dispatch(confirmExistenceRequest(account));

export const banUserRequest = (account, banned, bannedBy, banReason, bannedUntil) => ({
  [CALL_API]: {
    types: [ Actions.BAN_USER_REQUEST, Actions.BAN_USER_SUCCESS, Actions.BAN_USER_FAILURE ],
    endpoint: `users/${account}/ban`,
    schema: null,
    method: 'POST',
    payload: {
      account,
      banned,
      bannedBy,
      banReason,
      bannedUntil,
    },
    additionalParams: {},
    absolute: false
  }
});

export const getBanRequest = (account) => ({
  [CALL_API]: {
    types: [ Actions.GET_BAN_REQUEST, Actions.GET_BAN_SUCCESS, Actions.GET_BAN_FAILURE ],
    endpoint: `users/${account}/ban`,
    schema: null,
    method: 'GET',
    payload: {},
    additionalParams: {},
    absolute: false
  }
});

export const banUser = (account = "undefined", banned = 1, bannedBy = "<anonymous-mod>", reason="Violation of Utopian Rules", bannedUntil = new Date(0)) => dispatch => dispatch(banUserRequest(account, banned, bannedBy, reason, bannedUntil));
export const getBanUser = (account) => dispatch => dispatch(getBanRequest(account));
