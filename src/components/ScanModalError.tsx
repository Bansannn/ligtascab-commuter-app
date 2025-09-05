import { Feather } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme/theme';

type ScanModalErrorProps = {
  visible: boolean;
  scanError: string;
  exitModalHandler: () => void;
};

export default function ScanModalError({
  visible,
  scanError,
  exitModalHandler,
}: ScanModalErrorProps) {
  return (
    <Modal visible={visible} transparent animationType="none" statusBarTranslucent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Feather name="alert-triangle" size={32} color={theme.colors.danger} />
          <Text style={styles.errorText}>{scanError}</Text>
          <Pressable onPress={exitModalHandler} style={styles.closeButton}>
            <Feather name="x" size={24} color={theme.colors.gray[700]} />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    width: '90%',
    maxWidth: 380,
    backgroundColor: theme.colors.white,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    gap: 15,
    elevation: 10,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: 'relative',
  },
  errorText: {
    fontFamily: theme.typography.fontFamily.primary.medium,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.danger,
    textAlign: 'center',
    fontWeight: '500',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
});
