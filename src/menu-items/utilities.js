// Icon assets
import { IconCircleDashedCheck } from '@tabler/icons-react';

// constant
const icons = {
  IconCircleDashedCheck
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'Approved',
  title: 'Approved',
  type: 'group',
  children: [
    {
      id: 'Training Bonus Approved',
      title: 'Training Bonus',
      type: 'item',
      url: '/Approved/Training-bonus',
      icon: icons.IconCircleDashedCheck,
      breadcrumbs: false
    },
    {
      id: 'Referral Payment Approved',
      title: 'Referral Payment',
      type: 'item',
      url: '/Approved/Referral-Bonus',
      icon: icons.IconCircleDashedCheck,
      breadcrumbs: false
    }
  ]
};

export default utilities;
