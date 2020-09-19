import React, { useState } from 'react'
import { View, ImageBackground, Button, Text, StyleSheet } from "react-native"

export default function Home({ navigation }: any) {

    const image = { uri: "https://cdn5.f-cdn.com/contestentries/1465388/27319887/5c437042565d6_thumb900.jpg" }
    const [outputText, setOutputText]
        = useState('Welcome to FoodStacks!')

    return (
        <View style={{
            flex: 1, backgroundColor: '#fff',
            paddingTop: 140
            //justifyContent: "center" 
        }} >
            <View style={{ paddingHorizontal: 30 }}
            >
                <View>
                    <Text style={styles.text}>{outputText}</Text>
                    <Button
                        color={'#D95459'}
                        title="Inventory"
                        onPress={() => navigation.navigate('Inventory')}
                    />
                </View>
                <View style={{ marginVertical: 20 }}>
                    <Button
                        color={'#AF464E'}
                        title='Add food'
                        onPress={() => navigation.navigate('Add Food')} />
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
    },
})