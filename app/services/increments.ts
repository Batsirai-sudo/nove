import firebase from '@react-native-firebase/app';

// Incrementing number of products in a shop
export const increamentProducts = async (value, ref, type) => {

    const result = await firebaseFieldValue(value, type)
    return await ref.update({ products: result })

};

const firebaseFieldValue = async (value, type) => {
    return type === 'increment'
        ? firebase.firestore.FieldValue.increment(value)
        : firebase.firestore.FieldValue.increment(-value)
}














    // const increment = firebase.firestore.FieldValue.increment(parseInt(value));
    // const decrementProfits = firebase.firestore.FieldValue.increment(
    //   -parseInt(value),
    // );
    // return {
    //   increment,
    //   profits: decrementProfits,
    // };