/**
 * Created by otto on 2017/10/11.
 */
import React, {Component, PropTypes} from 'react'
import {
    TouchableOpacity,
    Text,
    View,
    Dimensions,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native'
import {DateModal, DatePickerHead} from './component'
import ItemPicker from './component/itemPicker'
import Styles from './style'

let nextID = 1

export default class SingleItemPicker extends Component {


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
        modalColor:'#0000'
    }

    constructor(props) {
        super(props)
        const {defaultSelectedValue, dataSet} = this.props
        this.state = {
            modalName: this.makeName(),
            showModal: '',
            selectedValue: defaultSelectedValue || (dataSet && dataSet[0])
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
        const {selectedValue, openModal, modalName} = this.state
        return (
            <DateModal
                Styles={Styles}
                onPress={this.clickModal}
                visible={openModal === modalName}
                modalColor={modalColor}
            >
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
                    <ItemPicker
                        keyString='selectedItem'
                        Styles={Styles}
                        itemStyle={itemStyle}
                        group={dataSet}
                        value={selectedValue}
                        onChange={this._onChange}
                    />
                </View>
            </DateModal>
        )
    }

    _onChange = (value) => {
        const {dataSet} = this.props
        const target = dataSet.filter(e => e.value === value)
        if (target && target.length > 0) {
            this.setState({
                selectedValue: target[0]
            })
        }
    }
}