import storage from '@react-native-firebase/storage';


export default async (file, rootD) => {

    return new Promise(async (resolve, reject) => {

        try {
            const storageRef = storage()
                .ref(rootD)
                .child('image' + ' ' + new Date().getTime());
            const task = storageRef.putFile(file).then(() => {
                storageRef.getDownloadURL().then((downloadedUrl) => {
                    resolve(downloadedUrl);
                });
            })
        } catch (error) {
            reject(error);
        }
    });

}

