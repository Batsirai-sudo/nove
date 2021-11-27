import auth from '@react-native-firebase/auth';


export default async (email) => {
    const res = await auth()
        .fetchSignInMethodsForEmail(email)

    if (res.length) {
        return true
    } else {
        return false
    }
}








