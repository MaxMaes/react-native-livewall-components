import { NativeModules } from 'react-native';
import {Card} from './src/components/card';
import { Touchable } from './src/components/touchable';

const { LivewallComponents } = NativeModules;

export {
    Card,
    LivewallComponents,
Touchable};
