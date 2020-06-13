import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, AsyncStorage, Alert, ScrollView } from 'react-native'
import { Form, Item, Input, Label, Button } from 'native-base'


const EditContactScreen = ({ navigation, route }) => {

    const [state, setState] = useState({
        fname: "",
        lname: "",
        phone: "",
        email: "",
        address: "",
        key: ""
    })

    useEffect(() => {
        navigation.addListener("focus", () => {
            const { key } = route.params;

            //TODO: Populate State with key
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

    const updateContact = async key => {
        if (
            state.fname !== "" &&
            state.lname !== "" &&
            state.address !== "" &&
            state.phone !== "" &&
            state.email !== ""
        ) {
            var contact = {
                fname: state.fname,
                lname: state.lname,
                email: state.email,
                address: state.address,
                phone: state.phone,
            };

            await AsyncStorage.mergeItem(key, JSON.stringify(contact))
                .then(() => {
                    navigation.goBack()
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <Form>

                        <Item style={styles.inputItem}>
                            <Label>First Name</Label>
                            <Input autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="default"
                                value={state.fname}
                                onChangeText={fname => setState({ ...state, fname: fname })}
                            />
                        </Item>

                        <Item style={styles.inputItem}>
                            <Label>Last Name</Label>
                            <Input autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="default"
                                value={state.lname}
                                onChangeText={lname => setState({ ...state, lname: lname })}
                            />
                        </Item>

                        <Item style={styles.inputItem}>
                            <Label>Phone</Label>
                            <Input autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="number-pad"
                                value={state.phone}
                                onChangeText={phone => setState({ ...state, phone: phone })}
                            />
                        </Item>

                        <Item style={styles.inputItem}>
                            <Label>Email</Label>
                            <Input autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="default"
                                value={state.email}
                                onChangeText={email => setState({ ...state, email: email })}
                            />
                        </Item>

                        <Item style={styles.inputItem}>
                            <Label>Address</Label>
                            <Input autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="default"
                                value={state.address}
                                onChangeText={address => setState({ ...state, address: address })}
                            />
                        </Item>

                    </Form>

                    <Button
                        full
                        rounded
                        style={styles.button}
                        onPress={() => updateContact(state.key)}
                    >
                        <Text style={styles.buttonText}>Update</Text>
                    </Button>

                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

export default EditContactScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 10
    },
    inputItem: {
        margin: 10
    },
    button: {
        backgroundColor: "#B83227",
        marginTop: 40
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    }
});
