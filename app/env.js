import { getUrlForApp } from "@dtsl/url-fetch";

class EnvSingletonClass {
  constructor(env) {
    this.env = env;
    this.urls = getUrlForApp(env, false);
  }
  setEnv = ({ env }) => {
    this.env = env;
    this.urls = getUrlForApp(env, false);
  };
  resetEnv = () => {
    this.env = null;
    this.urls = null;
  };
}
const EnvSingleton = (() => {
  let instance;
  return {
    get instance() {
      return instance;
    },
    createInstance: ({ env }) => {
      if (!instance) {
        instance = new EnvSingletonClass(env);
      }
      return instance;
    },
  };
})();

export const EnvInstance = EnvSingleton.createInstance({ env: APP_ENV });
