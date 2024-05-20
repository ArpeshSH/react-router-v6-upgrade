import React, { lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Layout from './Layout'
import RoutePaths from './RoutePaths'

const Welcome = lazy(() => import(/* webpackChunkName: "Welcome" */ './Welcome'))
const Page2 = lazy(() => import(/* webpackChunkName: "Page2" */ './Page2'))
const Page3 = lazy(() => import(/* webpackChunkName: "Page3" */ './Page3'))
const Page4 = lazy(() => import(/* webpackChunkName: "Page4" */ './Page4'))
const PageNotFound = lazy(() => import(/* webpackChunkName: "NotFoundPage" */ './PageNotFound/'))

function Root({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={['/', RoutePaths.basepath, RoutePaths.page2, RoutePaths.page3, RoutePaths.page4]}>
          <Layout>
            <Suspense fallback={<></>}>
              <Route exact path={RoutePaths.basepath} component={Welcome} />
            </Suspense>
            <Suspense fallback={<></>}>
              <Route exact path={RoutePaths.page2} component={Page2} />
            </Suspense>
            <Suspense fallback={<></>}>
              <Route exact path={RoutePaths.page3} component={Page3} />
            </Suspense>
            <Suspense fallback={<></>}>
              <Route exact path={RoutePaths.page4} component={Page4} />
            </Suspense>
            
              <Redirect strict from={RoutePaths.page4} to={RoutePaths.page3} />

          </Layout>
        </Route>
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  )
}

Root.defaultProps = {
  history: {}
}

Root.propTypes = {
  history: PropTypes.object
}

export default Root
