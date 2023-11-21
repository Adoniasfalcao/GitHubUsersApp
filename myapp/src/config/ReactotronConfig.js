import Reactotron, {networking} from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .use(networking())
    .connect();
  console.tron = tron;

  tron.clear();
}
