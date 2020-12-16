import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { NotificationCreate } from './NotificationCreate';
Icon.loadFont();

export function HeaderCreate({ onPress, onScheduled, onWeek, onActive }) {
  const [openDots, setOpenDots] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        underlayColor="#6B5362"
        style={styles.dots}
        onPress={onPress}>
        <Icon name="arrow-back" size={30} color="#D8D2C0" />
      </TouchableOpacity>
      <Text style={styles.title}>Memento</Text>
      <TouchableOpacity
        underlayColor="#6B5362"
        style={styles.notification}
        onPress={() => setOpenDots(true)}>
        <Icon name="notifications" size={30} color="#D8D2C0" />
      </TouchableOpacity>
      <Modal
        isVisible={openDots}
        animationIn="fadeIn"
        animationOut="fadeOut"
        transparent={true}
        //backdropOpacity={0}
        backdropTransitionOutTiming={0}>
        <NotificationCreate
          onScheduled={onScheduled}
          onWeek={onWeek}
          onActive={onActive}
          onClose={() => setOpenDots(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#543846',
    padding: 10,
  },
  title: {
    fontFamily: 'Nunito-Black',
    color: '#D8D2C0',
    fontSize: 28,
    marginLeft: 8,
  },
  text: {
    fontFamily: 'Nunito-Bold',
    color: '#D8D2C0',
    fontSize: 14,
  },
  notification: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
