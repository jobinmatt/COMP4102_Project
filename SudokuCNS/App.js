import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';
import { mapping, light, dark } from '@eva-design/eva';
import { RNCamera, } from 'react-native-camera';
import * as Permissions from 'expo-permissions';
import { PermissionsAndroid } from 'react-native';

var { windowHeight, windowWidth } = Dimensions.get('window');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraPermissions: ''
    };
    this.getCameraPermissions();
  }

  async getCameraPermissions() {
    if (Platform.OS = 'android') {
      try {
        if (this.state.cameraPermissions !== 'granted') {
          var granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: 'This application needs access to the camera to take pictures of sudoku puzzles.',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.setState({ cameraPermissions: 'granted' });
            console.log('You can use the camera');
          } else {
            console.log('Camera permission denied');
          }
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }

  render() {
    if (this.state.cameraPermissions !== 'granted') {
      return (
        <ApplicationProvider mapping={mapping} theme={dark}>
          <Layout level='3' style={styles.container}>
            <Text>Please enable camera permissions before using this application.</Text>
          </Layout>
        </ApplicationProvider>
      );
    } else {
      return (
        <ApplicationProvider mapping={mapping} theme={dark}>
          <Layout level='3' style={styles.container}>
            <Layout level='1' style={[styles.cameraContainer, { width: windowWidth, height: windowWidth }]}>
              <RNCamera></RNCamera>
            </Layout>
            <Layout level='2' style={styles.buttonContainer}>
              <Button>Capture</Button>
            </Layout>
          </Layout>
        </ApplicationProvider>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
