export default {
  screens: {
    Tour: 'registration/:admin_id',
    ChooseOptionForAccount: 'connect/:shopid',
    AdminStack: {
      initialRouteName: 'BottomTabStack',
      screens: {
        Notifications: 'notifications/:id',
      },
    },
    NotFound: '*',
  },
};
