import React, { useState, useEffect } from 'react'
import { View, Button, Text, ImageBackground, StyleSheet, FlatList, SafeAreaView, ScrollView } from "react-native"
import { SearchBar } from 'react-native-elements'
import Constants from 'expo-constants'
import { IFood, Category } from '../Models/IFood'
import Moment from 'moment'

export default function Inventory({ navigation }: any) {

    //const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);

    const getFoodFromApi = async () => {
        //exp://192.168.0.109:19000
        //return fetch('http://10.0.0.4:45455/api/food', {
        return fetch('http://192.168.0.109:45455/api/food', {
            mode: 'no-cors',
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Origin: 'no-cors'
            }
        })
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.log(error))
            .finally(() => console.log(data));
    }

    useEffect(() => {
        getFoodFromApi()
    }, [])

    const [food, setFood] = useState<IFood[]>([
        {
            id: 1,
            title: 'Milk',
            category: Category.Fridge,
            bestBefore: new Date()
        },
        {
            id: 2,
            title: 'Catsticks',
            category: Category.Freezer,
            bestBefore: new Date()
        },
        {
            id: 3,
            title: 'Third Item',
            category: Category.Fridge,
            bestBefore: new Date()
        },
        {
            id: 4,
            title: 'Fourth Item',
            category: Category.Fridge,
            bestBefore: new Date()
        },
        {
            id: 5,
            title: 'Fifth Item',
            category: Category.Fridge,
            bestBefore: new Date()
        },
        {
            id: 6,
            title: 'Sixth Item',
            category: Category.Fridge,
            bestBefore: new Date()
        },
        {
            id: 7,
            title: 'Seventh Item',
            category: Category.Fridge,
            bestBefore: new Date()
        },
    ])
    let [search, setSearch] = useState('')
    const updateSearch = (search: string) => { setSearch(search) }

    const getCategory = (category: number) => {
        if (category === 0) {
            return "Kyl"
        }
        if (category === 1) {
            return "Frys"
        }
        if (category === 2) {
            return "Skafferi"
        }
    }

    const getDate = (date: Date) => {
        Moment.locale('en');
        return Moment(date).format('DD-MM-YY')
    }

    const Item = ({ title, category }: any, date: Date) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <Text>{getCategory(category)}</Text>
            <Text>{getDate(date).toString()}</Text>
        </View>
    );

    const renderItem = ({ item }: any) => (
        <Item title={item.title} category={item.category} date={item.bestBefore.toString()} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingHorizontal: 30 }}>
                <View style={{ marginVertical: 20 }}>
                    <SearchBar
                        placeholder="Search for food..."
                        onChangeText={updateSearch}
                        value={search}
                        containerStyle={{
                            marginVertical: 20
                        }}
                        lightTheme={true}
                    />

                    <Button title="Add food"
                        color={'#D95459'}
                        onPress={() => navigation.navigate('Add Food')} />
                    {/* <View style={{ marginVertical: 20 }}>
                        <Button
                            color={'#AF464E'}
                            title='Load food'
                            onPress={() => getFoodFromApi()} />
                    </View> */}
                </View>
            </View>
            <View>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: Constants.statusBarHeight,
    },
    item: {
        backgroundColor: '#ebebeb',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 18,
    },
})