import { uniqueid, determineWhichNumber } from '@config';
import moment from 'moment';

// import Realm from "realm";

// const SellsSchema = {
//     name: "Sells",
//     properties: {
//         _id: "int",
//         products: "string",
//         status: "string?",
//     },
//     // primaryKey: "_id",
// };
/**
 * 
 * @param data What i nedd to get to record an invoice 
 * 1) Payment Method
 * 2) Payment Status
 * 
 * 3) Shop Name
 * 4) Shop ID
 * 5) Shop Number
 * 
 * 6) Total Amount
 * 7) Amount paid
 * 8) Change 
 * 
 * 9) Sale Number
 * 10) Invoice Number
 * 11) Date
 * 
 * 11) User Name
 * 12) User ID
 * 13) User Mobile
 * 
 * 14) Total Items
 * 15) Items
 */

export const recordSellsForCash = (data, recordShopSells) => {

    // Products in current cart shop
    const sellData = {
        items: data.data,
        totalAmount: data.totalAmount,
        totalItems: data.totalItems,
        change: data.change,
        totalAmount2: data.totalAmount2,
        enteredAmountByCashier: data.enterAmountValue,
        paymentMethod: data.paymentMethod,
        user: {
            name: data.user.fullName,
            id: data.user.uid, mobile: data.user.mobileNumber
        },
        createdAt: new Date(),
        invoice: uniqueid(10),
        saleNumber: `${moment().format('YYYY')}-${moment().month()}-${data.shop.weekNumber}/${uniqueid(5, true)}`,
        paymentStatus: 'Approved',
    }

    const topLevelData = {
        day: moment().format('dddd'),
        todayTotalAmount: determineWhichNumber(data.totalAmount).value,
        todayTotalItems: determineWhichNumber(data.totalItems).value,
        shop: {
            name: data.shop.name,
            id: data.shop.id
        },
        month: moment().format('MMMM'),
        createdAt: new Date(),
        lastUpdatedAt: new Date()

    }
   recordShopSells(sellData, topLevelData)
}

     //
/**
 *  key: keyGenerator(20),
          mass: '',
          name: 'Custom Amount',
          productTotalAmount: determineWhichNumber(value).value,
          quantity: 1,
          salePrice: determineWhichNumber(value).value,
 */



    // currentCart.totalAmount
    // currentCart.totalItems
    // currentCart.change 
    // currentCart.shop
    // currentCart.totalAmount2 
    // currentCart.enterAmountValue
    // currentCart.paymentMethod
    // currentCart.user