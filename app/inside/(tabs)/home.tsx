import { Link } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to LigtasCab!</Text>
      <Text style={styles.subtitle}>Your safe and reliable commute partner.</Text>
      <Link href="/inside/(tabs)/scan" style={styles.linkButton}>
        <Text style={styles.linkButtonText}>Start a Ride</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.white,
  },
  title: {
    fontFamily: theme.typography.fontFamily.primary.bold,
    fontSize: theme.typography.fontSize['3xl'],
    color: theme.colors.primary[700],
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.secondary.regular,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.gray[600],
    marginBottom: 30,
    textAlign: 'center',
  },
  linkButton: {
    backgroundColor: theme.colors.primary[600],
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  linkButtonText: {
    fontFamily: theme.typography.fontFamily.primary.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.white,
  },
});
