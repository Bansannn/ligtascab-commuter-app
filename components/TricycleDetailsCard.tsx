import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type TricycleDetailsCardProps = {
  title: string;
  name: string;
  children: React.ReactNode;
};

export default function TricycleDetailsCard({ title, name, children }: TricycleDetailsCardProps) {
  return (
    <View style={styles.cardProfile}>
      {children}
      <View>
        <Text style={{ fontSize: 12, color: '#868e96' }}>{title}</Text>
        <Text>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 6,
  },
});
