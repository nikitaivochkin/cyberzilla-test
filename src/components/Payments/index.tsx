import { Grid } from '@mui/material';
import FailedResult from 'components/ui/FailedResult';
import LoadingSkeleton from 'components/ui/LoadingSkeleton';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { getPayments } from 'store/slices/payments';
import PaymentsList from './PaymentsList';

import './styles.scss';

const Payments: React.FC = () => {
  const dispatch = useAppDispatch();
  const payments = useAppSelector((state) => state.payments.list);
  const requestStatus = useAppSelector((state) => state.payments.status);

  const shouldMakeRequest = requestStatus === 'none' && !payments.length;
  const isRequested = requestStatus === 'requested';
  const isSuccess = requestStatus === 'success';
  const isFailed = requestStatus === 'failed';

  const isNoData = requestStatus === 'success' && !payments.length;

  useEffect(() => {
    if (shouldMakeRequest) {
      dispatch(getPayments());
    }
  }, []);

  return (
    <div className="page">
      <h1>Payments</h1>
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
          isNoData && (
            <div>
              Payment list is empty
            </div>
          )
        }

        {
          isSuccess && (
            <PaymentsList payments={payments} />
          )
        }

        {
          isFailed && (
            <FailedResult />
          )
        }
      </Grid>
    </div>
  );
};

export default Payments;
