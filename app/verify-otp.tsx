import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
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

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState('');
  const { mobileNumber } = useLocalSearchParams();
  const router = useRouter();

  const handleVerify = () => {
    // Navigate to the complete profile screen after verification
    router.replace({ pathname: '/complete-profile', params: { mobileNumber } });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.pageContainer}>
      <Stack.Screen options={{ title: 'Verify Number', headerBackTitle: 'Back' }} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>
          A 6-digit code has been sent to {'\n'}
          {mobileNumber}
        </Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.otpInput}
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>Verify & Proceed</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Didn't receive the code? </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={[styles.footerText, styles.linkText]}>Resend</Text>
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
    lineHeight: 24,
  },
  formContainer: {
    gap: 16,
    alignItems: 'center',
  },
  otpInput: {
    width: '80%',
    height: 60,
    backgroundColor: theme.colors.gray[100],
    borderRadius: 10,
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: 28,
    letterSpacing: 10,
    color: theme.colors.gray[800],
  },
  button: {
    backgroundColor: theme.colors.primary[600],
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  buttonText: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.white,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[600],
  },
  linkText: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    color: theme.colors.primary[600],
  },
});