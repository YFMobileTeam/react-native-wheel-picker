import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
    picker: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 260,
        backgroundColor: '#fff',
    },
    pickerView: {
        height: 260,
        backgroundColor: '#fff',
    },
    pickerWrap: {
        flexDirection: 'row',
    },
    pickerWheel: {
        flex: 1,
    },
    pickerToolbar: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    pickerCancelBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 15
    },
    pickerTitle: {
        flex: 4,
        color: 'black',
        textAlign: 'center'
    },
    pickerFinishBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 15
    },
    pickerFinishBtnText: {
        fontSize: 16,
        color: '#FE751D'
    }
});
