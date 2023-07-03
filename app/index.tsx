import { Text, View } from 'react-native';
import { useAuth } from '../context/authProvider';
import { LogBox } from 'react-native';

//// DEV - LOGS
const IGNORED_LOGS = [
  'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.', // native-base
];

LogBox.ignoreLogs(IGNORED_LOGS);

// Workaround for Expo 45
if (__DEV__) {
  const withoutIgnored =
    (logger) =>
    (...args) => {
      const output = args.join(' ');

      if (!IGNORED_LOGS.some((log) => output.includes(log))) {
        logger(...args);
      }
    };

  console.log = withoutIgnored(console.log);
  console.info = withoutIgnored(console.info);
  console.warn = withoutIgnored(console.warn);
  console.error = withoutIgnored(console.error);
}

export default function Index() {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={() => signOut()}>Sign Out</Text>
    </View>
  );
}
