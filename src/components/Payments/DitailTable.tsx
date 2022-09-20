import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { Payment as PaymentType } from 'types';

type PaymentModalProps = {
  props: PaymentType,
}

const PaymentModal: React.FC<PaymentModalProps> = ({ props }: PaymentModalProps) => {
  const {
    // eslint-disable-next-line react/prop-types
    id, userId, title, body,
  } = props;

  return (
    <TableContainer
      component={Paper}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              ID
            </TableCell>
            <TableCell>
              User ID
            </TableCell>
            <TableCell>
              Title
            </TableCell>
            <TableCell>
              Info
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell width="10%">
              { id }
            </TableCell>
            <TableCell width="10%">
              { userId }
            </TableCell>
            <TableCell width="30%">
              { title }
            </TableCell>
            <TableCell width="50%">
              { body }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentModal;
