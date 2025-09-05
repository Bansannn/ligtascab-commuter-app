import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../theme/theme';

import { Report } from '~/app/(private)/(tabs)/history';

interface ReportDetailModalProps {
  visible: boolean;
  onClose: () => void;
  report: Report | null;
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

export default function ReportDetailModal({ visible, onClose, report }: ReportDetailModalProps) {
  if (!report) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={24} color={theme.colors.gray[500]} />
          </TouchableOpacity>
          <Text style={styles.title}>Report Details</Text>
          <View style={styles.separator} />
          <DetailRow label="Ticket Number" value={report.ticketNumber} />
          <DetailRow label="Date" value={report.date} />
          <DetailRow label="Violation" value={report.reason} />
          <DetailRow label="Status" value={report.status} />
          <View style={styles.commentSection}>
            <Text style={styles.detailLabel}>Your Comment</Text>
            <Text style={styles.commentText}>"{report.comment}"</Text>
          </View>
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
    padding: 20,
    gap: 12,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  title: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: 22,
    color: theme.colors.gray[900],
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.gray[200],
    marginVertical: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailLabel: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[600],
  },
  detailValue: {
    fontFamily: theme.typography.fontFamily.primary.medium,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[900],
  },
  commentSection: {
    marginTop: 8,
    gap: 4,
  },
  commentText: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[700],
    fontStyle: 'italic',
  },
});
