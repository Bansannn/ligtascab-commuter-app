import {
  AntDesign,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import InRideOptions from '~/components/InRideOptions';
import TricycleDetailsCard from '~/components/TricycleDetailsCard';
import { fetchTricycleDetails } from '~/services/tricycles';
import { Tricycle } from '~/types/types';
import { theme } from '../../utils/theme'; // Import theme

export default function InRidePage() {
  const { tricycle_id } = useLocalSearchParams<{ tricycle_id: string }>();

  const { data: tricycle, isLoading } = useQuery<Tricycle | null>({
    queryKey: ['tricycle-details', tricycle_id],
    queryFn: async () => {
      const { data } = await fetchTricycleDetails(tricycle_id);
      return data;
    },
    retry: false,
  });

  // if (!tricycle) return null;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.cardContainer}>
          <View>
            <Text style={styles.cardHeader}>Tricycle&apos;s Information</Text>
            <Text style={{ color: '#dee2e6' }}>Ride ID: 01239123582343</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TricycleDetailsCard title="Driver" name="Walt Haughfin">
              <View style={styles.avatar}>
                <AntDesign name="user" size={24} color="black" />
              </View>
            </TricycleDetailsCard>
            <TricycleDetailsCard title="Operator" name="Bella Wright">
              <View style={styles.avatar}>
                <AntDesign name="user" size={24} color="black" />
              </View>
            </TricycleDetailsCard>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={require('~/assets/sample-tricycle.png')} />
            </View>
            <View style={{ flexDirection: 'column', width: '100%', gap: 15 }}>
              <TricycleDetailsCard title="Plate Number" name={tricycle?.plate_number.toString() ?? ''}>
                <MaterialIcons name="numbers" size={22} color={theme.colors.primary[600]} />
              </TricycleDetailsCard>
              <TricycleDetailsCard
                title="Seating Capacity"
                name={tricycle?.tricycle_details.seating_capacity?.toString() ?? ''}>
                <Feather name="users" size={22} color={theme.colors.primary[600]} />
              </TricycleDetailsCard>
              <TricycleDetailsCard
                title="Franchise Number"
                name={tricycle?.compliance_details.franchise_number.toString() ?? ''}>
                <MaterialCommunityIcons name="file-document-outline" size={22} color={theme.colors.primary[600]} />
              </TricycleDetailsCard>
            </View>
          </View>
          <View style={styles.routeContainer}>
            <FontAwesome5 name="route" size={23} color={theme.colors.primary[600]} />
            <View style={styles.routeInfoContainer}> {/* Added a style for this container */}
              <Text style={styles.routeTitleText}>Routes</Text>
              <View style={styles.routeList}>
                <Text style={styles.routeItemText}>Centro</Text>
                <Octicons name="arrow-switch" size={18} color={theme.colors.gray[600]} />
                <Text style={styles.routeItemText}>Panganiban</Text>
              </View>
              <View style={styles.routeList}>
                <Text style={styles.routeItemText}>Centro</Text>
                <Octicons name="arrow-switch" size={18} color={theme.colors.gray[600]} />
                <Text style={styles.routeItemText}>Penafrancia</Text>
              </View>
              <View style={styles.routeList}>
                <Text style={styles.routeItemText}>Centro</Text>
                <Octicons name="arrow-switch" size={18} color={theme.colors.gray[600]} />
                <Text style={styles.routeItemText}>Conception Pequena</Text>
              </View>
            </View>
          </View>
        </View>
      )}
      {!isLoading && <InRideOptions />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    gap: 16,
  },
  cardContainer: {
    width: '90%',
    height: '58%',
    backgroundColor: '#1daa88',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  cardHeader: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: 24,
    fontWeight: 600,
    color: '#ffffff',
  },
  imageContainer: {
    width: 152,
    height: 162,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  image: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
  },
  avatar: {
    height: 34,
    width: 34,
    backgroundColor: '#ced4da',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  routeContainer: {
    width: '100%',
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    // justifyContent: 'space-between', // Let the inner container handle spacing
    alignItems: 'flex-start', // Align icon to the top of the text content
    borderRadius: 8,
    paddingHorizontal: 16, // Adjusted padding
    paddingVertical: 16, // Adjusted padding
    gap: 16, // Gap between icon and text block
  },
  routeInfoContainer: { // New style for the text block next to the icon
    flex: 1, // Allow it to take available space
    flexDirection: 'column',
    gap: 8, // Gap between title and each route list
  },
  routeTitleText: { // Style for the "Routes" title
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.gray[800],
    marginBottom: 4, // Small space below the title
  },
  routeList: {
    flexDirection: 'row',
    alignItems: 'center', // Vertically align text and icon in a route
    gap: 8, // Gap between texts and icon in a route
    // marginBottom: 4, // Optional: if you want more space between each route line
  },
  routeItemText: { // Style for individual route points like "Centro"
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[700],
  },
});
