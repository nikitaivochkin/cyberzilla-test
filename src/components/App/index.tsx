import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from 'components/hoc/Layout';
import routes from 'routes';

const App: React.FC = () => (
  <AppLayout>
    <Suspense fallback={<div />}>
      <Routes>
        {
          routes.map(({ path, element: Component }) => (
            <Route
              key={path}
              path={path}
              element={<Component />}
            />
          ))
        }
        <Route
          path="*"
          element={<Navigate replace to="/404" />}
        />
      </Routes>
    </Suspense>
  </AppLayout>
);

export default App;
