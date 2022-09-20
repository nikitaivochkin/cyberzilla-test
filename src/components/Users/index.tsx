import React, { useEffect, useState } from 'react';
import {
  Grid, Modal, Box, Snackbar, Alert,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store';
import { getUsers, resetUserUpdate } from 'store/slices/users';
import FailedResult from 'components/ui/FailedResult';
import LoadingSkeleton from 'components/ui/LoadingSkeleton';
import UserList from './UserList';

import './styles.scss';
import ModalTabs from './Modal';

const Users: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.list);

  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const requestUsertsStatus = useAppSelector((state) => state.users.status);
  const updateUserStatus = useAppSelector((state) => state.users.updateStatus);

  const shouldMakeRequest = requestUsertsStatus === 'none' && !users.length;
  const isRequested = requestUsertsStatus === 'requested';
  const isSuccess = requestUsertsStatus === 'success';
  const isFailed = requestUsertsStatus === 'failed';

  const isNoData = isSuccess && !users.length;

  useEffect(() => {
    if (shouldMakeRequest) {
      dispatch(getUsers());
    }
  }, []);

  const handleCloseAlert = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(resetUserUpdate());
  };

  return (
    <>
      <div className="page">
        <h1>Users</h1>
        <Grid
          container
          spacing={2}
          columns={3}
        >
          {
            isRequested && (
              <LoadingSkeleton num={12} />
            )
          }

          {
            isSuccess && (
              <UserList
                users={users}
                setActiveId={setActiveCardId}
              />
            )
          }

          {
            isNoData && (
              <div>
                User list is empty
              </div>
            )
          }

          {
            isFailed && (
              <FailedResult />
            )
          }
        </Grid>
      </div>

      <Modal
        open={!!activeCardId}
        onClose={() => setActiveCardId(null)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          component="div"
          className="modal-container"
        >
          <ModalTabs
            activeCardId={activeCardId}
            setActiveCardId={setActiveCardId}
            users={users}
          />
        </Box>
      </Modal>

      <Snackbar
        open={updateUserStatus === 'success'}
        onClose={handleCloseAlert}
        autoHideDuration={6000}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Alert severity="success">
          User was updated
        </Alert>
      </Snackbar>
    </>
  );
};

export default Users;
