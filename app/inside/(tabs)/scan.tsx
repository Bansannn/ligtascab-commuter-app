import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScanModalContent from '~/components/ScanModalContent';
import ScanModalError from '~/components/ScanModalError';
import { fetchTricycleDetails } from '~/services/tricycles';
import { Tricycle } from '~/types/types';

export default function Scan() {
  //Camera States
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraDisabled, setCameraDisabled] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');

  //Modal States
  const [visible, setVisible] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const isFocused = useIsFocused();

  const { data: tricycle, isLoading } = useQuery<Tricycle | null>({
    queryKey: ['tricycle-details', scanResult],
    queryFn: async () => {
      if (!scanResult) return null;
      const { data, error } = await fetchTricycleDetails(scanResult);
      if (error) {
        setScanError('Invalid QR Code. Please try again.');
      }
      return data;
    },
    enabled: !!scanResult,
    subscribed: isFocused,
    retry: false,
  });

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
    setScanResult(result);
    setCameraDisabled(true);
    setVisible(true);
  };

  const exitModalHandler = () => {
    setScanError(null);
    setCameraDisabled(false);
    setVisible(false);
    setScanResult(null);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconContainer}>
              <AntDesign name="qrcode" size={42} color="#1daa88" />
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
                <FontAwesome6 name="camera-rotate" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.cardDescription}>
            Scan the QR to get your tricycle&apos;s details and to start and confirm your ride.
          </Text>
          <Pressable style={styles.cardButton} disabled={true}>
            <Text style={styles.buttonText}>Start Ride</Text>
          </Pressable>
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
          isLoading={isLoading}
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
    justifyContent: 'flex-end',
  },
  card: {
    position: 'relative',
    height: '90%',
    width: '100%',
    backgroundColor: '#1daa88',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    gap: 16,
  },
  cardHeader: {
    position: 'absolute',
    top: -36,
    height: 72,
    width: 72,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
  },
  cardIconContainer: {
    height: 62,
    width: 62,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    borderColor: '#1daa88',
    borderWidth: 4,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: '#ffffff',
  },
  cardDescription: {
    textAlign: 'center',
    fontSize: 16,
    color: '#ffffff',
  },
  cardButton: {
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1daa88',
  },
  camera: {
    flex: 1,
  },
  cameraContainer: {
    position: 'relative',
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    borderWidth: 8,
    borderColor: '#ffffff',
    overflow: 'hidden',
  },
  buttonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
