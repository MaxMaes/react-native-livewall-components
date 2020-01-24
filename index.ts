import {NativeModules} from 'react-native';
import {Card} from './src/components/card';
import {Divider} from './src/components/divider';
import {TextInput} from './src/components/textinput';
import {Touchable} from './src/components/touchable';
import {PageControl} from './src/components/page-control';
import {Pager} from './src/components/pager';

const {LivewallComponents} = NativeModules;

export {
  Card,
  Divider,
  LivewallComponents,
  PageControl,
  Pager,
  TextInput,
  Touchable,
};
