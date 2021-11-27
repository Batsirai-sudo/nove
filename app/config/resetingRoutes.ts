import { CommonActions, StackActions } from '@react-navigation/native';
import { ROUTES } from '@config';


export const resetToHome = (navigation, screen, params) => {
    const whichScreen = detemineWhichScreen(screen, params)
    navigation.dispatch(whichScreen);


}//          resetToHome(navigation,'AdminShopList')


const detemineWhichScreen = (screen, params) => {
    const home = { name: ROUTES.BottomTabStack }
    if (screen === 'RecordDeliveredDetails') {
        return CommonActions.reset({
            index: 1,
            routes: [home, { name: ROUTES.SuccessOrder, params }],
        })
    }
    if (screen === 'PreviewOrder') {
        return CommonActions.reset({
            index: 1,
            routes: [home, { name: ROUTES.SuccessOrder, params }],
        })
    }
}











        // return StackActions.replace(ROUTES.StoreManager)
// if (screen === 'Home') {
    //       CommonActions.reset({
    //     index: 1,
    //     routes: [{ name: ROUTES.BottomTabStack }, { name: ROUTES.OrderDetails }],
    //     // routes: [
    //     //     { name: 'Home' },
    //     //     {
    //     //         name: 'Profile',
    //     //         params: { user: 'jane' },
    //     //     },
    //     // ],
    // }),
    //     // return StackActions.replace(ROUTES.StoreManager)
    // }


    // dispatch(
            //   CommonActions.reset({
            //     index: 1,
            //     routes: [
            //       {
            //         name: ROUTES.SuccessOrder,
            //         params: {
            //           orderData: {
            //             orderType: order.type,
            //             orderNumber: orderNumber,
            //             amount: order.totalAmount,
            //           },
            //         },
            //       },
            //     ],
            //   }),
            // );

            // dispatch(
            //     CommonActions.reset({
            //       index: 1,
            //       routes: [
            //         {
            //           name: ROUTES.SuccessOrder,
            //           params: {
            //             orderData: {
            //               orderType: order.type,
            //               orderNumber: orderNumber,
            //               amount: order.totalAmount,
            //             },
            //           },
            //         },
            //       ],
            //     }),
            //   );



