import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { theme } from '../utils/theme';

export default function SignUpPage() {
  const [mobileNumber, setMobileNumber] = useState('');
  const router = useRouter();

  const handleSendOtp = () => {
    // Static navigation for presentation
    router.push({ pathname: '/verify-otp', params: { mobileNumber } });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.pageContainer}>
      <Stack.Screen options={{ title: 'Sign Up', headerBackTitle: 'Back' }} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Enter your mobile number to get started</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="phone-iphone" size={20} color={theme.colors.gray[400]} />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              placeholderTextColor={theme.colors.gray[500]}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 24,
  },
  title: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: 36,
    color: theme.colors.gray[900],
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.gray[600],
    textAlign: 'center',
    marginTop: -16,
  },
  formContainer: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[100],
    borderRadius: 10,
    paddingHorizontal: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[800],
  },
  button: {
    backgroundColor: theme.colors.primary[600],
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.white,
  },
});