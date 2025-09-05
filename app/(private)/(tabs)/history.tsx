import { AntDesign, Feather } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ReportConfirmationModal from '~/src/components/ReportConfirmationModal';
import ReportDetailModal from '~/src/components/ReportDetailModal';
import ReportModal from '~/src/components/ReportModal';
import RideDetailModal from '~/src/components/RideDetailModal';
import { theme } from '~/src/theme/theme';

// Expanded Mock Data Types
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

export interface Report {
  id: string;
  ticketNumber: string;
  date: string;
  reason: string;
  status: 'Resolved' | 'Pending';
  comment: string;
}

// Expanded Mock Data
export const rideHistory: Ride[] = [
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
    date: 'Sun June 1, 2025', // Older than 7 days
    driver: 'Jane Smith',
    plateNumber: 'XYZ-1122',
    fare: '₱15.00',
    startTime: '01:00 PM',
    endTime: '01:10 PM',
    route: 'Centro ↔ Sabang',
  },
];

const reportHistory: Report[] = [
  {
    id: 'report1',
    ticketNumber: 'TRC-123456-XYZ',
    date: 'July 9, 2025',
    reason: 'Overcharging',
    status: 'Resolved',
    comment: 'The driver asked for ₱50 for a short trip.',
  },
  {
    id: 'report2',
    ticketNumber: 'TRC-789012-ABC',
    date: 'July 5, 2025',
    reason: 'Reckless Driving',
    status: 'Pending',
    comment: 'The driver was speeding and not following traffic rules.',
  },
];

// Helper Components
const ReportHistoryCard = ({ report, onPress }: { report: Report; onPress: () => void }) => {
  const isPending = report.status === 'Pending';
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
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

export default function HistoryPage() {
  const [filter, setFilter] = useState('');
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // State for Report Modals
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReportConfirmation, setShowReportConfirmation] = useState(false);
  const [reportTicketNumber, setReportTicketNumber] = useState('');

  const filteredRides = useMemo(
    () =>
      rideHistory
        .filter(
          (ride) =>
            ride.driver.toLowerCase().includes(filter.toLowerCase()) ||
            ride.plateNumber.toLowerCase().includes(filter.toLowerCase())
        )
        .slice(0, 10), // Show max 10 rides
    [filter]
  );

  const generateTicketNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `TRC-${timestamp}-${random}`;
  };

  const handleReportSubmit = (violation: string, comment: string) => {
    const ticketNumber = generateTicketNumber();
    setReportTicketNumber(ticketNumber);
    console.log('Report submitted from history:', { violation, comment, ticketNumber });
    setShowReportModal(false);
    setShowReportConfirmation(true);
  };

  const handleOpenReportModal = () => {
    setSelectedRide(null); // Close ride detail modal
    setShowReportModal(true); // Open report modal
  };

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>Ride History</Text>

        {/* Ride History Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ride History</Text>
          <View style={styles.filterContainer}>
            <AntDesign name="search1" size={20} color={theme.colors.gray[400]} />
            <TextInput
              style={styles.filterInput}
              placeholder="Filter by driver or plate number..."
              placeholderTextColor={theme.colors.gray[400]}
              value={filter}
              onChangeText={setFilter}
            />
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, { flex: 3 }]}>Driver</Text>
              <Text style={[styles.headerCell, { flex: 2 }]}>Date</Text>
              <Text style={[styles.headerCell, { flex: 1, textAlign: 'right' }]}>Fare</Text>
            </View>
            {filteredRides.map((ride) => (
              <TouchableOpacity
                key={ride.id}
                style={styles.tableRow}
                onPress={() => setSelectedRide(ride)}>
                <View style={{ flex: 3 }}>
                  <Text style={styles.cellTextBold}>{ride.driver}</Text>
                  <Text style={styles.cellTextSubtle}>{ride.plateNumber}</Text>
                </View>
                <Text style={[styles.cellText, { flex: 2 }]}>{ride.date}</Text>
                <Text style={[styles.cellText, { flex: 1, textAlign: 'right' }]}>{ride.fare}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Reports & Complaints Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reports & Complaints</Text>
          {reportHistory.map((report) => (
            <ReportHistoryCard
              key={report.id}
              report={report}
              onPress={() => setSelectedReport(report)}
            />
          ))}
        </View>
      </ScrollView>

      <RideDetailModal
        visible={!!selectedRide}
        onClose={() => setSelectedRide(null)}
        ride={selectedRide}
        onReport={handleOpenReportModal}
      />
      <ReportDetailModal
        visible={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        report={selectedReport}
      />
      <ReportModal
        visible={showReportModal}
        onClose={() => setShowReportModal(false)}
        onSubmit={handleReportSubmit}
      />
      <ReportConfirmationModal
        visible={showReportConfirmation}
        onClose={() => setShowReportConfirmation(false)}
        ticketNumber={reportTicketNumber}
      />
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
    paddingTop: 20,
    gap: 15,
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: 32,
    color: theme.colors.gray[900],
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.gray[800],
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    gap: 8,
  },
  filterInput: {
    flex: 1,
    height: 44,
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[800],
  },
  table: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: theme.colors.gray[50],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  headerCell: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[600],
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  cellText: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[800],
  },
  cellTextBold: {
    fontFamily: theme.typography.fontFamily.primary.medium,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[900],
  },
  cellTextSubtle: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.gray[500],
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
    backgroundColor: '#fef3c7',
  },
  statusText: {
    fontFamily: theme.typography.fontFamily.primary.medium,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.primary[700],
  },
  statusTextPending: {
    color: '#b45309',
  },
});
