import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import { IItem } from '../types/item.type';

export const signInWithGoogle = async () => {
    try {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    } catch (error) {
        console.error("Google Sign-In Error", error);
    }
}

export const signUpWithEmailPassword = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
        // Create the user with email and password
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);

        // Get the user's reference
        const user = userCredential.user;

        // Update the user's profile with first and last name
        await user.updateProfile({
            displayName: `${firstName} ${lastName}`,
        });
        // return user;
        signInWithEmailPassword(email, password)
    } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
            console.error('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
            console.error('That email address is invalid!');
        }
        console.error(error);
    }
}


export const signInWithEmailPassword = (email: string, password: string) => {
    auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            const user = auth().currentUser;
            if (user) {
                return user.uid; // This is the user's unique ID
            } else {
                // Handle the case where there is no signed-in user
                return null;
            }
        })
        .catch(error => {
            console.error(error);
        });
}

export const signOut = () => {
    auth()
        .signOut()
        .then(() => { });
}

export const getFavoritesFromFirebase = async (userId: string) => {
    try {
        // Reference to the user's document in the Firestore collection
        const userRef = firestore().collection('users').doc(userId);

        // Get the user's document
        const doc = await userRef.get();

        if (doc.exists) {
            // Extract the favorites data from the document
            const userData = doc.data();
            return userData ? userData.favorites : [];
        } else {
            console.log('No such document!');
            return [];
        }
    } catch (error) {
        console.error('Error getting favorites from Firebase', error);
        return [];
    }
};

export const saveFavoritesToFirebase = async (userId: string, favoriteItem: IItem) => {
    try {
        // Reference to the user's document in the Firestore collection
        const userRef = firestore().collection('users').doc(userId);

        // Add the new favorite item to the favorites array
        await userRef.update({
            favorites: firestore.FieldValue.arrayUnion(favoriteItem)
        });

        console.log('Favorite item added to Firebase');
    } catch (error) {
        console.error('Error adding favorite item to Firebase', error);
    }
};

export const removeFavoriteFromFirebase = async (userId: string, favoriteItem: IItem) => {
    try {
        // Reference to the user's document in the Firestore collection
        const userRef = firestore().collection('users').doc(userId);

        // Remove the favorite item from the favorites array
        await userRef.update({
            favorites: firestore.FieldValue.arrayRemove(favoriteItem)
        });

        console.log('Favorite item removed from Firebase');
    } catch (error) {
        console.error('Error removing favorite item from Firebase', error);
    }
};

