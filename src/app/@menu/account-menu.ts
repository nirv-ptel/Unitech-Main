import { NbMenuItem } from "@nebular/theme";

export const ACCOUNT_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: false,
  },

  {
    title: 'Store',
    icon: 'browser-outline',
    children: [
      {
        title: 'Po',
        link: '/pages/store/po',
      },
    ],
  },
]
