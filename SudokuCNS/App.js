import React from 'react';
import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';
import { mapping, light, dark } from '@eva-design/eva';
import { RNCamera, } from 'react-native-camera';
import * as Permissions from 'expo-permissions';
import { PermissionsAndroid } from 'react-native';

const GRANTED = 'granted';
const DENIED = 'denied';
var { windowHeight, windowWidth } = Dimensions.get('window');


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraPermissions: GRANTED //TODO: setting to Granted to bypass screen for now
    };
    // this.getCameraPermissions();
  }

  async getCameraPermissions() {
    if (Platform.OS = 'android') {
      try {
        if (this.state.cameraPermissions !== GRANTED) {
          var granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: 'This application needs access to the camera to take pictures of sudoku puzzles.',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.setState({ cameraPermissions: GRANTED });
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
    if (this.state.cameraPermissions !== GRANTED) {
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
          <Layout>
            {Platform.OS === 'ios' && <StatusBar barStyle={'default'}/>}
            {Platform.OS === 'android' && <Layout style={{ marginTop: StatusBar.currentHeight }} />}
          </Layout>
          <Layout level='3' style={styles.container}>
            <Layout level='1' style={styles.cameraContainer}>
              {/* <RNCamera style={[styles.camera, { width: windowWidth, height: windowWidth }]}></RNCamera> */}
            </Layout>
            <Layout level='2' style={styles.buttonContainer}>
              <Button style={styles.button}>Capture</Button>
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
    margin: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    borderRadius: 10,
  },
  buttonContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    padding: 8,
    margin: 8,
    borderRadius: 10,
  },
});
