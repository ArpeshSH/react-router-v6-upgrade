import React, { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { Router, Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import RoutePaths from "./RoutePaths";

const Welcome = lazy(() => import(/* webpackChunkName: "Welcome" */ "./Welcome"));
const Page2 = lazy(() => import(/* webpackChunkName: "Page2" */ "./Page2"));
const Page3 = lazy(() => import(/* webpackChunkName: "Page3" */ "./Page3"));

const PageNotFound = lazy(() =>
  import(/* webpackChunkName: "NotFoundPage" */ "./PageNotFound/")
);

function Root({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={["/", RoutePaths.basepath, RoutePaths.page2,RoutePaths.page3]}>
          <Layout>
            <Suspense fallback={<div />}>
              <Route exact path={RoutePaths.basepath} component={Welcome} />
            </Suspense>
            <Suspense fallback={<div />}>
              <Route exact path={RoutePaths.page2} component={Page2} />
            </Suspense>
            <Suspense fallback={<div />}>
              <Route exact path={RoutePaths.page3} component={Page3} />
            </Suspense>
          </Layout>
        </Route>
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

Root.defaultProps = {
  history: {},
};

Root.propTypes = {
  history: PropTypes.object,
};

export default Root;
