import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { deleteNote } from '../database/CRUD';
import { Divider } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  showNotificationRoutine,
  showNotificationDate,
  handleCancel,
} from '../notification/notification.android';
Icon.loadFont();
import { NotificationDetails } from './NotificationDetails';

export function HeaderDetails({ item, onPress, onEdit }) {
  const [openDots, setOpenDots] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  async function handleDelete() {
    for (let i = 0; i < item.notifications.length; i++) {
      handleCancel(item.notifications[i].id);
    }
    await deleteNote(item);
    onPress();
  }

  async function handleEdit() {
    onEdit(true);
    setOpenDots(false);
  }

  const onNotification = () => {
    setOpenTime(true);
    setOpenDots(false);
  }

  const Close = () => {
    setOpenTime(false);
  }

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
        style={styles.dots}
        onPress={() => setOpenDots(true)}>
        <Icon name="more-vert" size={30} color="#D8D2C0" />
      </TouchableOpacity>

      <Modal
        isVisible={openDots}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackButtonPress={() => setOpenDots(false)}
        onBackdropPress={() => setOpenDots(false)}
        transparent={true}
        backdropOpacity={0}
        backdropTransitionOutTiming={0}>
        <View style={styles.dotsModal}>
          <TouchableOpacity
            underlayColor="#6B5362"
            style={styles.cases}
            onPress={() => handleDelete()}>
            <Text style={styles.text}>Excluir</Text>
          </TouchableOpacity>

          <TouchableOpacity
            underlayColor="#6B5362"
            style={styles.cases}
            onPress={() => handleEdit()}>
            <Text style={styles.text}>Editar</Text>
          </TouchableOpacity>

          <Divider style={styles.divider} />

          <TouchableOpacity
            underlayColor="#6B5362"
            style={styles.cases}
            onPress={onNotification}>
            <Text style={styles.text}> Notificação </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={openTime}
        animationIn="fadeIn"
        animationOut="fadeOut"
        transparent={true}
        backdropOpacity={0}
        >
        <NotificationDetails
          onClose={Close}
          item={item}
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
  dotsModal: {
    flex: 1,
    marginLeft: wp('65%'),
    marginBottom: hp('70%'),
    marginRight: -10,
    backgroundColor: '#6B5362',
  },
  dots: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cases: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: '#543846',
    height: 1,
    marginLeft: 5,
    marginRight: 5,
  },
});
