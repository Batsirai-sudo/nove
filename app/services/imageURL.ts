import storage from '@react-native-firebase/storage';


const getImageUri = async (photoURI, productName, folder) => {

    const name = productName + '-' + new Date().getTime() + '/' + new Date()
    const storageRef = storage().ref(folder).child(name);

    const task = await storageRef.putFile(photoURI)
    const downloadedUrl = await storageRef.getDownloadURL()
    return downloadedUrl

};

export default getImageUri