import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList } from 'react-native'
//import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
import { Card } from 'native-base'
import { Entypo } from '@expo/vector-icons';

const HomeScreen = ({ navigation, route }) => {

    const [data, setData] = useState([])

    const getAllContact = async () => {
        await AsyncStorage.getAllKeys()
            .then(keys => {
                //console.log(keys);
                return AsyncStorage.multiGet(keys)
                    .then(result => {
                        setData([result])
                        // setData(data.sort(function (a, b) {
                        //     if (JSON.parse(a[1]).fname < JSON.parse(b[1]).fname) {
                        //         return -1;
                        //     }
                        //     if (JSON.parse(a[1]).fname > JSON.parse(b[1]).fname) {
                        //         return 1;
                        //     }
                        //     return 0;
                        // }))
                        //console.log(data[0]);
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

        //console.log(data);

    }

    useEffect(() => {

        navigation.addListener("focus", () => {
            getAllContact()
        })
    }, [])


    //TODO: No contacts saved
    return (
        <View style={styles.container}>
            <FlatList
                data={data[0]}/*As it was inside array of array */
                renderItem={({ item }) => {
                    let contact = JSON.parse(item[1])
                    console.log(contact);

                    return (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("ViewContact", {
                                    key: item[0].toString()
                                })
                            }}
                        >
                            <Card style={styles.listItem}>
                                <View style={styles.iconContainer}>
                                    <Text style={styles.contactIcon}>
                                        {contact.fname[0].toUpperCase()}
                                    </Text>
                                </View>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.infoText}>
                                        {contact.fname} {contact.lname}
                                    </Text>

                                    <Text style={styles.infoText}>{contact.phone} {contact.email}</Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item) => item[0].toString()}
            />

            <TouchableOpacity style={styles.floatButton} onPress={() => navigation.navigate("AddContact")}>
                <Entypo name="plus"
                    size={30}
                    color="#FFF"
                />
            </TouchableOpacity>

        </View>
    )
}

export default HomeScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    listItem: {
        flexDirection: "row",
        padding: 20,
        borderRadius: 10
    },
    iconContainer: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#B83227",
        borderRadius: 100
    },
    contactIcon: {
        fontSize: 28,
        color: "#fff"
    },
    infoContainer: {
        flexDirection: "column"
    },
    infoText: {
        fontSize: 16,
        fontWeight: "400",
        paddingLeft: 10,
        paddingTop: 2
    },
    floatButton: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        position: "absolute",
        bottom: 10,
        right: 10,
        height: 60,
        backgroundColor: "#B83227",
        borderRadius: 50
    }
});
