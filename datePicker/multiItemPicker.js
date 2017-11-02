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
import index from "./style/index";

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
        this.state = {
            modalName: this.makeName(),
            showModal: '',
            selectedValue: defaultSelectedValue || this._initDefaultValue(dataSet)
        }
    }

    /*componentWillReceiveProps(nextProps) {
        if (nextProps.changeData && nextProps.changeData !== this.props.changeData) {
            this.setState({nowDate: nextProps.changeData.format('YYYY-MM-DD')})
        }
    }*/

    _initDefaultValue = (dataSet) => {
        const defaultValueArray = []
        dataSet.map(e => defaultValueArray.push(e[0]))
        return defaultValueArray
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
        const {selectedValue, openModal, modalName} = this.state
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
                        {
                            dataSet.map((e, index) => {
                                return <ItemPicker
                                    keyString={`column_${index}`}
                                    Styles={Styles}
                                    itemStyle={itemStyle}
                                    group={e}
                                    value={selectedValue[index]}
                                    onChange={(value) => {
                                        this._onChange(index, value)
                                    }}
                                />
                            })
                        }
                    </View>
                </View>
            </DateModal>
        )
    }

    _onChange = (columnIndex, value) => {
        const {selectedValue: currentSelectedValue} = this.state
        const {dataSet} = this.props
        const target = dataSet[columnIndex].filter(e => e.value === value)
        let selectedValue = undefined
        if (target && target.length > 0) {
            selectedValue = target[0]
        } else {
            selectedValue = dataSet[columnIndex][0]
        }
        currentSelectedValue[columnIndex] = selectedValue
        this.setState({
            selectedValue: currentSelectedValue
        })
    }
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})