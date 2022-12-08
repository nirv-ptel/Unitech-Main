import { NbMenuItem } from "@nebular/theme";

export const STORE_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: false,
  },
  // {
  //   title: 'FEATURES',
  //   group: false,
  // },
  {
    title: 'Store',
    icon: 'browser-outline',
    children: [
      {
        title: 'Product Category',
        link: '/pages/store/category',  
      },
      {
        title: 'Product Unit',
        link: '/pages/store/unit',
      },
      {
        title: 'Product Item',
        link: '/pages/store/item',
      },
      {
        title: 'Issue',
        link: '/pages/store/issue',
      },
      {
        title: 'Issue Report',
        link: '/pages/store/report',
      },
      {
        title: 'Indent',
        link: '/pages/store/indent',
      },
      {
        title: 'Po',
        link: '/pages/store/po',
      },
    ],
  },
]
