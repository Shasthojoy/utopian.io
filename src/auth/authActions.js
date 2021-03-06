import Promise from 'bluebird';
import steemConnect from 'sc2-sdk';
import Cookie from 'js-cookie';
import { getFollowing } from '../user/userActions';
import { initPushpad } from '../helpers/pushpadHelper';
import { getDrafts } from '../helpers/localStorageHelpers';
import getImage from '../helpers/getImage';

Promise.promisifyAll(steemConnect);

export const LOGIN = '@auth/LOGIN';
export const LOGIN_START = '@auth/LOGIN_START';
export const LOGIN_SUCCESS = '@auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = '@auth/LOGIN_ERROR';

export const RELOAD = '@auth/RELOAD';
export const RELOAD_START = '@auth/RELOAD_START';
export const RELOAD_SUCCESS = '@auth/RELOAD_SUCCESS';
export const RELOAD_ERROR = '@auth/RELOAD_ERROR';

export const LOGOUT = '@auth/LOGOUT';
export const LOGOUT_START = '@auth/LOGOUT_START';
export const LOGOUT_ERROR = '@auth/LOGOUT_ERROR';
export const LOGOUT_SUCCESS = '@auth/LOGOUT_SUCCESS';

export const login = () => (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: {
      promise: steemConnect.me()
        .then((resp) => {
          console.log("RESP", resp)

          if (resp && resp.user) {
            dispatch(getFollowing(resp.user));

            setTimeout(function() {
              const script = document.createElement("script");

              console.log("ACCOUNT ID", resp.account.id);

              window.chat_name = resp.user;
              window.chat_id = resp.account.id;
              window.chat_avatar = getImage(`@${resp.user}?s=${68}`);
              window.chat_link = `https://utopian.io/@${resp.user}`;
              window.chat_role = 'default';

              script.src = "https://fast.cometondemand.net/11410x_x1fa73.js";

              document.body.appendChild(script);
            }, 3000);
          }

          if (window.ga) {
            window.ga('set', 'userId', resp.user);
          }

          initPushpad(resp.user, Cookie.get('access_token'));
          resp.drafts = getDrafts();
          return resp;
        }),
    },
  });
};

export const reload = () => dispatch =>
  dispatch({
    type: RELOAD,
    payload: {
      promise: steemConnect.me(),
    },
  });

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
    payload: {
      promise: steemConnect.revokeToken()
        .then(() => {
          Cookie.remove('access_token');
          if (process.env.NODE_ENV === 'production') {
            window.location.href = process.env.UTOPIAN_LANDING_URL;
          }
        }),
    },
  });
};
