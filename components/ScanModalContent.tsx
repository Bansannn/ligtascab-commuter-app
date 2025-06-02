import { useRouter } from 'expo-router';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Tricycle } from '~/types/types';
import { formatDate } from '~/utils/utils';

type ScanModalContentProps = {
  visible: boolean;
  isLoading: boolean;
  tricycle: Tricycle;
  exitModalHandler: () => void;
};

export default function ScanModalContent({
  visible,
  isLoading,
  tricycle,
  exitModalHandler,
}: ScanModalContentProps) {
  const router = useRouter();
  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.modalTricycleCard}>
              <Text style={styles.tricycleCardHeader}>Confirm Tricycle</Text>
              <View style={styles.tricycleCardContent}>
                <Text style={styles.tricycleCardDescription}>Are the details correct?</Text>
                <View style={styles.tricycleDetailsContainer}>
                  <View>
                    <Text style={styles.tricycleDetailsTitle}>{tricycle.plate_number}</Text>
                    <Text style={styles.tricycleCardDescription}>Plate Number</Text>
                  </View>
                  <View>
                    <Text style={styles.tricycleDetailsTitle}>
                      {formatDate(tricycle.registration_expiration.toLocaleString())}
                    </Text>
                    <Text style={styles.tricycleCardDescription}>Registration Expiration</Text>
                  </View>
                </View>
              </View>
              <View style={styles.tricycleCardButtonContainer}>
                <Pressable
                  style={[styles.tricycleCardButton, { backgroundColor: '#dee2e6' }]}
                  onPress={exitModalHandler}>
                  <Text>No</Text>
                </Pressable>
                <Pressable
                  style={[styles.tricycleCardButton, { backgroundColor: '#1daa88' }]}
                  onPress={() => {
                    exitModalHandler();
                    router.push({
                      pathname: '/inside/in-ride',
                      params: { tricycle_id: tricycle.id },
                    });
                  }}>
                  <Text style={{ color: '#ffffff' }}>Yes</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalTricycleCard: {
    height: '100%',
    paddingVertical: 24,
    justifyContent: 'space-between',
  },
  tricycleCardHeader: {
    fontSize: 28,
    fontWeight: 700,
  },
  tricycleCardContent: {
    flexDirection: 'column',
    gap: 12,
  },
  tricycleCardDescription: {
    fontSize: 16,
  },
  tricycleCardButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  tricycleCardButton: {
    width: 52,
    alignItems: 'center',
    borderRadius: 16,
    padding: 8,
  },
  tricycleDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tricycleDetailsTitle: {
    fontSize: 28,
    fontWeight: 700,
  },
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    position: 'relative',
    height: '30%',
    width: '90%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 24,
  },
});
