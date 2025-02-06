import { Modal, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Portal, Surface, Text, useTheme } from 'react-native-paper'
import useAuthStore from 'store/AuthStore'
import Login from './login';

export default function Debug() {
  const { user } = useAuthStore();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <View>
      <ScrollView className='p-2 m-2'>
        <Surface>
          <Text>{JSON.stringify(user, null, 2)}</Text>
          <Portal>
            <Modal visible={visible} onDismiss={hideModal} >
              <Text>Example Modal.  Click outside this area to dismiss.</Text>
              <Button onPress={hideModal}>Dismiss</Button>
              <Login />
            </Modal>
          </Portal>
          <Button mode="contained-tonal" onPress={showModal}>Open Modal</Button>
        </Surface>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})