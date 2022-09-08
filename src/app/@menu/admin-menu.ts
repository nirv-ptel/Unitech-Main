import { NbMenuItem } from "@nebular/theme";
import decode from 'jwt-decode';

// const roles = [1, 2, 3, 4, 5, 6, 7];
// const token = localStorage.getItem('token');
// let tokenPayload: any = [];
// if (token) {
//   tokenPayload = decode(token);
// }
export const ADMIN_MENU_ITEMS: NbMenuItem[] = [
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
    title: 'HR',
    icon: 'layout-outline',
    children: [
      {
        title: 'Role',
        link: '/pages/user/role',
      },
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
  {
    title: 'Purchase',
    icon: 'keypad-outline',
    hidden: false,
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
            hidden: false,
          },
          {
            title: 'Item Details',
            link: '/pages/purchase/itemdetails'
          },
        ]
      },
      {
        title: 'Contract',
        // link: '/pages/purchase/purchasedetails',
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
        // link: '/pages/purchase/addpurchase',
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
        // link: '/pages/purchase/purchasedetails',
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
  {
    title: 'Production',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Add Machine',
        link: '/pages/production/addmachine',
      },
      {
        title: 'Departments',
        children: [
          {
            title: 'Prepratery',
            children: [
              {
                title: 'Bloow Room',
                link: '/pages/production/prepratery/bloowroom',

              },
              {
                title: 'Carding',
                link: '/pages/production/prepratery/carding',

              },
              {
                title: 'Draw Frames',
                link: '/pages/production/prepratery/drawframes',

              },
              {
                title: 'Finisher',
                link: '/pages/production/prepratery/finisher',

              },
              {
                title: 'Speed frame',
                link: '/pages/production/prepratery/simplex',

              },
            ]
          },
          {
            title: 'Combers',
            link: '/pages/production/combers',
          },
          {
            title: 'Lap Former',
            link: '/pages/production/lapformer',
          },
          {
            title: 'Ring Frame',
            link: '/pages/production/ringframe',
          },
          {
            title: 'Winding',
            link: '/pages/production/winding',

          },
          {
            title: 'Packing',
            link: '/pages/production/packing',

          },
          {
            title: 'Utility',
            link: '/pages/production/utility',

          },
          {
            title: 'Waste Room',
            link: '/pages/production/wasteroom',

          },

        ]
      },
    ],
  },
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
