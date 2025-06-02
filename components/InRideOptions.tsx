import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function InRideOptions() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Pressable style={styles.report}>
        <Text style={{ color: '#f03e3e' }}>Report</Text>
      </Pressable>
      <Pressable style={styles.home}>
        <Feather
          name="home"
          size={24}
          color="#1daa88"
          onPress={() => {
            router.push({ pathname: '/inside/home' });
          }}
        />
      </Pressable>
      <Pressable
        style={styles.end}
        onPress={() => {
          router.push({
            pathname: '/inside/home',
            params: { tricycle_id: '' },
          });
        }}>
        <Text style={{ color: '#fff', fontWeight: 600 }}>End Ride</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 8,
  },
  report: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    borderColor: '#f03e3e',
    borderWidth: 1,
    borderRadius: 32,
  },
  home: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderRadius: '50%',
    borderColor: '#1daa88',
  },
  end: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#1daa88',
    borderRadius: 32,
  },
});
