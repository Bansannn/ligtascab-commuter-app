import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../utils/theme';

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
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({  cardProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '48%',
    backgroundColor: theme.colors.white,
    borderRadius: 6,
    padding: 6,
  },
  title: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.gray[500],
  },
  name: {
    fontFamily: theme.typography.fontFamily.primary.medium,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[900],
  },
});
