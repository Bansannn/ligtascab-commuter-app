import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { theme } from '../../utils/theme';

interface Terminal {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  available: number;
}

// Mock data for terminals relevant to a trip from UNC to SM Naga
const terminals: Terminal[] = [
  {
    id: 't1',
    title: 'UNC Loadside Terminal',
    latitude: 13.624,
    longitude: 123.183,
    available: 7,
  },
  {
    id: 't2',
    title: 'Grand Master Mall Terminal',
    latitude: 13.623,
    longitude: 123.184,
    available: 10,
  },
  {
    id: 't3',
    title: 'Plaza Quezon Terminal',
    latitude: 13.623,
    longitude: 123.185,
    available: 15,
  },
];

// Haversine formula to calculate distance between two points in km
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const FareMatrixCard = () => (
  <View style={styles.fareCard}>
    <View style={styles.fareHeader}>
      <MaterialIcons name="receipt-long" size={24} color={theme.colors.white} />
      <Text style={styles.fareTitle}>Fare Matrix</Text>
    </View>
    <View style={styles.fareRow}>
      <Text style={styles.fareLabel}>Base Fare (First 3km)</Text>
      <Text style={styles.fareValue}>₱15.00</Text>
    </View>
    <View style={styles.fareRow}>
      <Text style={styles.fareLabel}>Per succeeding km</Text>
      <Text style={styles.fareValue}>₱5.00</Text>
    </View>
    <View style={styles.discountInfo}>
      <MaterialIcons name="info-outline" size={16} color={theme.colors.gray[500]} />
      <Text style={styles.discountText}>Verified PWD & Senior Citizens get a 20% discount.</Text>
    </View>
  </View>
);

export default function TerminalListPage() {
  const { latitude, longitude } = useLocalSearchParams<{ latitude: string; longitude: string }>();
  const [selectedTerminal, setSelectedTerminal] = useState<Terminal | null>(null);

  const userLocation = useMemo(() => {
    // For demonstration, we'll use UNC as the initial location.
    return {
      latitude: 13.624,
      longitude: 123.183,
    };
  }, [latitude, longitude]);

  const sortedTerminals = useMemo(() => {
    if (!userLocation) return [];
    return terminals
      .map((terminal) => ({
        ...terminal,
        distance: getDistance(
          userLocation.latitude,
          userLocation.longitude,
          terminal.latitude,
          terminal.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [userLocation]);

  if (!userLocation) {
    return (
      <View style={styles.container}>
        <Text>Location not provided.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Terminals Near UNC', headerBackTitle: 'Map' }} />
      <MapView
        style={styles.map}
        initialRegion={{
          ...userLocation,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        <Marker coordinate={userLocation} title="Your Location (UNC)">
          <MaterialIcons name="person-pin-circle" size={32} color={theme.colors.danger} />
        </Marker>
        {sortedTerminals.map((terminal) => (
          <Marker
            key={terminal.id}
            coordinate={{ latitude: terminal.latitude, longitude: terminal.longitude }}
            title={terminal.title}>
            <MaterialIcons name="electric-rickshaw" size={24} color={theme.colors.primary[600]} />
          </Marker>
        ))}
        {selectedTerminal && (
          <Polyline
            coordinates={[
              userLocation,
              {
                latitude: selectedTerminal.latitude,
                longitude: selectedTerminal.longitude,
              },
            ]}
            strokeColor={theme.colors.danger}
            strokeWidth={3}
            lineDashPattern={[10, 5]}
          />
        )}
      </MapView>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {sortedTerminals.map((terminal) => (
            <TouchableOpacity
              key={terminal.id}
              style={styles.card}
              onPress={() => setSelectedTerminal(terminal)}>
              <View style={styles.iconContainer}>
                <MaterialIcons
                  name="electric-rickshaw"
                  size={20}
                  color={theme.colors.primary[600]}
                />
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>{terminal.title}</Text>
                <Text style={styles.distance}>{terminal.distance.toFixed(2)} km away</Text>
              </View>
              <View style={styles.availabilityContainer}>
                <Text style={styles.availableNumber}>{terminal.available}</Text>
                <Text style={styles.availableText}>Available</Text>
              </View>
            </TouchableOpacity>
          ))}
          <FareMatrixCard />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[100],
  },
  map: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  scrollContainer: {
    padding: 16,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[900],
  },
  distance: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[600],
  },
  availabilityContainer: {
    alignItems: 'center',
  },
  availableNumber: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: 22,
    color: theme.colors.primary[600],
  },
  availableText: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.gray[500],
  },
  fareCard: {
    backgroundColor: theme.colors.primary[600],
    borderRadius: 12,
    padding: 16,
    marginTop: 4, // Adjusted from 16 to 4 to reduce space
    gap: 12,
  },
  fareHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.white,
    paddingBottom: 12,
  },
  fareTitle: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.white,
  },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fareLabel: {
    paddingHorizontal: 8,
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.white,
  },
  fareValue: {
        paddingHorizontal: 8,
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.white,
  },
  discountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.gray[100],
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  discountText: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[600],
  },
});
