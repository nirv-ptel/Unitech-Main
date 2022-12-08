import { NbMenuItem } from "@nebular/theme";

export const HR_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: false,
  },
  {
    title: 'HR',
    icon: 'layout-outline',
    children: [
      {
        title: 'Add User',
        link: '/pages/user/user/user',
      },
      {
        title: 'View User',
        link: '/pages/user/user/userdetails',
      },
    ],
  },
]
