import { Feather } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

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
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.errorText}>{scanError}</Text>
          <Pressable onPress={exitModalHandler}>
            <Feather name="x" size={24} color="black" />
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
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    height: '10%',
    width: '90%',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    gap: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#fa5252',
  },
});
