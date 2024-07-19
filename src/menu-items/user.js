// assets
import { IconUsers, IconUserPlus } from '@tabler/icons-react';

// constant
const icons = {
  IconUsers,
  IconUserPlus
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const user = {
  id: 'users',
  title: 'Users',
  type: 'group',
  children: [
    {
      id: 'Active Users',
      title: 'Active Users',
      type: 'item',
      url: '/approval/training-bonus-approval',
      icon: icons.IconUsers
    },
    {
      id: 'Add User',
      title: 'Add User',
      type: 'item',
      url: '/approval/reference-approval',
      icon: icons.IconUserPlus
    }
  ]
};

export default user;
