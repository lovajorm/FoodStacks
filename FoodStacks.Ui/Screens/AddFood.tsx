import React, { useState } from 'react'
import { View, StyleSheet, Platform, TextInput, Keyboard, Text } from "react-native"
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import DateTimePicker from '@react-native-community/datetimepicker'
import { IFood, Category } from '../Models/IFood'
import Moment from 'moment'

export default function AddFood({ navigation }: any) {

    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<any>()

    const addFoodApi = async () => {
        fetch('http://192.168.0.109:45455/api/food/add', {
            mode: 'no-cors',
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Origin: 'no-cors'
            },
            body: JSON.stringify({
                "Title": title,
                "Category": category,
                "BestBefore": date
            })
        })
            .then(response => {
                if (!response.ok) {
                    setError('Network error')
                    console.log('networkerror')
                }
                return response.json();
            })
            //.then(handleResponse)
            //.then(response => response.json())
            .then(json => setData(json))
            .catch(e => setError(e.errorMessage))
        //.finally(() => console.log(data));
    }

    let [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)

    //const [food, setFood] = useState<IFood[]>([])

    const [title, onChangeTitle] = useState('')
    const [category, onChangeCategory] = useState<number>()
    const [category1, onChangeCategory1] = useState<Category>()

    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date
        //setShow(Platform.OS === 'android' ? true : false)
        setShow(false)
        setDate(currentDate)
    }

    const showMode = (currentMode: any) => {
        setShow(true)
        setMode(currentMode)
    }

    const showDatePicker = () => {
        showMode('date')
    }

    const getDate = (date: Date) => {
        Moment.locale('en');
        return Moment(date).format('DD-MM-YY')
    }

    function onFocusDate() {
        Keyboard.dismiss()
        setShow(true)
    }

    const [color1, setColor1] = useState(false)
    const [color2, setColor2] = useState(false)
    const [color3, setColor3] = useState(false)

    function getCategory(category: any) {
        setColor1(false)
        setColor2(false)
        setColor3(false)
        if (category === 'Kyl') {
            setColor1(true)
            onChangeCategory(Category.Fridge)
        }
        if (category === 'Frys') {
            setColor2(true)
            onChangeCategory(Category.Freezer)
        }
        if (category === 'Skafferi') {
            setColor3(true)
            onChangeCategory(Category.Pantry)
        }
    }

    const categoryButtons = [
        {
            title: 'Kyl',
            pressed: color1
        },
        {
            title: 'Frys',
            pressed: color2
        },
        {
            title: 'Skafferi',
            pressed: color3
        }
    ]

    const buttons = categoryButtons.map((item, key) =>
        <View
            key={key}
            style={stylesBtn.buttonContainer}>
            <Button onPress={() => getCategory(item.title)} title={item.title}
                buttonStyle={{ backgroundColor: item.pressed ? '#AF464E' : '#D95459' }}
            />
        </View>
    )

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ paddingHorizontal: 10, paddingVertical: 30 }}>
                <View>
                    <Input placeholder='Title'
                        onChangeText={text => onChangeTitle(text)}
                        value={title}
                    />

                    <View style={stylesBtn.container}>
                        {buttons}
                    </View>

                    <View style={stylesDateTimePicker.container}>
                        <View style={stylesDateTimePicker.inputContainer}>
                            <Input
                                onFocus={onFocusDate}
                                placeholder='Best before date'
                                value={String(getDate(date))}
                                leftIcon={
                                    <Icon
                                        style={{ marginRight: 10 }}
                                        name='calendar'
                                        size={24}
                                        color='black'
                                        onPress={() => setShow(true)}
                                    />
                                }
                            />
                        </View>
                        {/* <View style={stylesDateTimePicker.buttonContainer}>
                            <Button
                                buttonStyle={{ backgroundColor: '#D95459' }}
                                onPress={() => setShow(true)} title="Show date picker" />
                        </View> */}
                    </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Button
                        buttonStyle={{ backgroundColor: '#D95459' }}
                        style={{ borderRadius: 0 }}
                        title="Add food"
                        onPress={() => addFoodApi()}
                    />
                    {(error !== undefined) && <Text>{error}{data}</Text>}
                </View>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    display="calendar"
                    onChange={onChangeDate}
                    style={{ backgroundColor: '#000' }}
                />
            )}
            <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
                <View style={{ borderRadius: 0, backgroundColor: '#D95459' }}>
                    <Button
                        buttonStyle={{ backgroundColor: '#D95459', borderRadius: 0, }}
                        title="Go to inventory" onPress={() => navigation.navigate('Inventory')} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#000',
        marginVertical: 20,
        textAlign: 'center'
    }
})

const stylesBtn = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 40
    },
    buttonContainer: {
        flex: 1,
        // borderBottomColor: '#000',
        // borderWidth: 1,
        width: 50,
        height: 50,
        paddingHorizontal: 3
    }
})
const stylesDateTimePicker = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 40
    },
    inputContainer: {
        flex: 2,
        width: 70,
        height: 50,
        paddingHorizontal: 3
    },
    buttonContainer: {
        flex: 1,
        width: 30,
        height: 50,
        paddingHorizontal: 3,
    }
})