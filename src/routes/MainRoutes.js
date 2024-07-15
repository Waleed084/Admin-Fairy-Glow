import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// Payment routing
const TraningBonus = Loadable(lazy(() => import('views/pages/TrainingBonus')));
const Invest = Loadable(lazy(() => import('views/pages/Invest')));
const WithDraw = Loadable(lazy(() => import('views/pages/WithDraw')));
const MoneyTransfer = Loadable(lazy(() => import('views/pages/MoneyTransfer')));
// Transaction routing
const AllTransaction = Loadable(lazy(() => import('views/utilities/AllTransaction')));
const DepositHistory = Loadable(lazy(() => import('views/utilities/DepositHistory')));
const WithdrawHistory = Loadable(lazy(() => import('views/utilities/WithdrawHistory')));
const TrainingBonusHistory = Loadable(lazy(() => import('views/utilities/TrainingBonusHistory')));
const InvestmentHistory = Loadable(lazy(() => import('views/utilities/InvestmentHistory')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

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
      path: 'Transactions',
      children: [
        {
          path: 'all-transactions',
          element: <AllTransaction />
        }
      ]
    },
    {
      path: 'Transactions',
      children: [
        {
          path: 'deposit-history',
          element: <DepositHistory />
        }
      ]
    },
    {
      path: 'Transactions',
      children: [
        {
          path: 'withdraw-history',
          element: <WithdrawHistory />
        }
      ]
    },
    {
      path: 'Transactions',
      children: [
        {
          path: 'training-bonus-history',
          element: <TrainingBonusHistory />
        }
      ]
    },
    {
      path: 'Transactions',
      children: [
        {
          path: 'investment-history',
          element: <InvestmentHistory />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'payments',
      children: [
        {
          path: 'training-bonus',
          element: <TraningBonus />
        },
        {
          path: 'invest',
          element: <Invest />
        },
        {
          path: 'withdraw',
          element: <WithDraw />
        },
        {
          path: 'money-transfer',
          element: <MoneyTransfer />
        }
      ]
    }
  ]
};

export default MainRoutes;
