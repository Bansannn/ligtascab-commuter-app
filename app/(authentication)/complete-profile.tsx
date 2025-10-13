import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import z from 'zod';
import { registerWithCredentials } from '~/src/services/authentication';
import { theme } from '~/src/theme/theme';
import { RegisterSchema } from '~/src/utils/schemas';

const ProfileInput = ({
  label,
  icon,
  value,
  onChange,
  placeholder,
  secureTextEntry,
  keyboardType,
}: {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
      <MaterialIcons name={icon} size={20} color={theme.colors.gray[400]} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.gray[500]}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  </View>
);

export default function CompleteProfilePage() {
  const [loading, setLoading] = useState(false);
  const { mobileNumber } = useLocalSearchParams();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    defaultValues: {
      name: '',
      phone: mobileNumber as string,
      address: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    try {
      const commuter = await registerWithCredentials(data);
      console.log(commuter);
      if (commuter) {
        router.push('/(private)/(tabs)/home');
      }
    } catch (error) {
      console.log(error);
      console.error(error);
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
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
          <Controller
            control={control}
            name="name"
            rules={{ required: 'Full name is required' }}
            render={({ field: { value, onChange } }) => (
              <>
                <ProfileInput
                  label="Full Name"
                  icon="person-outline"
                  value={value}
                  onChange={onChange}
                  placeholder="Enter your full name"
                />
                {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
              </>
            )}
          />

          <Controller
            control={control}
            name="address"
            rules={{ required: 'Address is required' }}
            render={({ field: { value, onChange } }) => (
              <>
                <ProfileInput
                  label="Address"
                  icon="home"
                  value={value}
                  onChange={onChange}
                  placeholder="Enter your address"
                />
                {errors.address && <Text style={styles.error}>{errors.address.message}</Text>}
              </>
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
            }}
            render={({ field: { value, onChange } }) => (
              <>
                <ProfileInput
                  label="Email Address"
                  icon="mail-outline"
                  value={value}
                  onChange={onChange}
                  placeholder="Enter your email"
                />
                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
              </>
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            }}
            render={({ field: { value, onChange } }) => (
              <>
                <ProfileInput
                  label="Password"
                  icon="lock-outline"
                  value={value}
                  onChange={onChange}
                  placeholder="Create a password"
                  secureTextEntry
                />
                {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
              </>
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            rules={{
              required: 'Please confirm your password',
              validate: (value) => value === password || 'Passwords do not match',
            }}
            render={({ field: { value, onChange } }) => (
              <>
                <ProfileInput
                  label="Confirm Password"
                  icon="lock-outline"
                  value={value}
                  onChange={onChange}
                  placeholder="Confirm your password"
                  secureTextEntry
                />
                {errors.confirm_password && (
                  <Text style={styles.error}>{errors.confirm_password.message}</Text>
                )}
              </>
            )}
          />

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <Text style={styles.buttonText}>Complete Sign Up</Text>
            )}
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
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
  },
});
