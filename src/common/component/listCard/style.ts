import { Component } from "react"
import { StyleSheet, useColorScheme } from "react-native"

const style = StyleSheet.create({
    card : {
        width: 225,
        backgroundColor: '#4b5763ff',
        borderRadius: 6,
        margin: 10
    },
    text: {
        color: '#ffffffff'
    },
    left_component: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        margin: 4
    }
})

export default style