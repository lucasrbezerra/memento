import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import { DeleteButton } from '../components/DeleteButton';
import { ClearTextButton } from '../components/ClearTextButton';
import { AddNote } from '../components/AddNote';
import { SaveButton } from '../components/SaveButton';
import { insertNote } from '../database/CRUD';
import { HeaderCreate } from '../components/HeaderCreate';
import {
  showNotificationRoutine,
  showNotificationDate,
  handleCancel,
  handleCancelAllNotification,
} from '../notification/notification.android';

export function CreateScreen({ Close }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');
  const [annotations, setAnnotations] = useState([]);
  const [week, setWeek] = useState([]);
  const [scheduled, setScheduled] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [active, setActive] = useState();

  function GenereteId() {
    var seed, d, m, y, h, min, sec, milsec, date;

    date = new Date();
    d = date.getDate().toString();
    m = date.getMonth().toString();
    y = date.getFullYear().toString();
    h = date.getHours().toString();
    min = date.getMinutes().toString();
    sec = date.getSeconds().toString();
    milsec = date.getMilliseconds().toString();

    seed = d + m + y + h + min + sec + milsec;

    return parseInt(seed);
  };

  function alarmId() {
    var seed, min, sec, milsec, date;

    date = new Date();
    min = date.getMinutes().toString();
    sec = date.getSeconds().toString();
    milsec = date.getMilliseconds().toString();

    seed = min + sec + milsec;

    return parseInt(seed);
  };

  function convertDate(date) {
    var Dat = new Date(date);

    var d = Dat.getDate();
    var m = Dat.getMonth();
    var y = Dat.getFullYear();
    var h = time.getHours();
    var min = time.getMinutes();

    var newDate = new Date(y, m, d, h, min);
    return newDate;
  };

  const onActive = useCallback(val => {
    setActive(val);
  })

  const onScheduled = useCallback((val) => {
    setScheduled(val);
  }, []);

  const onWeek = useCallback((val) => {
    setWeek(val);
  }, []);

  async function handleSave() {

    if(week.length > 0 && active){
      for(let i = 0; i < week.length; i++){
        var newNotif = {
          id: alarmId(),
          date: week[i]
        }
        notifications.push(newNotif);
        showNotificationRoutine(newNotif.id, title, description, newNotif.date);
      }
    }else if(week.length == 0 && active){
      var newNotif = {
        id: alarmId(),
        date: scheduled
      }
      notifications.push(newNotif);
      showNotificationDate(newNotif.id, title, description, newNotif.date);
    }
    
    const data = {
      id: GenereteId(),
      title: title,
      description: description,
      annotations: annotations,
      checked: false,
      favorite: false,
      notifications: notifications,
      routine: week.length > 0 ? true : false,
      active: active 
    };

    await insertNote(data);
    Close();
  }

  const handleAdd = () => {
    var newData = {
      id: GenereteId(),
      text: note,
    };
    setAnnotations([...annotations, newData]);
    setNote('');
  };

  const handleDelete = (itemDeleted) => {
    console.log(annotations.length);
    var newData = annotations.filter((_item) => {
      return _item != itemDeleted;
    });
    setAnnotations(newData);
  };

  const _update = (text, index) => {
    var texts = [];
    for (var i = 0; i < annotations.length; i++) {
      if (i == index) {
        texts.push({ id: annotations[i].id, text: text });
      } else {
        texts.push(annotations[i]);
      }
    }
    setAnnotations(texts);
  };
  
  return (
    <View style={{ flex: 1 }}>
      <HeaderCreate onPress={() => Close()} onScheduled={onScheduled} onWeek={onWeek} onActive={onActive}/>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.infoContainer}>
            <Text style={styles.titleText}>Título</Text>
            <TextInput
              placeholder="Coloque um título para a anotação"
              placeholderTextColor="#8FA7B2"
              value={title}
              onChangeText={setTitle}
              selectionColor="#543846"
              style={styles.titleForm}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 16,
              }}>
              <Text style={styles.descriptionText}>Descrição</Text>
              <Text style={styles.observationText}>
                Máximo de 100 caracteres
              </Text>
            </View>
            <TextInput
              multiline
              numberOfLines={5}
              selectionColor="#6B5362"
              maxLength={200}
              placeholder="Coloque uma breve descrição"
              placeholderTextColor="#8FA7B2"
              value={description}
              onChangeText={setDescription}
              style={styles.descriptionForm}
            />
            <Divider style={styles.divider} />
          </View>

          <View style={styles.noteContainer}>
            <Text style={styles.annotationText}>Anotações</Text>
            {annotations.map((item, index) => {
              return (
                <View key={item.id} style={styles.annotationView}>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      multiline
                      numberOfLines={2}
                      inlineImagePadding={2}
                      selectionColor="#6B5362"
                      placeholder="Faça uma anotação"
                      placeholderTextColor="#8FA7B2"
                      value={item.text}
                      onChangeText={(text) => _update(text, index)}
                      style={styles.annotationForm}
                    />
                    <DeleteButton onPress={() => handleDelete(item)} />
                  </View>
                </View>
              );
            })}
            <View style={styles.annotationView}>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  multiline
                  numberOfLines={2}
                  inlineImagePadding={2}
                  selectionColor="#6B5362"
                  placeholder="Faça uma anotação"
                  placeholderTextColor="#8FA7B2"
                  value={note}
                  onChangeText={setNote}
                  style={styles.annotationForm}
                />
                <ClearTextButton onPress={() => setNote('')} />
              </View>
            </View>
            <AddNote size={25} onPress={handleAdd} />
          </View>
          <SaveButton onPress={handleSave} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFC5B2',
  },
  infoContainer: {
    flex: 1,
  },
  noteContainer: {
    flex: 1,
  },
  titleView: {
    marginTop: 16,
  },
  titleText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#543846',
    marginLeft: 16,
    marginBottom: 4,
    marginTop: 16,
  },
  titleForm: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    backgroundColor: '#F5F8FA',
    borderWidth: 1,
    borderColor: '#D3E2E5',
    padding: 10,
    marginBottom: 3,
    borderRadius: 15,
    marginLeft: 16,
    marginRight: 16,
    color: '#543846',
  },
  descriptionText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#543846',
    marginLeft: 16,
    marginBottom: 4,
  },
  descriptionForm: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    backgroundColor: '#F5F8FA',
    borderWidth: 1,
    borderColor: '#D3E2E5',
    marginBottom: 3,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    color: '#543846',
  },
  observationText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
    color: '#6B5362',
    marginLeft: 16,
    marginBottom: 4,
  },
  annotationView: {
    marginTop: 16,
  },
  annotationText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#543846',
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  annotationForm: {
    flex: 1,
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    backgroundColor: '#F5F8FA',
    borderWidth: 1,
    borderColor: '#D3E2E5',
    marginBottom: 3,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 16,
    color: '#543846',
  },
  divider: {
    backgroundColor: '#543846',
    height: 1.5,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
  },
});
