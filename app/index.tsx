import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { theme } from '~/src/theme/theme';

export default function SignInPage() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = () => {
    // Static navigation for presentation
    router.replace('/inside/(tabs)/home');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.pageContainer}>
      <Text style={styles.logo}>ligtascab.</Text>
      <Text style={styles.logoSmall}>for a safer tricycle commute.</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue your journey</Text>

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
          <View style={styles.inputContainer}>
            <MaterialIcons name="lock-outline" size={20} color={theme.colors.gray[400]} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={theme.colors.gray[500]}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don&apos;t have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/sign-up')}>
            <Text style={[styles.footerText, styles.linkText]}>Sign Up</Text>
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
    paddingTop: 150,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 240,
    gap: 20,
  },
  title: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: 36,
    color: theme.colors.gray[900],
    textAlign: 'center',
  },
  logo: {
    fontFamily: theme.typography.fontFamily.secondary.bold,
    color: theme.colors.primary[600],
    fontSize: 40,
    justifyContent: 'center',
    textAlign: 'center',
  },
  logoSmall: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    color: theme.colors.gray[900],
    fontSize: 10,
    justifyContent: 'center',
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
