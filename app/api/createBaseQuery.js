import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { redirectLogin } from './helper';

const createBaseQuery = (apiUrl) => {
  const defaultBaseQuery = fetchBaseQuery({ baseUrl: apiUrl, credentials: 'include' });

  const baseQuery = async (args, api, extraOptions) => {

    // CSRF token handling for mutations
    if (args.method && args.method.toLowerCase() !== 'get') {
      const csrfTokenResponse = await defaultBaseQuery({
        url: '/get-token',
        method: 'GET'
      }, api, extraOptions);
      if (csrfTokenResponse.error) {
        throw new Error('Failed to fetch CSRF token.');
      }

      const csrfToken = csrfTokenResponse.data.token;
      let headers = args.headers || {};
      headers['X-CSRF-Token'] = csrfToken;
      args.headers = headers;
    }

    let result = await defaultBaseQuery(args, api, extraOptions);

    // intercept 403
    if (result.error) {
      const { errStatus, originalStatus } = result.error || {};
      if (errStatus === 403 || originalStatus === 403) {
        window.location.assign(redirectLogin(window.location.href));
        return;
      }
    }

    return result;
  }
  return baseQuery;
};

export default createBaseQuery;
