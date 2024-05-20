import React, { useState, useEffect, Suspense } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import Routes from "./components/Routes";
import { store } from "./store";
import { flattenMessages, getCookieValue } from "./utils/helper";
import AuthProvider from "./components/AuthProvider";
import { getTranslations } from "./translations/index";
import { Loader } from "@dtsl/react";
import * as Sentry from "@sentry/react";
import URLS from "./utils/urlHelper";
// import registerSw from "../service-worker/registerSW";

const ErrorBoundary = React.lazy(() =>
  import(
    /* webpackChunkName: "ErrorBoundary" */ "./components/errorBoundary"
  )
);

// APP_ENV !== "local" && registerSw();

function AppProvider({ history }) {
  const language = getCookieValue("tmpl_lang") || "en";
  const [messages, setMessages] = useState({});

  useEffect(() => {
    function initElasticRUM() {
      import("@elastic/apm-rum").then(({ init: initApm, apm }) => {
        initApm({
          serviceName: "React Boilerplate",
          serverUrl: REACT_APP_APM_SERVICE_URL,
          environment: APP_ENV,
          serviceVersion: "",
        });
        Sentry.init({
          dsn: SENTRY_URL,
          environment: APP_ENV,
        });
        apm.setUserContext({ id: "" });
        apm.setCustomContext({ session: "" });
        Sentry.setUser({ email: "", clientId: "" });
      });
    }
    APP_ENV === "production" && initElasticRUM();
  }, []);

  useEffect(() => {
    async function fetch() {
      const asyncMessages = await getTranslations(language);
      setMessages(asyncMessages);
    }
    fetch();
  }, [language]);

  return (
    <Suspense fallback={<Loader isAbsolute />}>
      <Provider store={store}>
        {Object.keys(messages).length ? (
          <IntlProvider locale={language} messages={flattenMessages(messages)}>
            <Sentry.ErrorBoundary
              beforeCapture={(scope) => {
                scope.setUser({
                  email: "sahil@sendinblue.com",
                  client_id: 100012,
                });
              }}
              fallback={() => {
                return (
                  <ErrorBoundary
                    dashboardUrl={URLS.APP_DOMAIN}
                  />
                );
              }}
            >
              <AuthProvider>
                <Routes history={history} />
              </AuthProvider>
            </Sentry.ErrorBoundary>
          </IntlProvider>
        ) : (
          <Loader loaderAbsolute />
        )}
      </Provider>
    </Suspense>
  );
}

AppProvider.defaultProps = {
  history: {},
};

AppProvider.propTypes = {
  history: PropTypes.object,
};

export default AppProvider;
