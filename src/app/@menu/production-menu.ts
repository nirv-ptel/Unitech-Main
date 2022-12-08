import { NbMenuItem } from "@nebular/theme";


export const PRODUCTION_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: false,
  },
  {
    title: 'Production',
    icon: 'edit-2-outline',
    children: [
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
  }]
