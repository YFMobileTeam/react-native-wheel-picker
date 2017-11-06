/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import {DatePicker, DualItemPicker, MultiItemPicker} from 'react-native-wheel-picker-free'

const {width} = Dimensions.get('window')

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const dateData = []

const timerData = {}

const multiItemPickerData = [
    [{label: '2011', value: '2011'}, {label: '2012', value: '2012'}, {label: '2013', value: '2013'}, {
        label: '2014',
        value: '2014'
    }],
    [{label: '1月', value: '1'}, {label: '2月', value: '2'}, {label: '3月', value: '3'}, {label: '4月', value: '4'}],
    [{label: '湖南省', value: '湖南省'}, {label: '广东省', value: '广东省'}, {label: '内蒙古', value: '内蒙古'}]
]
const multiItemPickerDefaultData = undefined

// noinspection JSAnnotator
export default class App extends Component<{}> {

    datePickerDialog
    timePickerDialog
    multiItemPickerDialog

    constructor() {
        super()
        this._initData()
    }

    _initData = () => {

        for (let i = 1900; i < 2050; i++) {
            dateData.push(i.toString())
        }

        const hour = []
        const minute = []
        const second = []
        for (let i = 0; i <= 24; i++) {
            const valueStr = this._getLabel(i)
            hour.push({label: `${valueStr}时`, value: `${valueStr}`})
        }
        for (let i = 0; i <= 60; i++) {
            const valueStr = this._getLabel(i)
            minute.push({label: `${valueStr}分`, value: `${valueStr}`})
        }
        for (let i = 0; i <= 60; i++) {
            const valueStr = this._getLabel(i)
            second.push({label: `${valueStr}秒`, value: `${valueStr}`})
        }
        const time = [hour, minute, second]
        const date = new Date()
        const hourStr = this._getLabel(date.getHours())
        const minuteStr = this._getLabel(date.getMinutes())
        const secondStr = this._getLabel(date.getSeconds())
        // const defaultValue = JSON.parse(`{"${hourStr}时":"${hourStr}","${minuteStr}分":"${minuteStr}","${secondStr}秒":"${secondStr}"}`)
        const defaultValue = [
            {label: `${hourStr}时`, value: `${hourStr}`},
            {label: `${minuteStr}时`, value: `${minuteStr}`},
            {label: `${secondStr}时`, value: `${secondStr}`}
        ]
        Object.assign(timerData, {time: time, defaultValue: defaultValue})
    }

    _getLabel = (value) => {
        if (value < 10) {
            return `0${value}`
        } else {
            return `${value}`
        }
    }

    render() {

        const {selectedValue = '无选择数据'} = this.state || {}

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    react-native-wheel-picker-free
                </Text>
                <TouchableOpacity onPress={() => this.datePickerDialog.showDialog()}>
                    <Text style={styles.btn}>日期选择器</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.timePickerDialog.showDialog()}>
                    <Text style={styles.btn}>时间选择器</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.multiItemPickerDialog.showDialog()}>
                    <Text style={styles.btn}>自由组合</Text>
                </TouchableOpacity>

                <Text style={styles.result}>{selectedValue}</Text>
                <DatePicker
                    ref={(dialog) => {
                        this.datePickerDialog = dialog
                    }}
                    yearData={dateData}
                    selectData={new Date}
                    onChange={this._onPickerConform}
                    keepShowModal={false}
                    formatCharacter="-"
                    cancleText="取消"
                    finishText="确定"
                    title="出生年月日"
                    modalColor="#0000"
                    itemStyle={styles.pickerItem}
                    buttonStyle={styles.pickerBtn}
                    titleStyle={styles.singleItemPickerTitle}
                />
                <MultiItemPicker
                    ref={(dialog) => this.timePickerDialog = dialog}
                    dataSet={timerData.time}
                    defaultSelectedValue={timerData.defaultValue}
                    onPick={this._onPickerConform}
                    title="时间选择器"
                    itemStyle={styles.pickerItem}
                    buttonStyle={styles.pickerBtn}
                    topLineStyle={styles.singleItemPickTopLineStyle}
                    titleStyle={styles.singleItemPickerTitle}
                />
                <MultiItemPicker
                    ref={(dialog) => this.multiItemPickerDialog = dialog}
                    dataSet={multiItemPickerData}
                    defaultSelectedValue={multiItemPickerDefaultData}
                    onPick={this._onPickerConform}
                    title="自由组合"
                    itemStyle={styles.pickerItem}
                    buttonStyle={styles.pickerBtn}
                    topLineStyle={styles.singleItemPickTopLineStyle}
                    titleStyle={styles.singleItemPickerTitle}
                />
            </View>
        );
    }

    _onPickerConform = (selectedValue) => {
        this.setState({selectedValue: JSON.stringify(selectedValue)})
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    btn: {
        padding: 10,
        backgroundColor: '#003366',
        color: '#fff',
        fontSize: 20,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 10,
    },
    result: {
        width: width,
        height: 200,
        backgroundColor: '#000',
        color: '#fff',
        fontSize: 10,
        marginTop: 20,
        padding: 10,
    },
    singleItemPickerTitle: {
        color: 'black',
        fontSize: 20,
    },
    pickerItem: {
        color: 'red',
        fontSize: 18
    },
    pickerBtn: {
        color: '#036',
        fontSize: 18
    },
    singleItemPickTopLineStyle: {
        backgroundColor: '#0000FF',
        height: 1,
        opacity: 0.8
    },
});
