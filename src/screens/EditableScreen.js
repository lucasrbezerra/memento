import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import { DeleteButton } from '../components/DeleteButton';
import { ClearTextButton } from '../components/ClearTextButton';
import { AddNote } from '../components/AddNote';
import { SaveButton } from '../components/SaveButton';
import { updateNote } from '../database/CRUD';
import { HeaderBack } from '../components/HeaderBack';
import {
  showNotificationRoutine,
  showNotificationDate,
  handleCancel,
  handleCancelAllNotification,
} from '../notification/notification.android';

export function EditableScreen({ item, Close }) {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [annotations, setAnnotations] = useState(item.annotations);
  const [notif, setNotif] = useState(item.notifications);
  const [note, setNote] = useState('');

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
  }

  async function handleSave() {
    const data = {
      title: title,
      description: description,
      annotations: annotations,
    };

    if (notif.length > 0) {
      let _id = notif[i].id;
      let _date = notif[i].date;

      if (item.routine) {
        for (let i = 0; i < notif.length; i++) {
          handleCancel(_id);
          showNotificationRoutine(_id, title, description, _date);
        }
      } else {
        handleCancel(_id);
        showNotificationDate(_id, title, description, _date);
      }
    }
    await updateNote(item, data);
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
    <View style={styles.container}>
      <HeaderBack onPress={Close} />
      <ScrollView>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Título</Text>
          <TextInput
            placeholder="Coloque um título para a anotação"
            placeholderTextColor="#8FA7B2"
            value={title}
            onChangeText={setTitle}
            selectionColor="#543846"
            style={styles.titleForm}
          />
        </View>

        <View style={styles.descriptionView}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.descriptionText}>Descrição</Text>
            <Text style={styles.observationText}>Máximo de 100 caracteres</Text>
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
        </View>

        <Divider style={styles.divider} />

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFC5B2',
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
  descriptionView: {
    marginTop: 16,
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
  descripContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  noteContainer: {
    flex: 1,
  },
});
