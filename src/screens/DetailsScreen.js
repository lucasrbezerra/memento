import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, Modal } from 'react-native';
import { EditableScreen } from './EditableScreen';
import { Divider } from 'react-native-elements';
import { HeaderDetails } from '../components/HeaderDetails';
import { HeaderCreate } from '../components/HeaderCreate';

export function DetailsScreen({ item, Close }) {

  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [note, setNote] = useState('');
  const [annotations, setAnnotations] = useState(item.annotations);
  const [modalEditable, setModalEditable] = useState(false);

  const onEdit = useCallback(val => {
    setModalEditable(val);
  }, []);

  const CloseEditable = () => {
    setModalEditable(false);
  }


  return (
  <View style={{flex: 1}}>
    <HeaderDetails onEdit={onEdit} item={item} onPress={() => Close()} />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.primaryBlock}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.descriptionBlock}>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
          <Divider style={styles.div} />
          <Text style={styles.substitle}>Anotações</Text>
          <View style={styles.secundaryBlock}>
            {annotations.map((item, index) => {
              return (
                <View key={item.id} style={styles.annotationView}>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      multiline
                      editable={false}
                      numberOfLines={2}
                      inlineImagePadding={2}
                      selectionColor='#6B5362'
                      placeholder='Anotação vazia!'
                      placeholderTextColor='#8FA7B2'
                      value={item.text}
                      onChangeText={text => setNote(text)}
                      style={styles.annotationBlock}
                    />
                  </View>
                </View>
              )
            })}
          </View>
        </ScrollView>
        <Modal visible={modalEditable} animationType='fade'>
          <EditableScreen item={item} Close={CloseEditable} />
        </Modal>
      </View>
  </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFC5B2',
    margin: 8,
    borderRadius: 8,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: '#543846'
  },
  title: {
    fontFamily: 'Nunito-Black',
    fontSize: 25,
    color: "#543846",
    marginTop: 8,
    alignSelf: 'center'
  },
  substitle: {
    fontFamily: 'Nunito-Black',
    fontSize: 21,
    color: "#543846",
    marginLeft: 18,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: "#543846",
    margin: 8,
  },
  divider: {
    backgroundColor: '#543846',
    height: 1.5,
    marginLeft: 32,
    marginRight: 32,
    marginTop: 8,
    marginBottom: 8,
  },
  div: {
    backgroundColor: '#543846',
    height: 1.5,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8,
  },
  descriptionBlock: {
    borderRadius: 16,
    margin: 16
  },
  annotationBlock: {
    flex: 1,
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    backgroundColor: '#F5F8FA',
    color: '#543846',
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#543846',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
  },
});