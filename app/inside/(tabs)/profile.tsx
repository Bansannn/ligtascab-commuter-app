import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { theme } from '../../../utils/theme';

const ProfileInput = ({
  label,
  icon,
  value,
  onChangeText,
  editable = true,
  ...props
}: {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean;
  [key: string]: any;
}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <View style={[styles.inputContainer, !editable && styles.inputContainerDisabled]}>
      <MaterialIcons name={icon} size={20} color={theme.colors.gray[400]} />
      <TextInput
        style={[styles.input, !editable && styles.inputDisabled]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.gray[400]}
        editable={editable}
        {...props}
      />
    </View>
  </View>
);

const NotificationToggle = ({
  label,
  value,
  onValueChange,
  disabled,
}: {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled: boolean;
}) => (
  <View style={[styles.toggleRow, disabled && styles.inputContainerDisabled]}>
    <Text style={[styles.toggleLabel, disabled && styles.inputDisabled]}>{label}</Text>
    <Switch
      trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary[300] }}
      thumbColor={value ? theme.colors.primary[600] : theme.colors.gray[500]}
      onValueChange={onValueChange}
      value={value}
      disabled={disabled}
    />
  </View>
);

export default function ProfilePage() {
  // Store initial state to handle cancellation
  const initialData = {
    name: 'Vincent Olpate',
    address: 'Camaligan',
    email: 'vincent.olpate@unc.edu.ph',
    phone: '09123456789',
    pushEnabled: true,
    emailEnabled: false,
  };

  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [name, setName] = useState(initialData.name);
  const [address, setAddress] = useState(initialData.address);
  const [email, setEmail] = useState(initialData.email);
  const [phone, setPhone] = useState(initialData.phone);
  const [pushEnabled, setPushEnabled] = useState(initialData.pushEnabled);
  const [emailEnabled, setEmailEnabled] = useState(initialData.emailEnabled);

  const handleSaveChanges = () => {
    // In a real app, you would save this data to a backend or local storage
    console.log({ name, address, email, phone, pushEnabled, emailEnabled });
    Alert.alert('Profile Saved', 'Your changes have been saved successfully.');
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Revert changes to initial state
    setName(initialData.name);
    setAddress(initialData.address);
    setEmail(initialData.email);
    setPhone(initialData.phone);
    setPushEnabled(initialData.pushEnabled);
    setEmailEnabled(initialData.emailEnabled);
    setIsEditing(false);
  };

  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>My Profile</Text>
          {!isEditing ? (
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <MaterialIcons name="edit" size={18} color={theme.colors.primary[600]} />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Personal Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <ProfileInput
            label="Full Name"
            icon="person-outline"
            value={name}
            onChangeText={setName}
            editable={isEditing}
          />
          <ProfileInput
            label="Address"
            icon="home"
            value={address}
            onChangeText={setAddress}
            editable={isEditing}
          />
          <ProfileInput
            label="Email Address"
            icon="mail-outline"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={isEditing}
          />
          <ProfileInput
            label="Phone Number"
            icon="phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            editable={isEditing}
          />
        </View>

        {/* Notification Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Preferences</Text>
          <NotificationToggle
            label="Push Notifications"
            value={pushEnabled}
            onValueChange={setPushEnabled}
            disabled={!isEditing}
          />
          <NotificationToggle
            label="Email Notifications"
            value={emailEnabled}
            onValueChange={setEmailEnabled}
            disabled={!isEditing}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: theme.colors.gray[100],
  },
  scrollContainer: {
    padding: 16,
    paddingTop: 60,
    gap: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: 32,
    color: theme.colors.gray[900],
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary[100],
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  editButtonText: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.primary[600],
  },
  saveButton: {
    backgroundColor: theme.colors.primary[600],
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveButtonText: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.white,
  },
  cancelButton: {
    backgroundColor: theme.colors.gray[200],
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[700],
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.gray[800],
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
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  inputContainerDisabled: {
    backgroundColor: theme.colors.gray[100],
  },
  input: {
    flex: 1,
    height: 50,
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[800],
  },
  inputDisabled: {
    color: theme.colors.gray[500],
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  toggleLabel: {
    fontFamily: theme.typography.fontFamily.primary.medium,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[800],
  },
});