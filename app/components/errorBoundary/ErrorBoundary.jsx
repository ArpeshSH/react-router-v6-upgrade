import React from "react";
import { ErrorFallback } from './ErrorFallback';
import { devRoot } from "app/utils/helper";
import URLS from "app/utils/urlHelper";

function ErrorBoundary() {
  return (
    <ErrorFallback
      showHeader={!!devRoot}
      dashboardUrl={`${URLS.APP_DOMAIN}`}
    />
  );
}

export default ErrorBoundary;
