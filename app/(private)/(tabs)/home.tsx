import { MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '~/src/hooks/useAuth';
import { fetchRecentRide } from '~/src/services/ride';
import { theme } from '~/src/theme/theme';
import { Ride } from '~/src/types';
import { formatDate } from '~/src/utils/utils';

const QuickActionButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <MaterialIcons name={icon} size={28} color={theme.colors.primary[600]} />
    <Text style={styles.actionButtonText}>{label}</Text>
  </TouchableOpacity>
);

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();

  const { data: recent_ride } = useQuery<Ride | null>({
    queryKey: ['recent_ride'],
    queryFn: fetchRecentRide,
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user?.first_name}!</Text>
        <Text style={styles.subtitle}>Ready for your next safe ride?</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <QuickActionButton
            icon="qr-code-scanner"
            label="Scan QR"
            onPress={() => router.push('/(private)/(tabs)/scan')}
          />
          <QuickActionButton
            icon="map"
            label="Find Terminal"
            onPress={() => router.push('/(private)/(tabs)/terminals')}
          />
        </View>
      </View>

      {/* Recent Ride */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Ride</Text>
        <View style={styles.card}>
          {recent_ride ? (
            <>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Driver</Text>
                <Text
                  style={
                    styles.cardValue
                  }>{`${recent_ride.driver_details.first_name} ${recent_ride.driver_details.last_name}`}</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Plate No.</Text>
                <Text style={styles.cardValue}>{recent_ride.tricycle_details.plate_number}</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Date</Text>
                <Text style={styles.cardValue}>
                  {formatDate(recent_ride.end_time.toLocaleString())}
                </Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Fare</Text>
                <Text style={styles.cardValueBold}>{recent_ride.fare}</Text>
              </View>
            </>
          ) : (
            <Text style={styles.noRidesText}>You have no recent rides.</Text>
          )}
          <TouchableOpacity
            style={styles.cardLinkButton}
            onPress={() => router.push('/(private)/(tabs)/history')}>
            <Text style={styles.cardLinkButtonText}>View Full History</Text>
            <MaterialIcons name="arrow-forward" size={16} color={theme.colors.primary[600]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Safety Tip */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Safety Tip</Text>
        <View style={[styles.card, styles.safetyCard]}>
          <MaterialIcons name="health-and-safety" size={24} color={theme.colors.primary[700]} />
          <Text style={styles.safetyText}>
            Always double-check the body number on the app with the physical tricycle before
            boarding.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[100],
  },
  contentContainer: {
    padding: 16,
    gap: 24,
  },
  header: {
    paddingHorizontal: 8,
  },
  greeting: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize['3xl'],
    color: theme.colors.gray[900],
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.gray[600],
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.gray[800],
    paddingHorizontal: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionButtonText: {
    fontFamily: theme.typography.fontFamily.primary.medium,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[800],
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLabel: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[600],
  },
  cardValue: {
    fontFamily: theme.typography.fontFamily.primary.medium,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[800],
  },
  cardValueBold: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[900],
  },
  noRidesText: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[600],
    textAlign: 'center',
    paddingVertical: 20,
  },
  cardLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
    paddingTop: 12,
    marginTop: 4,
  },
  cardLinkButtonText: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.primary[600],
  },
  safetyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.colors.primary[50],
  },
  safetyText: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.primary[800],
    lineHeight: 22,
  },
});
