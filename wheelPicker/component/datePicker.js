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

export default class DatePicker extends Component {
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
        const selectValue = value[0] === "0" ? value.substr(1) : value
        let itemStyleFinal = itemStyle
        if ('number' === (typeof itemStyleFinal)) {
            itemStyleFinal = StyleSheet.flatten(itemStyle)
        }
        return (
            <View style={Styles.pickerWheel}>
                <DPicker style={{flex: 1}}
                         selectedValue={selectValue}
                         itemStyle={itemStyleFinal}
                         onValueChange={onChange}>
                    {
                        group.map((value, i) => (
                            <DPickerItem label={value}
                                         value={value}
                                         key={keyString + value}/>
                        ))
                    }
                </DPicker>
            </View>
        )
    }
}