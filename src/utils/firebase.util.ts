import auth from '@react-native-firebase/auth';

export const signUpWithEmailPassword = async (email: string, password: string) => {
    try {
        const user = await auth()
            .createUserWithEmailAndPassword(email, password);
        console.log('User account created & signed in!');
        return user;
    } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
        }
        console.error(error);
    }
}


export const signInWithEmailPassword = (email: string, password: string) => {
    auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User signed in!');
        })
        .catch(error => {
            console.error(error);
        });
}

export const signOut = () => {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
}