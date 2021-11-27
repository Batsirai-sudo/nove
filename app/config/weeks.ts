import moment from 'moment';

export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
/*
     LoopThroughMonths()[0].weekDates.map((d) => {
      console.log(
        'monday  ------->',
        moment(d.monday).format('dddd D MMMM YYYY'),
      );
      console.log(
        'sunday  ------->',
        moment(d.sunday).format('dddd D MMMM YYYY'),
      );
    });
    */
export const LoopThroughMonths = () => {

    const newList = months.map((v, i) => {

        return {
            name: v,
            weekDates: gettingMondays(v, i)
        }

    })

    return newList
}
const gettingMondays = (v, i) => {
    const whichMonth = 1 + i
    const daysInMonth = moment(`${moment().year()}-0${whichMonth}`).daysInMonth()
    // const todayNumericNumber = +moment().format('DD')
    const firtMondayOftheMonth = moment().year(moment().year()).month(i).date(1).day(8)
    const firtSundayOftheMonth = moment().year(moment().year()).month(i).date(1).day(7)
    // const getNumericOfFirstMonday = +moment(firtMondayOftheMonth).format('DD')
    const remaingDaysTofinishMonthFromFirstMonday = daysInMonth
    const weekDaysArray = []
    let counter = 1
    Array.from({ length: +parseInt(remaingDaysTofinishMonthFromFirstMonday / 7) + 1 }).map((d) => {
        if (counter === 1) {
            weekDaysArray.push({
                monday: firtMondayOftheMonth.add(0, 'days').format('dddd D MMMM YYYY'),
                sunday: firtSundayOftheMonth.add(7, 'days').format('dddd D MMMM YYYY')
            })
        } else {
            weekDaysArray.push({
                monday: firtMondayOftheMonth.add(7, 'days').format('dddd D MMMM YYYY'),
                sunday: firtSundayOftheMonth.add(7, 'days').format('dddd D MMMM YYYY')
            })
        }
        counter++
    })

    return weekDaysArray

}
















// 1

// The solution is to use Date.now(). Stop using timestamp service from Firebase, you need to work with the numerical value of the time in milliseconds like for example: 1514271367000, instead if Firestore uses 26/12/2017 1:56:07 GMT- 0500 (-05) will not work. An example of a query is:

// this.fsService.afs.collection('chats/4bY1ZpOr1TPq8bFQ3bjS/finance/123+finance/12345'
//           , ref => ref.orderBy('hour').startAt(1514184967000).endAt(1514271367000))
//           .valueChanges().subscribe(data =>{
//             this.mensajes = data;
//           })


//           Since I have the dueDate field stored as "timestamp" (and NOT as string or number) on Cloud Firestore, I did this to get the invoice documents with a due date on 2017:

// let start = new Date('2017-01-01');
// let end = new Date('2018-01-01');

// this.afs.collection('invoices', ref => ref
//   .where('dueDate', '>', start)
//   .where('dueDate', '<', end)
// );


// These return documents as expected:

// var today = new Date();
// db.collection("****").where('display', '==', true).where('createdAt', '>', today).get().then(function(querySnapshot) {
// and

// var today = new Date();
// db.collection("****").where('display', '==', true).where('createdAt', '<', today).get().then(function(querySnapshot) {
// These don't return anything:

// var today = new Date()-604800000;
// db.collection("****").where('display', '==', true).where('createdAt', '>', today).get().then(function(querySnapshot) {
// and

// var today = new Date();
// db.collection("****").where('display', '==', true).where('createdAt', '>', today-604800000).get().then(function(querySnapshot) {
// and just for the heck of it

// var today = new Date()-1;
// db.collection("****").where('display', '==', true).where('createdAt', '>', today).get().then(function(querySnapshot) {


//     EDIT TO SHOW NEXT ATTEMPT:

// var config = {****};
// firebase.initializeApp(config);

// const db = firebase.firestore();
// const settings = {/* your settings... */ timestampsInSnapshots: true};
// db.settings(settings);

// var today = new Date();
// var yesterday = date.setDate(today.getDate() - 1);
// db.collection("****")
//     .where('display', '==', true)
//     .where('createdAt', '>', yesterday)
//     .get()
//     .then(function(querySnapshot) {console.log(createdAt)});

//     Ok. So I got some assistance from a very helpful Google developer.

// This ended up working.

// var beginningDate = Date.now() - 604800000;
// var beginningDateObject = new Date(beginningDate);

// db.collection("****")
//     .where('display', '==', true)
//     .where('createdAt', '>', beginningDateObject)
//     .get()
//     .then(function(querySnapshot) {console.log(/* ... */)});



//     let start = new Date('2017-01-01');

// Query query = firestoreInstance.collection(TABLE_KEY_ALL_DATA).orderBy("docDob").startAt(start)




