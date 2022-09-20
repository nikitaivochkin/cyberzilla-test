import React, { PropsWithChildren } from 'react';
import { Link, useMatch } from 'react-router-dom';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {
  routesForNavigation as routes,
  Route as RouteType,
} from 'routes';

import './styles.scss';

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const isActiveRoute = (path: string): boolean | undefined => !!useMatch(path);

  return (
    <Grid
      container
      spacing={2}
      columns={12}
    >
      <Grid item xs={2}>
        <List className="main-nav">
          {
            routes.map(({ linkName, path }: RouteType) => (
              <ListItem key={path}>
                <Link to={path} className="main-nav__link">
                  <ListItemButton selected={isActiveRoute(path)}>
                    <ListItemText primary={linkName} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))
          }
        </List>
      </Grid>
      <Grid
        item
        xs={10}
        className="content-section"
      >
        <Box>
          { children }
        </Box>
      </Grid>
    </Grid>
  );
};

export default AppLayout;
