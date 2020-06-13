import React, { useState } from 'react'
import { StyleSheet, Text, View, Keyboard, Alert, TouchableWithoutFeedback, ScrollView } from 'react-native'
//import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base'

const AddContactScreen = ({ navigation }) => {

    const [state, setState] = useState({
        fname: "",
        lname: "",
        phone: "",
        email: "",
        address: ""
    })

    const saveContact = async () => {
        if (
            state.fname !== "" &&
            state.lname !== "" &&
            state.phone !== "" &&
            state.email !== "" &&
            state.address !== ""
        ) {
            //Create Contact Object
            var contact = {
                fname: state.fname,
                lname: state.lname,
                phone: state.phone,
                email: state.email,
                address: state.address
            }


            let jsonValue = JSON.stringify(contact)
            await AsyncStorage.setItem(Date.now().toString(), jsonValue)
                .then(() => {
                    navigation.goBack()//Going back to home
                })
                .catch(error => {
                    console.log(error)
                    Alert.alert("Failed to save contact")
                })



        } else {
            Alert.alert("All fields are required !!")
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
            <ScrollView style={styles.container}>

                <Form>
                    <Item style={styles.inputItem}>
                        <Label>First Name</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="default"
                            onChangeText={fname => setState({ ...state, fname: fname })}
                        />
                    </Item>

                    <Item style={styles.inputItem}>
                        <Label>Last Name</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="default"
                            onChangeText={lname => setState({ ...state, lname: lname })}
                        />
                    </Item>

                    <Item style={styles.inputItem}>
                        <Label>Phone</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="number-pad"
                            onChangeText={phone => setState({ ...state, phone: phone })}
                        />
                    </Item>

                    <Item style={styles.inputItem}>
                        <Label>Email</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={email => setState({ ...state, email: email })}
                        />
                    </Item>

                    <Item style={styles.inputItem}>
                        <Label>Address</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="default"
                            onChangeText={address => setState({ ...state, address: address })}
                        />
                    </Item>
                </Form>

                <Button style={styles.button} full onPress={() => { saveContact() }}>
                    <Text style={styles.buttonText} >Save</Text>
                </Button>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default AddContactScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 10,
        height: "100%"
    },
    inputItem: {
        margin: 10
    },
    button: {
        backgroundColor: "#B83227",
        marginTop: 40,
        borderRadius: 20
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    },
    empty: {
        height: 500,
        backgroundColor: "#FFF"
    }
});
