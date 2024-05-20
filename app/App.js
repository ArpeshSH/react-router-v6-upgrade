import React, {Suspense} from 'react';
import { createRoot } from 'react-dom/client';
import AppProvider from './AppProvider';

const root = createRoot(document.getElementById("_reactRouter-v6-root"));
root.render(
    <Suspense fallback={<></>}>
      <AppProvider history={history} />
    </Suspense>
)
