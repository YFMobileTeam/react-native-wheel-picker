# react-native-wheel-picker

### react-native-wheel-picker-free
> 为什么叫react-native-wheel-picker-free？\
> 因为npm仓库上已经有叫react-native-wheel-picker的滚轮选择器了。

> 为什么创建react-native-wheel-picker-free？\
> 之前的项目中有日期选择的场景，用到github上一个react-native-picker的组件。但是在android平台上有bug，且仅仅支持日期选择的场景，为了扩展其他场景，如单列，双列等，在现有组件的基础上建立react-native-wheel-picker-free。

> github地址 

#### 安装
```
$ npm i --save react-native-wheel-picker-free
$ react-native link react-native-wheel-picker-free
```
#### 使用
> react-native-wheel-picker-free一共导出4个组件：\
> ```DatePicker``` ```SingleItemPicker``` ```DualItemPicker``` ```MultiItemPicker``` 

> ```DatePicker```使用示例如下
```javascript
const dateData = []

for (let i = 1900; i < 2050; i++) {
    dateData.push(i.toString())
}

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

//_onPickerConform 返回 '2017-11-11'
```

![date-picker截图](https://bytebucket.org/Kimhuang_hz/resource/raw/db35b06d5c79ed1f54633ca14be0dd46d8d0a2fa/%E7%9F%A5%E8%8D%AF/v1.3/react-native-wheel-picker-free-date.png)

> ```MultiItemPicker```使用示例
```javascript
const timerData = 

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

const defaultValue = [
    {label: `${hourStr}时`, value: `${hourStr}`},
    {label: `${minuteStr}时`, value: `${minuteStr}`},
    {label: `${secondStr}时`, value: `${secondStr}`}
]
Object.assign(timerData, {time: time, defaultValue: defaultValue})

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
```

> 如上述示例，数据项的结构是固定的
```json
{"label":"labelValue","value":"value"}
```
> 数据源是一个二维数组，二维数组的长度即为滚轮的列数，每个元素的长度即为对应列的数据长度。组件的返回值如上述```defaultValue```所示，长度对应```dataSet```的长度。\
> 因此```SingleItemPicker```和```DualItemPicker```的使用场景包含在```MultiItemPicker```中，故都被标记为过期。而```DatePircker```涉及到数据列的联动，故未使用```MultiItemPicker```替代。

![time-截图](https://bytebucket.org/Kimhuang_hz/resource/raw/db35b06d5c79ed1f54633ca14be0dd46d8d0a2fa/%E7%9F%A5%E8%8D%AF/v1.3/react-native-wheel-picker-free-time.png)

#### TODO

> react-native-wheel-picker-free在一些使用场景如时间选择，性别选择，年龄等场景下使用存在不便，可以封装的更好以减少使用者的工作。
