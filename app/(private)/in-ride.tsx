import {
  AntDesign,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import EmergencyModal from '~/src/components/EmergencyModal';
import InRideOptions from '~/src/components/InRideOptions';
import PersonnelRatingModal from '~/src/components/PersonnelRatingModal';
import { useRide } from '~/src/hooks/useRide';
import { fetchDriverDetails, fetchOperatorDetails } from '~/src/services/db';
import { theme } from '~/src/theme/theme';
import { Driver, Operator } from '~/src/types';

export default function InRidePage() {
  const { tricycleDetails } = useRide();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPersonnel, setSelectedPersonnel] = useState<Driver | Operator | null>(null);
  const [isEmergencyModalVisible, setEmergencyModalVisible] = useState(false);

  const { data: driver } = useQuery<Driver | null>({
    queryKey: ['driver-details', tricycleDetails?.assigned_driver],
    queryFn: async () => {
      if (!tricycleDetails?.assigned_driver) return null;
      const { data, error } = await fetchDriverDetails(tricycleDetails.assigned_driver);
      if (error) {
        return null;
      }
      return data;
    },
  });

  const { data: operator } = useQuery<Operator | null>({
    queryKey: ['operator-details', tricycleDetails?.operator_id],
    queryFn: async () => {
      if (!tricycleDetails?.operator_id) return null;
      const { data, error } = await fetchOperatorDetails(tricycleDetails.operator_id);
      if (error) {
        return null;
      }
      return data;
    },
  });

  const openModal = (personnel: Operator | Driver) => {
    setSelectedPersonnel(personnel);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPersonnel(null);
  };

  if (!tricycleDetails) return null;
  if (!driver) return null;
  if (!operator) return null;

  return (
    <View style={styles.pageContainer}>
      <Image style={styles.headerImage} source={require('~/src/assets/sample-tricycle.png')} />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.contentSheet}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Tricycle Details</Text>
            <Text style={styles.rideId}>Ride ID: 01239123582343</Text>
          </View>

          {/* Key Details */}
          <View style={styles.keyDetailsContainer}>
            <View style={styles.keyDetailItem}>
              <MaterialIcons name="numbers" size={24} color={theme.colors.primary[600]} />
              <Text style={styles.keyDetailValue}>{tricycleDetails.plate_number}</Text>
              <Text style={styles.keyDetailLabel}>Plate Number</Text>
            </View>
            <View style={styles.keyDetailItem}>
              <MaterialCommunityIcons
                name="file-document-outline"
                size={24}
                color={theme.colors.primary[600]}
              />
              <Text style={styles.keyDetailValue}>
                {tricycleDetails.compliance_details.franchise_number}
              </Text>
              <Text style={styles.keyDetailLabel}>Franchise No.</Text>
            </View>
            <View style={styles.keyDetailItem}>
              <MaterialIcons name="color-lens" size={24} color={theme.colors.primary[600]} />
              <Text style={styles.keyDetailValue}>
                {tricycleDetails.tricycle_details.body_number}
              </Text>
              <Text style={styles.keyDetailLabel}>Body Color</Text>
            </View>
          </View>

          {/* Personnel Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="user-cog" size={18} color={theme.colors.gray[100]} />
              <Text style={styles.sectionTitle}>Driver & Operator</Text>
            </View>
            <TouchableOpacity style={styles.personnelItem} onPress={() => openModal(driver)}>
              <View style={styles.avatar}>
                <AntDesign name="user" size={24} color={theme.colors.gray[800]} />
              </View>
              <View style={styles.personnelInfo}>
                <Text
                  style={styles.personnelName}>{`${driver.first_name} ${driver.last_name}`}</Text>
                <Text style={styles.personnelRole}>Driver</Text>
              </View>
              <View style={styles.ratingContainer}>
                <AntDesign name="star" size={16} color={theme.colors.gray[700]} />
                {/* <Text style={styles.ratingText}>{driver.rating.toFixed(1)}</Text> */}
              </View>
              <AntDesign name="right" size={16} color={theme.colors.gray[400]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.personnelItem} onPress={() => openModal(operator)}>
              <View style={styles.avatar}>
                <AntDesign name="user" size={24} color={theme.colors.gray[800]} />
              </View>
              <View style={styles.personnelInfo}>
                <Text
                  style={
                    styles.personnelName
                  }>{`${operator.first_name} ${operator.last_name}`}</Text>
                <Text style={styles.personnelRole}>Operator</Text>
              </View>
              <View style={styles.ratingContainer}>
                <AntDesign name="star" size={16} color={theme.colors.gray[700]} />
                {/* <Text style={styles.ratingText}>{operator.rating.toFixed(1)}</Text> */}
              </View>
              <AntDesign name="right" size={16} color={theme.colors.gray[400]} />
            </TouchableOpacity>
          </View>

          {/* Routes Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="route" size={18} color={theme.colors.gray[100]} />
              <Text style={styles.sectionTitle}>Approved Routes</Text>
            </View>
            <View style={styles.routeTagsContainer}>
              <Text style={styles.routeTag}>Centro ↔ Panganiban</Text>
              <Text style={styles.routeTag}>Centro ↔ Penafrancia</Text>
              <Text style={styles.routeTag}>Centro ↔ Conception Pequena</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.floatingContainer}>
        <InRideOptions />
        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={() => setEmergencyModalVisible(true)}>
          <Feather name="alert-triangle" size={24} color={theme.colors.white} />
          <Text style={styles.emergencyButtonText}>EMERGENCY</Text>
        </TouchableOpacity>
      </View>

      <PersonnelRatingModal
        visible={isModalVisible}
        onClose={closeModal}
        personnel={selectedPersonnel}
      />
      <EmergencyModal
        visible={isEmergencyModalVisible}
        onClose={() => setEmergencyModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: theme.colors.primary[600],
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    width: '100%',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingTop: 300, // Space for the header image
    paddingBottom: 180, // Increased space for floating buttons
  },
  contentSheet: {
    backgroundColor: theme.colors.primary[600],
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    gap: 24,
  },
  header: {
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: 28,
    color: theme.colors.white,
  },
  rideId: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.white,
  },
  keyDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  keyDetailItem: {
    alignItems: 'center',
    gap: 8,
  },
  keyDetailValue: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.gray[900],
  },
  keyDetailLabel: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.gray[600],
  },
  section: {
    gap: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.white,
  },
  personnelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  avatar: {
    height: 48,
    width: 48,
    backgroundColor: theme.colors.gray[100],
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  personnelInfo: {
    flex: 1,
  },
  personnelName: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.gray[900],
  },
  personnelRole: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[600],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginRight: 8,
  },
  ratingText: {
    fontFamily: theme.typography.fontFamily.primary.medium,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[800],
  },
  routeTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 8,
  },
  routeTag: {
    fontFamily: theme.typography.fontFamily.secondary.medium,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[800],
    backgroundColor: theme.colors.white,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    overflow: 'hidden', // for iOS to respect borderRadius
  },
  floatingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    gap: 12,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.danger,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: '100%',
  },
  emergencyButtonText: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.white,
  },
});
