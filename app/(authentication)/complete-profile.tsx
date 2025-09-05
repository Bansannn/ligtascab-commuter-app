import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { theme } from '~/src/theme/theme';

const ProfileInput = ({
  label,
  icon,
  value,
  onChangeText,
  ...props
}: {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  value: string;
  onChangeText: (text: string) => void;
  [key: string]: any;
}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
      <MaterialIcons name={icon} size={20} color={theme.colors.gray[400]} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.gray[500]}
        {...props}
      />
    </View>
  </View>
);

export default function CompleteProfilePage() {
  const router = useRouter();
  const { mobileNumber } = useLocalSearchParams();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCompleteSignUp = () => {
    // Add validation (e.g., check if passwords match)
    // For presentation, we navigate directly
    router.replace('/inside/(tabs)/home');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.pageContainer}>
      <Stack.Screen options={{ title: 'Your Details', headerBackVisible: false }} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Almost there!</Text>
        <Text style={styles.subtitle}>Complete your profile to finish signing up.</Text>

        <View style={styles.formContainer}>
          <ProfileInput
            label="Full Name"
            icon="person-outline"
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
          />
          <ProfileInput
            label="Address"
            icon="home"
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
          />
          <ProfileInput
            label="Email Address"
            icon="mail-outline"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          <ProfileInput
            label="Password"
            icon="lock-outline"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry
          />
          <ProfileInput
            label="Confirm Password"
            icon="lock-outline"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleCompleteSignUp}>
            <Text style={styles.buttonText}>Complete Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  scrollContainer: {
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
  inputGroup: {
    gap: 6,
  },
  label: {
    fontFamily: theme.typography.fontFamily.primary.medium,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[700],
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
