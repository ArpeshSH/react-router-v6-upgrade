import React, { Suspense } from "react";
// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';

import AppProvider from "./AppProvider";
import { Loader } from "@dtsl/react";
import { createMemoryHistory, createBrowserHistory } from "history";
import { devRoot } from "app/utils/helper";
import { EnvInstance } from "./env";

import '@dtsl/css-design-tokens/dist/index.css';

import(
  /* webpackPreload: true */ /* webpackChunkName: "BoilerPlate-Style.less" */ "./assets/less/style.less"
);

const mount = (el, { onNavigate, defaultHistory, initialPath, envOverride }) => {
  const history =
    defaultHistory || createMemoryHistory({ initialEntries: [initialPath] });

  if (envOverride) {
    EnvInstance.setEnv({ envOverride });
  }

  if (onNavigate) {
    history.listen(onNavigate);
  }

  // ReactDOM.render(
  //   <Suspense fallback={<Loader isAbsolute />}>
  //     <AppProvider history={history} />
  //   </Suspense>,
  //   el
  // );

  const root = createRoot(el);
root.render(
    <Suspense fallback={<Loader isAbsolute/>}>
      <AppProvider history={history} />
    </Suspense>
)

  return {
    onParentNavigate() {},
  };
};

// If we are in development and in isolation,
// call mount immediately

if (devRoot) {
  mount(devRoot, { defaultHistory: createBrowserHistory() });
}

// We are running through container
// and we should export the mount function
export { mount };
