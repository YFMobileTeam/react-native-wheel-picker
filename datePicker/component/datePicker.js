import React, {Component} from 'react'
import {
    TouchableWithoutFeedback,
    View,
    Text,
    Platform,
    PickerIOS,
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
        return (
            <View style={Styles.pickerWheel}>
                <DPicker style={{flex: 1}}
                         selectedValue={selectValue}
                         itemStyle={itemStyle}
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