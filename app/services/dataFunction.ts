// Recording Debt into the system
import moment from 'moment';

export const debts = (data, user) => {
    return {
        name: data.name,
        mobile: data.mobile,
        amount: data.amount,
        returnDate: data.returnDate,
        description: data.description,
        address: data.address,
        createdAt: new Date(),
        month: moment().format('MMMM'),
        metadata: {
            recordUser: {
                name: user.fullName,
                mobile: user.mobileNumber
            }
        }

    }

}
export const writeorder = (data, user) => {
    // return {
    //     ...order,
    //     createdAt: new Date(),
    //     orderNumber: orderNumber,
    //     invoice: uniqueid(10),
    //     userId: user.uid,
    //     fullName: user.fullName,
    //     mobile: user.mobileNumber,
    //     userCategory: user.userCategory,
    //     seen: false,
    //     status: 'Pending',
    //     orderType: order.type,
    //     adminID,
    //     month: moment().format('MMMM'),
    //     metadata: {
    //       adminID,
    //       adimFullName,
    //       shopID,
    //       storeType,
    //       shopName,
    //     },
    //   };
    // productsData: [...filteredData],
    // totalItems,
    // totalAmount,
    // type: 'Stock',
    // admin: {
    //   adminID: user.account === 'Admin' ? user.uid : user.adminID,
    //   fullName: '',
    // },
    // shop: {
    //   shopID: user.myShops[0].id,
    //   name: user.myShops[0].name,
    //   storeType: '',
    // },

}

