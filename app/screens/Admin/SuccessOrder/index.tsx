import React from 'react';
import {PurchaseDetail} from '@components';

const SuccessOrder = ({route}) => {
  const param = route.params.orderData;

  return (
    <PurchaseDetail
      amount={param.amount}
      orderType={
        param.orderType === 'Stock' ? 'Stock Order Number' : 'Order Number'
      }
      orderNumber={param.orderNumber}
    />
  );
};

export default SuccessOrder;
