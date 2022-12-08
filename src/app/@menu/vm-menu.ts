import { NbMenuItem } from "@nebular/theme";

export const VM_MENU_ITEMS: NbMenuItem[] = [
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
        title: 'Product Item',
        link: '/pages/store/item',
      },
      {
        title: 'Indent',
        link: '/pages/store/indent',
      },
    ],
  },
]
