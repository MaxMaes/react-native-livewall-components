import React, { PureComponent } from 'react'
import { Platform } from 'react-native'
import TouchableAndroid, { TouchableAndroidProps } from './touchable-android';
import TouchableIOS, { TouchableIOSProps } from './touchable-ios';

type Props = TouchableAndroidProps & TouchableIOSProps;

export class Touchable extends PureComponent<Props> {
    render() {
        return (
            Platform.OS === 'ios' ? <TouchableIOS {...this.props} /> : <TouchableAndroid {...this.props} />
        )
    }
}

export default Touchable
