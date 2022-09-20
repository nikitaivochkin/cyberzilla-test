import React, { lazy } from 'react';

const HomePage = lazy(() => import('pages/HomePage'));
const UsersPage = lazy(() => import('pages/UsersPage'));
const PaymentsPage = lazy(() => import('pages/PaymentsPage'));
const ErrorPage = lazy(() => import('pages/ErrorPage'));

export interface Route {
  path: string,
  element: React.FC,
  linkName?: string,
}

const routes: Array<Route> = [
  {
    path: '/',
    element: HomePage,
    linkName: 'Home',
  },
  {
    path: '/users',
    element: UsersPage,
    linkName: 'Users',
  },
  {
    path: '/payments',
    element: PaymentsPage,
    linkName: 'Payments',
  },
  {
    path: '/404',
    element: ErrorPage,
  },
];

export default routes;

export const routesForNavigation: Array<Route> = routes.filter(({ path }) => path !== '/404');
