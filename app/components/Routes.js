import React, { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { Router, Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import RoutePaths from "./RoutePaths";

const Welcome = lazy(() => import(/* webpackChunkName: "Welcome" */ "./Welcome"));

const PageNotFound = lazy(() =>
  import(/* webpackChunkName: "NotFoundPage" */ "./PageNotFound/")
);

function Root({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={["/", RoutePaths.basepath]}>
          <Layout>
            <Suspense fallback={<div />}>
              <Route exact path={RoutePaths.basepath} component={Welcome} />
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
