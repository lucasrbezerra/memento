import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
Icon.loadFont();

export function HeaderBack({ onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        underlayColor="#6B5362"
        style={styles.dots}
        onPress={onPress}>
        <Icon name="arrow-back" size={30} color="#D8D2C0" />
      </TouchableOpacity>
      <Text style={styles.title}>Memento</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#543846',
    padding: 10,
  },
  title: {
    fontFamily: 'Nunito-Black',
    color: '#D8D2C0',
    fontSize: 28,
    marginLeft: wp('23%'),

  },
  dots: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
