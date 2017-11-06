import React, {Component} from 'react'
import {
    TouchableOpacity,
    Text,
    View,
    Dimensions,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native'
import {DateModal, DatePickers, DatePickerHead} from './component'
import Styles from './style'
import moment from 'moment'

let nextID = 1

export default class DateTimePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalName: this.makeName(),
            nowDate: props.selectData ? moment(props.selectData).format('YYYY-MM-DD') : "",
            showModal: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.changeData && nextProps.changeData !== this.props.changeData) {
            this.setState({nowDate: nextProps.changeData.format('YYYY-MM-DD')})
        }
    }

    makeName() {
        return `modal-${nextID++}`
    }

    showDialog = () => {
        if (this.state.openModal === this.state.modalName) {
            this.closeModal()
        } else {
            this.openModal(this.state.modalName);
        }
    }
    openModal = (modalName) => {
        this.setState({openModal: modalName})
    }
    closeModal = () => {
        this.setState({openModal: ''})
    }
    clickModal = () => {
        if (!this.props.keepShowModal) {
            this.closeModal()
        }
    }
    finishPicker = () => {
        const nowDate = this.pickerRef.getNewDate()
        this.setState({openModal: '', nowDate})
        this.props.onChange && this.props.onChange(nowDate)
    }

    render() {
        const {
            modalColor,
            itemStyle,
            buttonStyle,
            titleStyle,
            cancleText,
            title,
            finishText,
            type,
            yearData,
            formatCharacter,
        } = this.props
        const {nowDate, openModal, modalName} = this.state
        return (
            <DateModal
                Styles={Styles}
                onPress={this.clickModal}
                visible={openModal === modalName}
                modalColor={modalColor}
            >
                <View>
                    <DatePickerHead
                        Styles={Styles}
                        cancle={this.closeModal}
                        finish={this.finishPicker}
                        buttonStyle={buttonStyle}
                        titleStyle={titleStyle}
                        cancleText={cancleText}
                        title={title}
                        finishText={finishText}
                    />
                    <DatePickers
                        ref={r => this.pickerRef = r}
                        yearData={yearData}
                        Styles={Styles}
                        formatCharacter={formatCharacter}
                        itemStyle={itemStyle}
                        nowDate={nowDate || moment(new Date).format('YYYY-MM-DD')}
                        type={type}
                        cursorColor='blue'
                    />
                </View>
            </DateModal>
        )
    }
}