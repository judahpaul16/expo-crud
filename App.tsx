import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

interface Item {
  id: string;
  value: string;
}

export default function App() {
  const [enteredItem, setEnteredItem] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);

  const itemInputHandler = (enteredText: string) => {
    setEnteredItem(enteredText);
  };

  const handleAddOrEditItem = () => {
    if (editItemId) {
      const updatedItems = items.map(item => {
        if (item.id === editItemId) {
          return { ...item, value: enteredItem };
        }
        return item;
      });
      setItems(updatedItems);
      setEditItemId(null);
      Alert.alert("Updated", "Item has been updated successfully.");
    } else {
      const newItem = { id: Math.random().toString(), value: enteredItem };
      setItems(currentItems => [...currentItems, newItem]);
      Alert.alert("Added", "New item added successfully.");
    }
    setIsAddMode(false);
    setEnteredItem('');
  };

  const handleDeleteItem = (itemId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
    Alert.alert("Deleted", "Item has been deleted successfully.");
  };

  const openEditModal = (itemId: string) => {
    setEditItemId(itemId);
    const editItem = items.find(item => item.id === itemId);
    setEnteredItem(editItem ? editItem.value : '');
    setIsAddMode(true);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>{item.value}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => openEditModal(item.id)}
          style={[styles.button, styles.editButton]}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeleteItem(item.id)}
          style={[styles.button, styles.deleteButton]}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={items}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.fab} onPress={() => setIsAddMode(true)}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
      <Modal visible={isAddMode} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalView}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter item"
                style={styles.input}
                onChangeText={itemInputHandler}
                value={enteredItem}
              />
              <View style={styles.modalButtons}>
                <Button title="Cancel" color="#ff6347" onPress={() => setIsAddMode(false)} />
                <Button title={editItemId ? "Update" : "Add"} onPress={handleAddOrEditItem} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listContainer: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f8f8f8',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  editText: {
    color: '#fff',
    backgroundColor: '#4CAF50', // Edit button color
  },
  deleteButton: {
    backgroundColor: '#F44336', // Delete button color
  },
  buttonText: {
    color: '#fff',
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#5e0acc',
    borderRadius: 28,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 24,
    color: 'white',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  inputContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
});
