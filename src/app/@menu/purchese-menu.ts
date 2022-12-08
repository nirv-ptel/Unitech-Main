import { NbMenuItem } from "@nebular/theme";

export const PURCHESE_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: false,
  },
  {
    title: 'Purchase',
    icon: 'keypad-outline',
    hidden:false,
    children: [
      {
        title: 'Vender',
        children: [
          {
            title: 'Add Vender',
            link: '/pages/purchase/addvender',
          },
          {
            title: 'Vender Details',
            link: '/pages/purchase/venderdetails'
          },
        ]
      },
      {
        title: 'Item',
        children: [
          {
            title: 'Add Item',
            link: '/pages/purchase/additem',
            hidden:false,
          },
          {
            title: 'Item Details',
            link: '/pages/purchase/itemdetails'
          },
        ]
      },
      {
        title: 'Contract',
        children: [
          {
            title: 'Add Contract',
            link: '/pages/purchase/addcontract'
          },
          {
            title: 'Contract Details',
            link: '/pages/purchase/contractdetails'
          },
        ]
      },
      {
        title: 'Po',
        children: [
          {
            title: 'Add Po',
            link: '/pages/purchase/addpo'
          },
          {
            title: 'Po Details',
            link: '/pages/purchase/podetails'
          },
        ]
      },
      {
        title: 'Do',
        children: [
          {
            title: 'Add Do',
            link: '/pages/purchase/adddo'
          },
          {
            title: 'Do Details',
            link: '/pages/purchase/dodetails'
          },
        ]
      },
    ],
  },
]
