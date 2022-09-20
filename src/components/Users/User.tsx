import React from 'react';
import {
  Grid, Card, CardContent, Typography, Button,
} from '@mui/material';
import { User as UserType } from 'types';

type UserProps = {
  user: UserType,
  setActiveId: Function,
};

const User: React.FC<UserProps> = ({ user, setActiveId }: UserProps) => {
  const {
    id,
    name,
    email,
    phone,
  } = user;

  const handleOpenModal = (): void => {
    setActiveId(id);
  };

  return (
    <Grid
      item
      xs={1}
    >
      <Card>
        <CardContent>
          <Typography
            component="div"
            sx={{ fontSize: 20 }}
          >
            { name }
            <hr />
          </Typography>
          <Typography
            component="div"
          >
            { email }
          </Typography>
          <Typography
            component="div"
          >
            { phone }
          </Typography>
        </CardContent>
        <Button
          onClick={handleOpenModal}
        >
          Open
        </Button>
      </Card>
    </Grid>
  );
};

export default User;
