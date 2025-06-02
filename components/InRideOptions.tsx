import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../utils/theme';
import RatingModal from './RatingModal';
import ReportModal from './ReportModal';
import ReportConfirmationModal from './ReportConfirmationModal';

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
    // Generate ticket number
    const ticketNumber = generateTicketNumber();
    setReportTicketNumber(ticketNumber);
    
    // Here you can handle the report submission (e.g., send to API)
    console.log('Report submitted:', { violation, comment, ticketNumber });
    
    // Close report modal and show confirmation
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
    // Here you can handle the rating submission (e.g., send to API)
    console.log('Rating submitted:', { rating, comment });
    
    // Close modal and navigate to home
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
    <View style={styles.container}>      <Pressable style={styles.report} onPress={handleReport}>
        <Text style={styles.reportText}>Report</Text>
      </Pressable>
      <Pressable style={styles.home}>
        <Feather
          name="home"
          size={24}
          color={theme.colors.primary[600]} // Use theme color
          onPress={() => {
            router.push({ pathname: '/inside/home' });
          }}        />
      </Pressable>
      <Pressable
        style={styles.end}
        onPress={handleEndRide}>
        <Text style={styles.endText}>End Ride</Text>
      </Pressable>      <RatingModal
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
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 12, // Increased gap
  },  report: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    borderColor: theme.colors.danger,
    borderWidth: 1,
    borderRadius: 32,
  },  reportText: {
    fontFamily: theme.typography.fontFamily.primary.medium,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.danger,
  },
  home: {
    padding: 10, // Simplified padding for a circular button
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2, // Slightly thinner border
    borderRadius: 22, // (padding + iconSize/2 + borderWidth) approx for a circle with 24px icon
    borderColor: theme.colors.primary[600], // Use theme color
  },
  end: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12, // Adjusted padding
    backgroundColor: theme.colors.primary[600], // Use theme color
    borderRadius: 32,
  },
  endText: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.md, // Adjusted font size for consistency
    color: theme.colors.white,
    fontWeight: '600',
  },
});
