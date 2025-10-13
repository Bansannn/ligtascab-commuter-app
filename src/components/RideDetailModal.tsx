import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../theme/theme';

interface RideDetailModalProps {
  visible: boolean;
  onClose: () => void;
  ride: Ride | null;
  onReport: () => void;
}

export interface Ride {
  id: string;

  date: string;

  driver: string;

  plateNumber: string;

  fare: string;

  startTime: string;

  endTime: string;

  route: string;
}

const rideHistory: Ride[] = [
  {
    id: 'ride1',
    date: 'Wed July 9, 2025',
    driver: 'Walt Haughfin',
    plateNumber: 'MCP-1234',
    fare: '₱15.00',
    startTime: '08:15 AM',
    endTime: '08:30 AM',
    route: 'Centro ↔ Panganiban',
  },

  {
    id: 'ride2',
    date: 'Tues July 8, 2025',
    driver: 'John Doe',
    plateNumber: 'ABC-5678',
    fare: '₱15.00',
    startTime: '09:00 AM',
    endTime: '09:20 AM',
    route: 'Centro ↔ Penafrancia',
  },

  {
    id: 'ride3',
    date: 'Sun June 1, 2025',
    driver: 'Jane Smith',
    plateNumber: 'XYZ-1122',
    fare: '₱15.00',
    startTime: '01:00 PM',
    endTime: '01:10 PM',
    route: 'Centro ↔ Sabang',
  },
];

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

export default function RideDetailModal({
  visible,
  onClose,
  ride,
  onReport,
}: RideDetailModalProps) {
  if (!ride) return null;

  const rideDate = new Date(ride.date.replace(',', ' '));
  const now = new Date();
  const timeDifference = now.getDate() - rideDate.getDate();
  const isReportable = timeDifference < 7;

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
          <Text style={styles.title}>Ride Details</Text>
          <View style={styles.separator} />
          <DetailRow label="Date" value={ride.date} />
          <DetailRow label="Driver" value={ride.driver} />
          <DetailRow label="Plate Number" value={ride.plateNumber} />
          <DetailRow label="Fare" value={ride.fare} />
          <DetailRow label="Start Time" value={ride.startTime} />
          <DetailRow label="End Time" value={ride.endTime} />
          <DetailRow label="Route" value={ride.route} />
          <View style={styles.footer}>
            {isReportable ? (
              <TouchableOpacity style={styles.reportButton} onPress={onReport}>
                <Feather name="alert-triangle" size={16} color={theme.colors.white} />
                <Text style={styles.reportButtonText}>Report this Ride</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.reportDisabledText}>
                Rides older than 7 days cannot be reported.
              </Text>
            )}
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
  footer: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.danger,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  reportButtonText: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.white,
  },
  reportDisabledText: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[500],
    textAlign: 'center',
    paddingVertical: 12,
  },
});
