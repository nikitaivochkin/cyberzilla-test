import React, { useState } from 'react';
import {
  Grid, Card, CardContent, Typography, Modal, Box,
} from '@mui/material';
import { Payment as PaymentType } from 'types';

type PaymentItemProps = {
  payment: PaymentType,
  render: Function,
};

const PaymentItem: React.FC<PaymentItemProps> = ({ payment, render }: PaymentItemProps) => {
  const { id, title } = payment;

  const [isModalActive, setActiveModal] = useState(false);

  return (
    <>
      <Grid
        item
        xs={1}
      >
        <Card
          className="payment-item"
          onClick={() => setActiveModal(true)}
        >
          <CardContent
            className="payment-item__content"
          >
            <Typography
              component="div"
              sx={{ fontSize: 20 }}
              className="payment-item__id"
            >
              ID -
              {' '}
              { id }
              <hr />
            </Typography>
            <Typography
              component="div"
            >
              { title }
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Modal
        open={isModalActive}
        onClose={() => setActiveModal(false)}
      >
        <Box
          component="div"
          className="modal-container modal-payments"
        >
          { render(payment) }
        </Box>
      </Modal>
    </>
  );
};

export default PaymentItem;
