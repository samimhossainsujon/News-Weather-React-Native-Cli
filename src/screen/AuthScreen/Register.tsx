import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Auth from '../../Firebase/auth'; // Ensure this path is correct

interface FormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
}

const Register = () => {
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            const { fullName, email, phoneNumber, password } = data;

            // Call the signUp function from the Auth module
            const uid = await Auth.signUp({ fullName, email, phoneNumber, password });

            if (uid) {
                Alert.alert('Registration Successful', `Welcome, ${fullName}!`);
                // Navigate to the Login screen after successful registration
                navigation.navigate('Login' as never);
            }
        } catch (error: any) {
            // Handle errors from Firebase or other issues
            Alert.alert('Error', error.message || 'Failed to register. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            {/* Full Name Input */}
            <Controller
                control={control}
                rules={{
                    required: 'Full Name is required',
                    minLength: {
                        value: 3,
                        message: 'Name must be at least 3 characters long',
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor="#aaa"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="fullName"
            />
            {errors.fullName && <Text style={styles.error}>{errors.fullName.message}</Text>}

            {/* Email Input */}
            <Controller
                control={control}
                rules={{
                    required: 'Email is required',
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email address',
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#aaa"
                        keyboardType="email-address"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="email"
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

            {/* Phone Number Input */}
            <Controller
                control={control}
                rules={{
                    required: 'Phone Number is required',
                    pattern: {
                        value: /^(?:\+?88)?01[3-9]\d{8}$/,
                        message: 'Enter a valid Bangladeshi phone number',
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        placeholderTextColor="#aaa"
                        keyboardType="phone-pad"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="phoneNumber"
            />
            {errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber.message}</Text>}

            {/* Password Input */}
            <Controller
                control={control}
                rules={{
                    required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#aaa"
                        secureTextEntry
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="password"
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

            {/* Register Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
                <Text style={styles.loginText}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginText: {
        marginTop: 20,
        color: '#007bff',
        fontSize: 16,
    },
});