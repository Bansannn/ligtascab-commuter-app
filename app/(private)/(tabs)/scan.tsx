import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScanModalContent from '~/src/components/ScanModalContent';
import ScanModalError from '~/src/components/ScanModalError';
import { theme } from '~/src/theme/theme';
import { Tricycle } from '~/src/types';

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraDisabled, setCameraDisabled] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');

  const [visible, setVisible] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [tricycle, setTricycle] = useState<Tricycle | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  if (!permission) {
    return <View />;
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const onScanSuccess = (result: string) => {
    const mockTricycle: Tricycle = {
      id: result,
      plate_number: 'MCP-1234',
      operator_id: 'OP-001',
      status: 'Active',
      registration_expiration: new Date('2025-12-31'),
      franchise_expiration: new Date('2026-12-31'),
      last_maintenance_date: new Date('2025-06-01'),
      tricycle_details: {
        model: 'TVS King',
        year: '2022',
        seating_capacity: '4',
        body_color: 'Silver',
        fuel_type: 'Gasoline',
        mileage: '15000',
        maintenance_status: 'Good',
      },
      compliance_details: {
        registration_number: 'REG-91011',
        franchise_number: '0423',
        or_number: 'OR-151617',
        cr_number: 'CR-181920',
      },
    };
    setTricycle(mockTricycle);
    setCameraDisabled(true);
    setVisible(true);
  };

  const exitModalHandler = () => {
    setScanError(null);
    setCameraDisabled(false);
    setVisible(false);
    setTricycle(null);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconContainer}>
              <AntDesign name="qrcode" size={42} color={theme.colors.primary[600]} />
            </View>
          </View>
          <Text style={styles.cardTitle}>Scan the QR Code</Text>
          <View style={styles.cameraContainer}>
            <CameraView
              active={!cameraDisabled}
              style={StyleSheet.absoluteFill}
              facing={facing}
              onBarcodeScanned={(scanningResult: BarcodeScanningResult) => {
                if (!!scanningResult.data) {
                  onScanSuccess(scanningResult.data);
                }
              }}
              barcodeScannerSettings={{
                barcodeTypes: ['qr'],
              }}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={toggleCameraFacing}>
                <FontAwesome6 name="camera-rotate" size={24} color={theme.colors.white} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.cardDescription}>
            Scan the QR to get your tricycle&apos;s details and to start and confirm your ride.
          </Text>
        </View>
      </View>
      {scanError !== null && (
        <ScanModalError
          visible={visible}
          scanError={scanError}
          exitModalHandler={exitModalHandler}
        />
      )}
      {tricycle && (
        <ScanModalContent
          visible={visible}
          isLoading={false}
          tricycle={tricycle}
          exitModalHandler={exitModalHandler}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.gray[100],
  },
  card: {
    position: 'relative',
    width: '90%',
    maxWidth: 400,
    backgroundColor: theme.colors.primary[600],
    borderRadius: 20,
    alignItems: 'center',
    // justifyContent: 'center', // Remove to allow natural flow from top    padding: 24,
    gap: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  cardHeader: {
    position: 'absolute',
    top: -36,
    height: 72,
    width: 72,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 36,
  },
  cardIconContainer: {
    height: 62,
    width: 62,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 31,
    borderColor: theme.colors.primary[600],
    borderWidth: 4,
  },
  cardTitle: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize['3xl'],
    color: theme.colors.white,
    marginTop: 50,
  },
  cardDescription: {
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.gray[100],
    paddingHorizontal: 10,
  },
  cardButton: {
    width: '100%',
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  buttonText: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize.md,
    fontWeight: '700',
    color: theme.colors.primary[600],
  },
  camera: {
    flex: 1,
  },
  cameraContainer: {
    position: 'relative',
    width: '80%',
    aspectRatio: 1,
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: theme.colors.white,
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
