import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

interface EmergencyModalProps {
  visible: boolean;
  onClose: () => void;
}

const emergencyContacts = [
  { name: 'Jane Doe', relation: 'Mother' },
  { name: 'John Smith', relation: 'Friend' },
];

export default function EmergencyModal({ visible, onClose }: EmergencyModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Feather name="alert-triangle" size={48} color={theme.colors.danger} />
            <Text style={styles.title}>EMERGENCY ACTIVATED</Text>
          </View>
          <Text style={styles.message}>
            Your emergency alert has been sent. Local authorities and your emergency contacts have been notified of your location and ride details.
          </Text>
          <View style={styles.contactsSection}>
            <Text style={styles.contactsTitle}>Notified Contacts:</Text>
            {emergencyContacts.map((contact, index) => (
              <View key={index} style={styles.contactRow}>
                <MaterialIcons name="person" size={20} color={theme.colors.gray[600]} />
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactRelation}>({contact.relation})</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.safeButton} onPress={onClose}>
            <Text style={styles.safeButtonText}>I'm Safe Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    gap: 20,
  },
  header: {
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: 26,
    color: theme.colors.danger,
    textAlign: 'center',
  },
  message: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[700],
    textAlign: 'center',
    lineHeight: 22,
  },
  contactsSection: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
    paddingTop: 16,
    gap: 10,
  },
  contactsTitle: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.gray[800],
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactName: {
    fontFamily: theme.typography.fontFamily.primary.medium,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[900],
  },
  contactRelation: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[600],
  },
  safeButton: {
    width: '100%',
    backgroundColor: theme.colors.primary[600],
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  safeButtonText: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.white,
  },
});