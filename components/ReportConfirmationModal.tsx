import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../utils/theme';

interface ReportConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  ticketNumber: string;
}

export default function ReportConfirmationModal({
  visible,
  onClose,
  ticketNumber,
}: ReportConfirmationModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.successIcon}>
              <Feather name="check" size={32} color={theme.colors.white} />
            </View>
          </View>

          <Text style={styles.title}>Report Submitted</Text>

          <Text style={styles.subtitle}>
            Your report has been successfully submitted and is now being reviewed by our team.
          </Text>

          <View style={styles.ticketContainer}>
            <Text style={styles.ticketLabel}>Ticket Number</Text>
            <View style={styles.ticketNumberBox}>
              <Text style={styles.ticketNumber}>{ticketNumber}</Text>
              <TouchableOpacity style={styles.copyButton}>
                <Feather name="copy" size={16} color={theme.colors.primary[600]} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Feather name="clock" size={16} color={theme.colors.primary[600]} />
              <Text style={styles.infoText}>Review typically takes 24-48 hours</Text>
            </View>

            <View style={styles.infoItem}>
              <Feather name="bell" size={16} color={theme.colors.primary[600]} />{' '}
              <Text style={styles.infoText}>You&apos;ll receive notifications about updates</Text>
            </View>

            <View style={styles.infoItem}>
              <Feather name="shield" size={16} color={theme.colors.primary[600]} />
              <Text style={styles.infoText}>Your report is completely confidential</Text>
            </View>
          </View>

          <View style={styles.actionSection}>
            <Text style={styles.nextStepsTitle}>What happens next?</Text>{' '}
            <Text style={styles.nextStepsText}>
              1. Our team will investigate your report{'\n'}
              2. We&apos;ll contact the driver if necessary{'\n'}
              3. You&apos;ll receive an update via notification{'\n'}
              4. Appropriate action will be taken if violations are confirmed
            </Text>
          </View>

          <TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  iconContainer: {
    marginBottom: 20,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize['2xl'],
    color: theme.colors.gray[900],
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[600],
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  ticketContainer: {
    width: '100%',
    marginBottom: 24,
  },
  ticketLabel: {
    fontFamily: theme.typography.fontFamily.primary.medium,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[700],
    textAlign: 'center',
    marginBottom: 8,
  },
  ticketNumberBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.gray[50],
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  ticketNumber: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.primary[600],
    letterSpacing: 1,
  },
  copyButton: {
    padding: 4,
  },
  infoSection: {
    width: '100%',
    backgroundColor: theme.colors.primary[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary[700],
    lineHeight: 18,
  },
  actionSection: {
    width: '100%',
    marginBottom: 24,
  },
  nextStepsTitle: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[800],
    marginBottom: 8,
  },
  nextStepsText: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[600],
    lineHeight: 20,
  },
  doneButton: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 32,
    backgroundColor: theme.colors.primary[600],
    alignItems: 'center',
  },
  doneButtonText: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.white,
  },
});
