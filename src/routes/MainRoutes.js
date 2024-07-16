import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// Payment routing
const TrainingBonusApproval = Loadable(lazy(() => import('views/pages/TrainingBonusApproval')));
const ReferenceApproval = Loadable(lazy(() => import('views/pages/ReferenceApproval')));
// Transaction routing
const ReferenceBonusApproved = Loadable(lazy(() => import('views/utilities/ReferenceBonusApproved')));
const TrainingBonusApproved = Loadable(lazy(() => import('views/utilities/TrainingBonusApproved')));
//User Routes
const ActiveUsers = Loadable(lazy(() => import('views/user/ActiveUsers')));
const AddUser = Loadable(lazy(() => import('views/user/AddUser')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'Approved',
      children: [
        {
          path: 'Training-bonus',
          element: <TrainingBonusApproved />
        }
      ]
    },
    {
      path: 'Approved',
      children: [
        {
          path: 'Referral-Bonus',
          element: <ReferenceBonusApproved />
        }
      ]
    },
    {
      path: 'users',
      children: [
        {
          path: 'active-users',
          element: <ActiveUsers />
        }
      ]
    },
    {
      path: 'users',
      children: [
        {
          path: 'add-user',
          element: <AddUser />
        }
      ]
    },
    {
      path: 'approval',
      children: [
        {
          path: 'training-bonus-approval',
          element: <TrainingBonusApproval />
        },
        {
          path: 'reference-approval',
          element: <ReferenceApproval />
        }
      ]
    }
  ]
};

export default MainRoutes;
