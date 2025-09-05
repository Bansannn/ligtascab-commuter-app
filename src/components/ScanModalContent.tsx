import { useRouter } from 'expo-router';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme/theme';
import { Tricycle } from '../types';

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
    <Modal visible={visible} transparent animationType="none" statusBarTranslucent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.modalTricycleCard}>
              <Text style={styles.tricycleCardHeader}>Confirm Tricycle</Text>
              <View style={styles.tricycleCardContent}>
                <View style={styles.tricycleDetailsContainer}>
                  <View>
                    <Text style={styles.tricycleCardDescription}>Chasis Franchise Number</Text>
                    <Text style={styles.tricycleDetailsTitle}>
                      {tricycle.compliance_details.franchise_number}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.tricycleCardDescription}>Chasis Body Color</Text>
                    <Text style={styles.tricycleDetailsTitle}>
                      {tricycle.tricycle_details.body_color}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.tricycleCardDescription}>Are the details correct?</Text>
              <View style={styles.tricycleCardButtonContainer}>
                <Pressable
                  style={[styles.tricycleCardButton, styles.noButton]}
                  onPress={exitModalHandler}>
                  <Text style={styles.noButtonText}>No</Text>
                </Pressable>
                <Pressable
                  style={[styles.tricycleCardButton, styles.yesButton]}
                  onPress={() => {
                    exitModalHandler();
                    router.push({
                      pathname: '/inside/in-ride',
                      params: { tricycle_id: tricycle.id },
                    });
                  }}>
                  <Text style={styles.yesButtonText}>Yes</Text>
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
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  tricycleCardHeader: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize['2xl'],
    color: theme.colors.gray[900],
    textAlign: 'center',
  },
  tricycleCardContent: {
    flexDirection: 'column',

    width: '100%',
    alignItems: 'center',
  },
  tricycleCardDescription: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[700],
    textAlign: 'center',
  },
  tricycleCardButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  tricycleCardButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  noButton: {
    backgroundColor: theme.colors.gray[200],
  },
  noButtonText: {
    fontFamily: theme.typography.fontFamily.primary.medium,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[800],
  },
  yesButton: {
    backgroundColor: theme.colors.primary[600],
  },
  yesButtonText: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.white,
  },
  tricycleDetailsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    marginTop: 10,
  },
  tricycleDetailsTitle: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize['3xl'],
    color: theme.colors.primary[600],
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    minHeight: 280,
    width: '90%',
    maxWidth: 380,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
});
