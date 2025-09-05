import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import RatingModal from './RatingModal';
import ReportModal from './ReportModal';
import ReportConfirmationModal from './ReportConfirmationModal';
import { theme } from '../theme/theme';

export default function InRideOptions() {
  const router = useRouter();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReportConfirmation, setShowReportConfirmation] = useState(false);
  const [reportTicketNumber, setReportTicketNumber] = useState('');

  const generateTicketNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `TRC-${timestamp}-${random}`;
  };

  const handleReport = () => {
    setShowReportModal(true);
  };

  const handleReportSubmit = (violation: string, comment: string) => {
    const ticketNumber = generateTicketNumber();
    setReportTicketNumber(ticketNumber);
    console.log('Report submitted:', { violation, comment, ticketNumber });
    setShowReportModal(false);
    setShowReportConfirmation(true);
  };

  const handleReportClose = () => {
    setShowReportModal(false);
  };

  const handleReportConfirmationClose = () => {
    setShowReportConfirmation(false);
  };

  const handleEndRide = () => {
    setShowRatingModal(true);
  };

  const handleRatingSubmit = (rating: number, comment: string) => {
    console.log('Rating submitted:', { rating, comment });
    setShowRatingModal(false);
    router.push({
      pathname: '/inside/home',
      params: { tricycle_id: '' },
    });
  };

  const handleRatingClose = () => {
    setShowRatingModal(false);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.reportButton} onPress={handleReport}>
        <Text style={styles.reportButtonText}>Report</Text>
      </Pressable>
      <Pressable style={styles.endRideButton} onPress={handleEndRide}>
        <Text style={styles.endRideButtonText}>End Ride</Text>
      </Pressable>

      <RatingModal
        visible={showRatingModal}
        onClose={handleRatingClose}
        onSubmit={handleRatingSubmit}
      />

      <ReportModal
        visible={showReportModal}
        onClose={handleReportClose}
        onSubmit={handleReportSubmit}
      />

      <ReportConfirmationModal
        visible={showReportConfirmation}
        onClose={handleReportConfirmationClose}
        ticketNumber={reportTicketNumber}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: theme.colors.white,
    padding: 12,
    borderRadius: 100, // Fully rounded ends for the container
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  reportButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: theme.colors.gray[100],
    borderRadius: 100,
  },
  reportButtonText: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[800],
  },
  endRideButton: {
    flex: 2, // Takes up more space to show prominence
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: theme.colors.danger,
    borderRadius: 100,
  },
  endRideButtonText: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.white,
  },
});
