import URLS from "app/utils/urlHelper";

export const redirectLogin = (url) => `${URLS.APP_DOMAIN}/account/login?target=${encodeURIComponent(url)}`;
