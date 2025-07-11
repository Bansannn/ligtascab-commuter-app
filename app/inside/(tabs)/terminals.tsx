import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { LatLng, Marker, MapPressEvent } from 'react-native-maps';
import { theme } from '../../../utils/theme';

export default function TerminalsPage() {
  const [origin, setOrigin] = useState('');
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [destination, setDestination] = useState('');
  const [destinationCoords, setDestinationCoords] = useState<LatLng | null>(null);
  const [isPinning, setIsPinning] = useState(true);
  const mapRef = useRef<MapView>(null);
  const router = useRouter();

  const nagaCityRegion = {
    latitude: 13.624,
    longitude: 123.185,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied.');
      }
    })();
  }, []);

  const handleSetUNCLocation = () => {
    const uncLocation = {
      latitude: 13.624, // UNC Latitude
      longitude: 123.183, // UNC Longitude
    };
    setUserLocation(uncLocation);
    setOrigin('University of Nueva Caceres');
    mapRef.current?.animateToRegion(
      {
        ...uncLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  const handleMapPress = (event: MapPressEvent) => {
    if (isPinning) {
      const { coordinate } = event.nativeEvent;
      setDestinationCoords(coordinate);
      setDestination(`Pinned Location`);
    }
  };

  const handleFindTricycles = () => {
    if (!userLocation) {
      Alert.alert('Set Location', 'Please set your starting location first.');
      return;
    }
    router.push({
      pathname: '/inside/terminal-list',
      params: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={nagaCityRegion}
        showsUserLocation
        showsMyLocationButton={false}
        onPress={handleMapPress}>
        {/* Destination Marker appears only after pinning */}
        {destinationCoords && (
          <Marker coordinate={destinationCoords} title="Your Destination">
            <MaterialIcons name="location-pin" size={32} color={theme.colors.danger} />
          </Marker>
        )}
      </MapView>

      {/* Search Card */}
      <View style={styles.searchCard}>
        <View style={styles.inputContainer}>
          <MaterialIcons name="my-location" size={20} color={theme.colors.primary[200]} />
          <TextInput
            style={styles.input}
            placeholder="From: University of Nueva Caceres"
            value={origin}
            onChangeText={setOrigin}
            placeholderTextColor={theme.colors.primary[200]}
          />
          <TouchableOpacity onPress={handleSetUNCLocation}>
            <Text style={styles.useCurrentText}>Use</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View style={styles.inputContainer}>
          <MaterialIcons name="location-pin" size={20} color={theme.colors.primary[200]} />
          <TextInput
            style={styles.input}
            placeholder="To: Where are you going?"
            value={destination}
            onChangeText={setDestination}
            onFocus={() => setIsPinning(true)}
            placeholderTextColor={theme.colors.primary[200]}
          />

        </View>
        <TouchableOpacity
          style={[styles.findButton, !destination && styles.findButtonDisabled]}
          onPress={handleFindTricycles}
          disabled={!destination && !userLocation}>
          <FontAwesome5 name="motorcycle" size={16} color={theme.colors.primary[600]} />
          <Text style={styles.findButtonText}>Find Tricycles</Text>
        </TouchableOpacity>
      </View>

      {isPinning && (
        <View style={styles.pinningBanner}>
          <Text style={styles.pinningBannerText}>Tap on the map to set your destination</Text>
        </View>
      )}
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
  searchCard: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    backgroundColor: theme.colors.primary[600],
    borderRadius: 16,
    padding: 12,
    gap: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    height: 44,
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.white,
  },
  useCurrentText: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.white,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.primary[500],
  },
  findButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 8,
    gap: 10,
  },
  findButtonDisabled: {
    backgroundColor: theme.colors.gray[300],
  },
  findButtonText: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.primary[600],
  },
  pinningBanner: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  pinningBannerText: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
  },
});
