import { ActivityIndicator, View } from 'react-native';
import { theme } from '~/src/theme/theme';

export default function Spinner() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={theme.colors.primary[500]} />
    </View>
  );
}
