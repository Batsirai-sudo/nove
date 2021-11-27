import moment from 'moment';
import { getDeliveries } from '@constants';
import firestore from '@react-native-firebase/firestore';



const dailyDeliveries = [1, 2, 3, 4]
const weeklyDeliveries = [0, 5]

const GenerateProfit = (orderData, profit) => {


    const profits = {
        month: orderData.month,
        overalProfit: profit,
        data: determineDeleveryType(orderData, profit)
    }
    // if (orderData.weekStatus === 'weekChanged') {


    //     profits = {
    //         month: orderData.month,
    //         week,
    //         overalProfit: getOveralProfit(),
    //         fromDate: firstDayOfWeek,
    //         toDate: lastDayOfWeek,
    //         data: determineDeleveryType(orderData),
    //         losses: 0,
    //         expenses: 0


    //     }
    // }



    return profits
}

const determineDeleveryType = (orderData, profit) => {


    if (deliveries('daily').includes(orderData.type)) {

        return {
            dailyDeliveries: [
                {
                    createdAt: orderData.createdAt,
                    deliveryNumber: orderData.deliveryNumber,
                    invoice: orderData.invoice,
                    fullName: orderData.fullName,
                    userCategory: orderData.userCategory,
                    type: orderData.type,
                    totalBuyingAmount: orderData.statistics.totalBuyingAmount,
                    totalSellingAmount: orderData.statistics.totalSellingAmount,
                    totalItems: orderData.statistics.totalItems,
                    profit,
                    deliveryType: 'daily'

                }
            ],
            deliveryType: 'daily'

        }

    }

    if (deliveries('weekly').includes(orderData.type)) {
        return {
            weeklyDeliveries: [
                {
                    createdAt: orderData.createdAt,
                    deliveryNumber: orderData.deliveryNumber,
                    invoice: orderData.invoice,
                    fullName: orderData.fullName,
                    userCategory: orderData.userCategory,
                    type: orderData.type,
                    totalBuyingAmount: orderData.statistics.totalBuyingAmount,
                    totalSellingAmount: orderData.statistics.totalSellingAmount,
                    totalItems: orderData.statistics.totalItems,
                    profit,
                    deliveryType: 'weekly'

                }
            ],
            deliveryType: 'weekly'

        }
    }


}

const getOveralProfit = (orderData) => {


    return 25
}


const deliveries = (type) => {

    if (type === 'daily') {
        return dailyDeliveries.map(d => {
            return getDeliveries()[d]

        })
    }
    if (type === 'weekly') {
        return weeklyDeliveries.map(d => {
            return getDeliveries()[d]

        })
    }

}

export default GenerateProfit

export const checkWhichWeek = async (checkWeek, id) => {

    await checkWeek().then(async (res) => {
        const firstday = moment(res.mondayCreatedAt.toDate());
        const today = moment();
        const weekValue = today.diff(firstday, 'weeks')
        // const getTodayDate = moment().format('D dddd MMMM YYYY hh:mm a')
        // const getDatabaseDate = moment(res.currentWeekFirstDay.toDate().setHours(-24, 0, 0, 0)).format('D dddd MMMM YYYYY hh:mm a')
        // const getDatabaseDate2 = moment(res.currentWeekFirstDay.toDate()).format('D dddd MMMM YYYYY hh:mm a')

        // console.log(getDatabaseDate)
        // console.log(getDatabaseDate2)
        // console.log(typeof +getDatabaseDate)
        // console.log(getDatabaseDate)

        if (weekValue === res.weekNumber) {


        }
        else {
            const ref = firestore().collection('Shops').doc(id);

            const response = await ref.collection('ProfitsHistory')
                .where('recent', '==', 'now')
                .orderBy('createdAt', 'desc')
                .limit(1)
                .get()

            if (response.docs.length > 0) {

                ref.collection('ProfitsHistory')
                    .doc(response.docs[0].id)
                    .update({ recent: 'passed' })
                const result = calculateTime()
                await ref.collection('ProfitsHistory').add({
                    month: moment().format('MMMM'),
                    week: weekValue,
                    fromDate: result.firstDayOfWeek,
                    toDate: result.lastDayOfWeek,
                    losses: 0,
                    expenses: 0,
                    createdAt: new Date(),
                    recent: '',
                    records: 0
                })

                await ref.set({
                    weekNumber: weekValue,
                    currentWeekFirstDay: result.firstDayOfWeek,
                    currentWeekLastDay: result.lastDayOfWeek,
                    'statistics.profits': 0,
                    'statistics.losses': 0,
                    'statistics.expenses': 0,
                }, { merge: true })


            } else {
                const result = calculateTime()
                await ref.collection('ProfitsHistory').add({
                    month: moment().format('MMMM'),
                    week: weekValue,
                    fromDate: result.firstDayOfWeek,
                    toDate: result.lastDayOfWeek,
                    losses: 0,
                    expenses: 0,
                    createdAt: new Date(),
                    recent: '',
                    records: 0
                })

                await ref.set({
                    weekNumber: weekValue,
                    currentWeekFirstDay: result.firstDayOfWeek,
                    currentWeekLastDay: result.lastDayOfWeek,
                    'statistics.profits': 0,
                    'statistics.losses': 0,
                    'statistics.expenses': 0,
                }, { merge: true })

            }


        }
    })
    return true
}


const calculateTime = () => {
    //     const week = moment().week();
    // const firstDayOfWeek = moment().week(week - 1)
    // const lastDayOfWeek = moment().week(week)

    return {
        firstDayOfWeek: new Date(moment().weekday(1)),
        lastDayOfWeek: new Date(moment(moment().weekday(1)).add(7, 'days'))
    }
}
