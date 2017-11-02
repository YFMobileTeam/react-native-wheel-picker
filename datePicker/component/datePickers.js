import React, {Component} from 'react'
import {
    TouchableWithoutFeedback,
    View,
    Text,
    Platform,
    Dimensions,
} from 'react-native'
import DatePicker from './datePicker'
import {getYear, getMonth, getDay, getDayGroup} from './util'

export default class DatePickers extends Component {

    yearGroup = []
    formatCharacter = ''

    constructor(props) {
        super(props)
        this.yearGroup = props.yearData
        const {formatCharacter = ''} = props
        this.formatCharacter = formatCharacter
        this.state = {
            selectedYear: getYear(props.nowDate),
            selectedMonth: getMonth(props.nowDate),
            selectedDay: getDay(props.nowDate),
            monthGroup: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            dayGroup: getDayGroup(props.nowDate),
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.nowDate && nextProps.nowDate != this.props.nowDate) {
            this.setState({
                selectedYear: getYear(nextProps.nowDatee),
                selectedMonth: getMonth(nextProps.nowDate),
                selectedDay: getDay(nextProps.nowDate),
            })
        }
    }

    getNewDate = () => {
        const {selectedYear, selectedMonth, selectedDay} = this.state
        if(this.formatCharacter.length === 0 || this.formatCharacter === undefined) {
            
            return new Date(`${selectedYear}-${selectedMonth}-${selectedDay}`).getTime()
        } 
        return `${selectedYear}${this.formatCharacter}${selectedMonth}${this.formatCharacter}${selectedDay}`
    }
    changeYear = (value) => {
        const {selectedMonth, selectedDay} = this.state
        const dayGroup = getDayGroup(`${value}-${selectedMonth}-${selectedDay}`)
        this.setState({
            selectedYear: value,
            dayGroup,
            selectedDay: dayGroup.findIndex(d => d === selectedDay) > -1 ? selectedDay : dayGroup[dayGroup.length - 1]
        })
    }
    changeMonth = (value) => {
        const {selectedYear, selectedDay} = this.state
        let data = value.toString()
        if (data.length === 1) {
            data = `0${value}`
        }
        const dayGroup = getDayGroup(`${selectedYear}-${value}-${selectedDay}`)
        this.setState({
            selectedMonth: data,
            dayGroup,
            selectedDay: dayGroup.findIndex(d => d === selectedDay) > -1 ? selectedDay : dayGroup[dayGroup.length - 1]
        })
    }
    changeday = (value) => {
        let data = value.toString()
        if (data.length === 1) {
            data = `0${value}`
        }
        this.setState({
            selectedDay: data
        })
    }

    render() {
        const {
            Styles,
            itemStyle
        } = this.props
        const {
            monthGroup,
            dayGroup,
            selectedYear,
            selectedMonth,
            selectedDay,
        } = this.state
        // console.warn(`this.yuarGroup=${JSON.stringify(this.yuarGroup)}`)
        const isAndroid = Platform.OS === 'ios' ? {} : { height: 200, maxHeight: 300}
        return (
            <View style={[Styles.pickerWrap, isAndroid]}>
                <DatePicker
                    keyString='selectedYear'
                    Styles={Styles}
                    itemStyle={itemStyle}
                    group={this.yearGroup}
                    value={selectedYear}
                    onChange={this.changeYear}
                />
                <DatePicker
                    keyString='selectedMonth'
                    Styles={Styles}
                    itemStyle={itemStyle}
                    group={monthGroup}
                    value={selectedMonth}
                    onChange={this.changeMonth}
                />
                <DatePicker
                    keyString='selectedDay'
                    Styles={Styles}
                    itemStyle={itemStyle}
                    group={dayGroup}
                    value={selectedDay}
                    onChange={this.changeday}
                />
            </View>
        )
    }
}