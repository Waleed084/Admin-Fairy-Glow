// assets
import { IconCalendarClock } from '@tabler/icons-react';

// constant
const icons = {
  IconCalendarClock
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pending Approvals',
  type: 'group',
  children: [
    {
      id: 'Training Bonus',
      title: 'Training Bonus',
      type: 'item',
      url: '/approval/training-bonus-approval',
      icon: icons.IconCalendarClock
    },
    {
      id: 'Referral Payment',
      title: 'Referral Payment',
      type: 'item',
      url: '/approval/reference-approval',
      icon: icons.IconCalendarClock
    }
  ]
};

export default pages;
