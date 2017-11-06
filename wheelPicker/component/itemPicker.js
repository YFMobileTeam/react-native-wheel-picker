import React, {Component} from 'react'
import {
    TouchableWithoutFeedback,
    View,
    Text,
    Platform,
    PickerIOS,
    StyleSheet,
} from 'react-native'

import DPicker from '../wheel/index'

let DPickerItem = DPicker.Item

export default class ItemPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {
            keyString,
            Styles,
            group,
            value,
            onChange,
            itemStyle,
        } = this.props

        let itemStyleFinal = itemStyle
        if ('number' === (typeof itemStyleFinal)) {
            itemStyleFinal = StyleSheet.flatten(itemStyle)
        }

        const {value: selectValue} = value
        return (
            <View style={Styles.pickerWheel}>
                <DPicker style={{flex: 1}}
                         selectedValue={selectValue}
                         itemStyle={itemStyleFinal}
                         onValueChange={onChange}>
                    {
                        group.map((value, i) => (
                            <DPickerItem label={value.label}
                                         value={value.value}
                                         key={keyString + value.value}/>
                        ))
                    }
                </DPicker>
            </View>
        )
    }
}