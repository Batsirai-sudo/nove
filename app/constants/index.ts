const shops = ['Tarven', 'Grocery', 'Wholesale', 'Hardware', 'Fashion', 'Food', 'Butchery', 'Gadgets', 'Electrical', 'Welding', 'Capentry']
const deliveries = ['Bulk Delivered Stock', 'Meat', 'Airtime', 'Drinks', 'Bread', 'Add new products']
// const airtime = ['Easy Airtime', 'Telkom', 'Cell C', 'MTN', 'Voldakom']
const airtime = ['Flash', 'Kazang']
const accounts = [{ type: 'Admin' }, { type: 'User', subType: [{ type: 'Worker' }, { type: 'Client' }] }]
const months = [
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
// <!-- android:src="@drawable/pic" -->
// <!--<?xml version="1.0" encoding="utf-8"?>-->

// <!--<bitmap xmlns:android="http://schemas.android.com/apk/res/android"-->
// <!--    android:src="@drawable/pic"-->
// <!--    />-->
const registrationDataFxn = () => {

    return {
        admin:
        {
            personal: {
                givenName: '',
                familyName: '',
                email: '',
                password: '',
                isSEO: '',
                fullName: '',
                account: '',
                // adminID: '',

            },
            additional: {
                mobileNumber: '',
                streetAddress: '',
                city: '',
                country: '',
                province: '',
                postalCode: '',
                suburb: ''
                // avatarUrl: '',
            },
            store: {
                name: '',
                email: '',
                mobileNumber: '',
                storeType: 'type',
                workers: 0,
                status: 'Active',

                // slogan: '',
                // logo: 'empty',
                address: {
                    streetAddress: '',
                    city: '',
                    country: '',
                    postalCode: '',
                    province: '',
                    suburb: '',
                },
                statistics: {
                    profits: 0,
                    losses: 0,
                    expenses: 0,
                },
            },
            // policy: {
            //     refundPolicy: '',
            //     cancellationReturnPolicy: '',
            //     policyLabel: '',
            // }
        },
        user: {
            personal: {
                givenName: '',
                familyName: '',
                email: '',
                password: '',
                fullName: '',
                account: '',
                // adminID: '',

            },
            additional: {
                mobileNumber: '',
                streetAddress: '',
                city: '',
                country: '',
                province: '',
                postalCode: '',
                // avatarUrl: '',
            },
            store: {
                myShops: [],
            },
        }
    }
}
const shopsCategory = () => {
    return shops
}
const accountsTypes = () => {
    return accounts
}
const getDeliveries = () => {
    return deliveries
}
const getAirtime = () => {
    return airtime.map(d => {
        return { value: d.toLowerCase(), name: d }
    })
}

const getMonths = () => {
    return months
}


export {
    registrationDataFxn,
    shopsCategory,
    accountsTypes,
    getDeliveries,
    getAirtime,
    getMonths
}


