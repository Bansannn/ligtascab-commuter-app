import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../../utils/theme';

// Mock Data
const rideHistory = [
  {
    id: 'ride1',
    date: 'July 9, 2025',
    driver: 'Walt Haughfin',
    plateNumber: 'MCP-1234',
    fare: '₱20.00',
  },
  {
    id: 'ride2',
    date: 'July 8, 2025',
    driver: 'John Doe',
    plateNumber: 'ABC-5678',
    fare: '₱25.00',
  },
];

const reportHistory = [
  {
    id: 'report1',
    ticketNumber: 'TRC-123456-XYZ',
    date: 'July 9, 2025',
    reason: 'Overcharging',
    status: 'Resolved',
  },
  {
    id: 'report2',
    ticketNumber: 'TRC-789012-ABC',
    date: 'July 5, 2025',
    reason: 'Reckless Driving',
    status: 'Pending',
  },
];

// Helper Components
const RideHistoryCard = ({ ride }: { ride: (typeof rideHistory)[0] }) => (
  <TouchableOpacity style={styles.card}>
    <View style={styles.cardIconContainer}>
      <FontAwesome5 name="motorcycle" size={20} color={theme.colors.primary[600]} />
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>
        Ride with {ride.driver} ({ride.plateNumber})
      </Text>
      <Text style={styles.cardSubtitle}>
        {ride.date} • {ride.fare}
      </Text>
    </View>
    <AntDesign name="right" size={16} color={theme.colors.gray[400]} />
  </TouchableOpacity>
);

const ReportHistoryCard = ({ report }: { report: (typeof reportHistory)[0] }) => {
  const isPending = report.status === 'Pending';
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardIconContainer}>
        <Feather name="alert-triangle" size={20} color={theme.colors.primary[600]} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Report: {report.reason}</Text>
        <Text style={styles.cardSubtitle}>Ticket: {report.ticketNumber}</Text>
      </View>
      <View style={[styles.statusBadge, isPending && styles.statusBadgePending]}>
        <Text style={[styles.statusText, isPending && styles.statusTextPending]}>
          {report.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function MyRidesPage() {
  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>My Rides</Text>

        {/* Ride History Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ride History</Text>
          {rideHistory.map((ride) => (
            <RideHistoryCard key={ride.id} ride={ride} />
          ))}
        </View>

        {/* Reports & Complaints Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reports & Complaints</Text>
          {reportHistory.map((report) => (
            <ReportHistoryCard key={report.id} report={report} />
          ))}
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
    paddingTop: 60, // Adjust for status bar
    gap: 24,
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: 32,
    color: theme.colors.gray[900],
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.gray[800],
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  cardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: theme.typography.fontFamily.primary.medium,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[900],
  },
  cardSubtitle: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[600],
  },
  statusBadge: {
    backgroundColor: theme.colors.primary[100],
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  statusBadgePending: {
    backgroundColor: '#fef3c7', // Amber 100
  },
  statusText: {
    fontFamily: theme.typography.fontFamily.primary.medium,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.primary[700],
  },
  statusTextPending: {
    color: '#b45309', // Amber 700
  },
});