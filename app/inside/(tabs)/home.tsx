import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View>
      <Link href="/inside/in-ride">
        <Text>Open in-ride page</Text>
      </Link>
    </View>
  );
}
