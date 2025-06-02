import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../utils/theme';

type ScreenContentProps = {
  title: string;
  path?: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.separator} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  separator: {
    backgroundColor: theme.colors.gray[300],
    height: 1,
    marginVertical: 30,
    width: '80%',
  },
  title: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.gray[900],
  },
});
