import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Platform, ScrollView, TouchableOpacity, Linking, Alert, AsyncStorage } from 'react-native'
import { Card, CardItem } from 'native-base'
import { Entypo } from '@expo/vector-icons'

const ViewContactScreen = ({ navigation, route }) => {

    const [state, setState] = useState({
        fname: "Dummy",
        lname: "Dummy",
        email: "Dummy",
        phone: "Dummy",
        address: "Dummy",
        key: "Dummy"
    })

    useEffect(() => {

        navigation.addListener("focus", () => {
            const { key } = route.params;

            getContact(key)
        })
    }, [])

    const getContact = async key => {
        await AsyncStorage.getItem(key)
            .then(contactjsonString => {
                var contact = JSON.parse(contactjsonString)
                contact["key"] = key
                // setState({...state,fname:contact.fname,lname:contact.lname,email:contact.email,address:contact.address})
                setState(contact);
            })
            .catch(err => console.log(err))
    }

    const callAction = (phone) => {
        let phoneNumber = phone;
        if (Platform.OS !== "android") {
            phoneNumber = `telpromt:${phone}`
        } else {
            phoneNumber = `tel:${phone}`
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Phone number is not available');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err))
    }

    const smsAction = phone => {
        let phoneNumber = phone;
        phoneNumber = `sms:${phone}`
        //Platform.OS === "ios" ? "&" : "?";
        //`sms:${phone}${getSMSDivider()}body=${body}`
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Phone number is not available');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err))
    }

    const editContact = (key) => {
        navigation.navigate("EditContact", {
            key: key
        })
    }

    const deleteContact = (key) => {
        Alert.alert(
            "Delete Contact ?",
            `${state.fname} ${state.lname} `,
            [
                {
                    text: "Cancel", onPress: () => console.log("Cancel Pressed")
                },
                {
                    text: "Confirm",
                    onPress: async () => {
                        await AsyncStorage.removeItem(key)
                            .then(() => {
                                navigation.goBack()
                            })
                            .catch(err => console.log(err))
                    }
                }
            ]
        )
    }
    return (
        <ScrollView style={styles.container}>

            <View style={styles.contactIconContainer}>
                <Text style={styles.contactIcon}> {state.fname[0].toUpperCase()}</Text>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}> {state.fname} {state.lname}</Text>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Card>
                    <CardItem bordered>
                        <Text style={styles.infoText}>Phone : {state.phone}</Text>
                    </CardItem>
                </Card>

                <Card>
                    <CardItem bordered>
                        <Text style={styles.infoText}>Email : {state.email}</Text>
                    </CardItem>
                </Card>

                <Card>
                    <CardItem bordered>
                        <Text style={styles.infoText}>Address : {state.address}</Text>
                    </CardItem>
                </Card>

            </View>

            <View style={styles.functionalityIcons}>

                <Card style={styles.editDelete}>
                    <CardItem bordered style={styles.actionButton}>

                        <TouchableOpacity
                            onPress={() => {
                                editContact(state.key)
                            }}
                        >
                            <Entypo
                                name="edit" size={50} color="#b83227"
                            />
                            <Text style={styles.actionText}> Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                deleteContact(state.key)
                            }}
                        >
                            <Entypo
                                name="trash" size={50} color="#b83227"
                            />
                            <Text style={styles.actionText}>Delete</Text>
                        </TouchableOpacity>

                    </CardItem>
                </Card>

                <Card style={styles.actionContainer}>
                    <CardItem bordered style={styles.actionButton}>

                        <TouchableOpacity
                            onPress={() => {
                                callAction(state.phone)
                            }}
                        >
                            <Entypo
                                name="phone" size={50} color="#b83227"
                            />
                            <Text style={styles.actionText}> Call</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                smsAction(state.phone)
                            }}
                        >
                            <Entypo
                                name="message" size={50} color="#b83227"
                            />
                            <Text style={styles.actionText}> SMS</Text>
                        </TouchableOpacity>

                    </CardItem>
                </Card>

            </View>
        </ScrollView>
    )
}

export default ViewContactScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    contactIconContainer: {
        height: 200,
        backgroundColor: "#B83227",
        alignItems: "center",
        justifyContent: "center"
    },
    contactIcon: {
        fontSize: 100,
        fontWeight: "bold",
        color: "#fff"
    },
    nameContainer: {
        width: "100%",
        height: 70,
        padding: 10,
        backgroundColor: "rgba(255,255,255,0.5)",
        justifyContent: "center",
        position: "absolute",
        bottom: 0
    },
    name: {
        fontSize: 24,
        color: "#000",
        fontWeight: "900"
    },
    infoText: {
        fontSize: 18,
        fontWeight: "300"
    },
    functionalityIcons: {

        bottom: 0
    },
    editDelete: {
        flexDirection: "row"

    },
    actionContainer: {


        flexDirection: "row"
    },
    actionButton: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center"
    },
    actionText: {
        color: "#B83227",
        fontWeight: "900",
        fontSize: 18
    }
});