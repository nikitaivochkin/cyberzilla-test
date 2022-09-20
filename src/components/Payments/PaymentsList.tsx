import React from 'react';
import { Payment as PaymentType } from 'types';
import PaymentItem from './PaymentItem';
import DitailTable from './DitailTable';

type PaymentsListProps = {
  payments: Array<PaymentType>
};

const PaymentsList: React.FC<PaymentsListProps> = ({ payments }: PaymentsListProps) => (
  <>
    {
        payments.map((item: PaymentType) => (
          <PaymentItem
            key={item.id}
            payment={item}
            render={(props: PaymentType) => <DitailTable props={props} />}
          />
        ))
      }
  </>
);

export default PaymentsList;
