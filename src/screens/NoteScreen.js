import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Modal, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {DetailsScreen} from './DetailsScreen';
import {CreateScreen} from './CreateScreen';
import {AddButton} from '../components/AddButton';
import{ Card }from '../components/Card';
import getRealm from '../database/realm';
import {deleteAll} from '../database/CRUD';

export function NoteScreen({query}) {
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalDetailsOpen, setModalDetailsOpen] = useState(false);
  const [item, setItem] = useState();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState(query);

  const CloseCreate = () => {
    setModalCreateOpen(false);
  };

  const CloseDetails = () => {
    setModalDetailsOpen(false);
  };

  const onOpen = (item) => {
    setModalDetailsOpen(true);
    setItem(item);
  };

  async function loadNotes() {
    const realm = await getRealm();
    const data = realm.objects('Note').filtered(`checked = ${false}`);

    if (search != '') {
      let lowerCaseQuery = search.toLowerCase();
      let newClients = data.filter((data) =>
        data.title.toLowerCase().includes(lowerCaseQuery),
      );
      setFiltered(newClients);
    } else {
      setFiltered(data);
    }
  }

  const handleReload = () => {
    loadNotes();
  };

  useFocusEffect(
    React.useCallback(() => {
      loadNotes();
    }, []),
  );

  return (
    <View style={styles.container}>
      {filtered.length != 0 ? (
        <FlatList
          data={filtered}
          refreshing={false}
          onRefresh={handleReload}
          renderItem={({item, index}) => (
            <Card
              onPress={() => onOpen(item)}
              index={index}
              item={item}
              reload={handleReload}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={{flex: 1}}>
          <Text style={styles.textVoid}>Você não possui nenhuma anotação.</Text>
          <Text style={styles.subtextVoid}>Crie uma agora!</Text>
        </View>
      )}

      <Modal visible={modalCreateOpen} animationType="fade">
        <CreateScreen Close={CloseCreate} />
      </Modal>

      <Modal visible={modalDetailsOpen} animationType="fade">
        <DetailsScreen item={item} Close={CloseDetails} />
      </Modal>

      <AddButton onPress={() => setModalCreateOpen(true)} size={28} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFC9B8',
  },
  title: {
    color: 'black',
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
  textVoid: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#6B5362',
    marginTop: 190,
    alignSelf: 'center',
  },
  subtextVoid: {
    color: '#6B5362',
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    alignSelf: 'center',
  },
});
