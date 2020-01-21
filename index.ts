import { NativeModules } from 'react-native';
import { Card } from './src/components/card';
import { Divider} from './src/components/divider';
import { Touchable } from './src/components/touchable';

const { LivewallComponents } = NativeModules;

export {
    Card,
    Divider,
    LivewallComponents,
    Touchable
};
