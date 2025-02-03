import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

interface SignUpParams {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
}

interface SignInParams {
    email: string;
    password: string;
}

const signUp = async ({ fullName, email, phoneNumber, password }: SignUpParams): Promise<string | void> => {
    if (!fullName || !email || !phoneNumber || !password) {
        Alert.alert('Error', 'Please enter all required data.');
        return;
    }

    try {
        const cred = await auth().createUserWithEmailAndPassword(email.trim(), password);
        const { uid } = cred.user;

        await auth().currentUser?.updateProfile({
            displayName: fullName,
        });

        return uid;
    } catch (error: any) {
        Alert.alert('Error', error.message);
    }
};

const signIn = async ({ email, password }: SignInParams): Promise<void> => {
    if (!email || !password) {
        Alert.alert('Error', 'Please enter all required data.');
        return;
    }

    try {
        await auth().signInWithEmailAndPassword(email.trim(), password);
        console.log('User UID:', auth().currentUser?.uid);
    } catch (error: any) {
        Alert.alert('Error', error.message);
    }
};

const signOut = async (): Promise<void> => {
    try {
        await auth().signOut();
    } catch (error: any) {
        Alert.alert('Error', error.message);
    }
};

const Auth = {
    signUp,
    signIn,
    signOut,
};

export default Auth;