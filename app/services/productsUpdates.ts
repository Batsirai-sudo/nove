// import firestore from '@react-native-firebase/firestore';

export const createProductUpdates = async (ref, id, type) => {

    // Creating products updates with ids
    if (type === 'added') {
        ref.collection('Upadtes').add({
            id: id,
            type,
            whoUpdated: [],
            howManyUpdated: 0,
            date: new Date(),
        })
    }

}