// assets
import { IconUserPlus, IconBusinessplan, IconDeviceTabletUp, IconSend2 } from '@tabler/icons-react';

// constant
const icons = {
  IconUserPlus,
  IconBusinessplan,
  IconDeviceTabletUp,
  IconSend2
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Payments',
  type: 'group',
  children: [
    {
      id: 'Training Bonus',
      title: 'Training Bonus',
      type: 'item',
      url: '/payments/training-bonus',
      icon: icons.IconUserPlus
    },
    {
      id: 'Invest Now',
      title: 'Invest Now',
      type: 'item',
      url: '/payments/invest',
      icon: icons.IconBusinessplan
    },
    {
      id: 'Withdraw',
      title: 'Withdraw',
      type: 'item',
      url: '/payments/withdraw',
      icon: icons.IconDeviceTabletUp
    },
    {
      id: 'Money Transfer',
      title: 'Money Transfer',
      type: 'item',
      url: '/payments/money-transfer',
      icon: icons.IconSend2
    }
  ]
};

export default pages;
