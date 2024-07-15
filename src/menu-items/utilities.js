// Icon assets
import { IconCashRegister, IconCreditCardRefund, IconCreditCardPay, IconChartHistogram } from '@tabler/icons-react';

// constant
const icons = {
  IconCashRegister,
  IconCreditCardRefund,
  IconCreditCardPay,
  IconChartHistogram
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'Transaction',
  title: 'Transaction',
  type: 'group',
  children: [
    {
      id: 'All Transactions',
      title: 'All Transactions',
      type: 'item',
      url: '/Transactions/all-transactions',
      icon: icons.IconCashRegister,
      breadcrumbs: false
    },
    {
      id: 'Deposit History',
      title: 'Deposit History',
      type: 'item',
      url: '/Transactions/deposit-history',
      icon: icons.IconCreditCardRefund,
      breadcrumbs: false
    },
    {
      id: 'Withdraw History',
      title: 'Withdraw History',
      type: 'item',
      url: '/Transactions/withdraw-history',
      icon: icons.IconCreditCardPay,
      breadcrumbs: false
    },
    {
      id: 'Training Bonus History',
      title: 'Training Bonus History',
      type: 'item',
      url: '/Transactions/training-bonus-history',
      icon: icons.IconChartHistogram,
      breadcrumbs: false
    },
    {
      id: 'Investment History',
      title: 'Investment History',
      type: 'item',
      url: '/Transactions/investment-history',
      icon: icons.IconChartHistogram,
      breadcrumbs: false
    }
  ]
};

export default utilities;
