/**
 * Created by otto on 2017/11/2.
 */

import React, {Component, PropTypes} from 'react'
import {
    TouchableOpacity,
    Text,
    View,
    Dimensions,
    TouchableWithoutFeedback,
    Platform,
    StyleSheet,
} from 'react-native'
import {DateModal, DatePickerHead} from './component'
import ItemPicker from './component/itemPicker'
import Styles from './style'

let nextID = 1

export default class DualItemPicker extends Component {


    static propTypes = {
        dataSet: PropTypes.array,
        defaultSelectedValue: PropTypes.object,
        modalColor: PropTypes.string,
        itemStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
        titleStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
        buttonStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
        topLineStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
        title: PropTypes.string,
        cancelText: PropTypes.string,
        finishText: PropTypes.string,
        touchOutsideDismiss: PropTypes.bool,
        onPick: PropTypes.func
    }

    static defaultProps = {
        cancelText: '取消',
        finishText: '确认',
        touchOutsideDismiss: true,
        modalColor: '#0000'
    }

    constructor(props) {
        super(props)
        const {defaultSelectedValue, dataSet} = this.props
        const {column0, column1} = dataSet
        this.state = {
            modalName: this.makeName(),
            showModal: '',
            selectedValue: defaultSelectedValue || {column0: column0[0], column1: column1[0]}
        }
    }

    /*componentWillReceiveProps(nextProps) {
        if (nextProps.changeData && nextProps.changeData !== this.props.changeData) {
            this.setState({nowDate: nextProps.changeData.format('YYYY-MM-DD')})
        }
    }*/

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
        if (this.props.touchOutsideDismiss) {
            this.closeModal()
        }
    }

    finishPicker = () => {
        const {selectedValue} = this.state
        this.props.onPick && this.props.onPick(selectedValue)
        this.closeModal()
    }

    render() {

        const {
            dataSet,
            modalColor,
            itemStyle,
            titleStyle,
            buttonStyle,
            topLineStyle,
            title,
            cancelText = '取消',
            finishText = '确认',
        } = this.props

        const {column0, column1} = dataSet

        const {selectedValue, openModal, modalName} = this.state
        const {column0: selected0, column1: selected1} = selectedValue
        return (
            <DateModal
                Styles={Styles}
                onPress={this.clickModal}
                visible={openModal === modalName}
                modalColor={modalColor}>
                <View>
                    <View style={topLineStyle}/>
                    <DatePickerHead
                        Styles={Styles}
                        cancle={this.closeModal}
                        finish={this.finishPicker}
                        buttonStyle={buttonStyle}
                        titleStyle={titleStyle}
                        cancleText={cancelText}
                        title={title}
                        finishText={finishText}
                    />
                    <View style={styles.content}>
                        <ItemPicker
                            keyString='column_0'
                            Styles={Styles}
                            itemStyle={itemStyle}
                            group={column0}
                            value={selected0}
                            onChange={this._onChange0}
                        />
                        <ItemPicker
                            keyString='column_1'
                            Styles={Styles}
                            itemStyle={itemStyle}
                            group={column1}
                            value={selected1}
                            onChange={this._onChange1}
                        />
                    </View>
                </View>
            </DateModal>
        )
    }

    _onChange0 = (value) => {
        const {selectedValue: currentSelectedValue} = this.state
        const {dataSet} = this.props
        const {column0} = dataSet || {}
        const target = column0.filter(e => e.value === value)
        let selectedValue = undefined
        if (target && target.length > 0) {
            selectedValue = target[0]
        } else {
            selectedValue = column0[0]
        }
        this.setState({
            selectedValue: {...currentSelectedValue, ...{column0: selectedValue}}
        })
    }

    _onChange1 = (value) => {
        const {selectedValue: currentSelectedValue} = this.state
        const {dataSet} = this.props
        const {column1} = dataSet || {}
        const target = column1.filter(e => e.value === value)
        let selectedValue = undefined
        if (target && target.length > 0) {
            selectedValue = target[0]
        } else {
            selectedValue = column1[0]
        }
        this.setState({
            selectedValue: {...currentSelectedValue, ...{column1: selectedValue}}
        })
    }
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})