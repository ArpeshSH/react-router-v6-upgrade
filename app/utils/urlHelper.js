import { EnvInstance } from '../env';

const urlObj = {
	APP_DOMAIN: '',
	ACCOUNT_APP_URL: '',
	ACCOUNT_APP_API_URL: '',
	IP_MANAGEMENT_API_URL: '',
	ACCOUNT_DOMAIN: '',
	MARKETING_URL: ''
};

export const getEnvVar = (key) => {
	let url = EnvInstance.urls[key];

	return url;
};

const URLS = new Proxy(urlObj, {
	get(target, prop) {
		return getEnvVar(prop);
	}
});

export default URLS;
