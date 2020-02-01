import React from 'react';
import { StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';
import { mapping } from '@eva-design/eva';
import { light, dark } from './UIComponents/Themes';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

const GRANTED = 'granted';
const DEFAULT_STATUS_TEXT = 'Take a picture of your sudoku puzzle';
const SNAPSHOT_TAKEN_STATUS_TEXT = 'Snapshot of your sudoku puzzle is available at: ';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    global.theme = dark;
    this.state = {
      cameraPermission: null,
      cameraType: Camera.Constants.Type.back,
      photoUri: '',
    };
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      cameraPermission: status === GRANTED,
    });
  };

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };

  onPictureSaved = async photo => {
    this.setState({ photoUri: photo.uri });
  }

  render() {
    if (this.state.CameraPermission === false) {
      return (
        <ApplicationProvider mapping={mapping} theme={dark}>
          <SafeAreaView>
            <Layout level='3' style={styles.container}>
              <Text>Please enable camera permissions before using this application.</Text>
            </Layout>
          </SafeAreaView>
        </ApplicationProvider>
      );
    } else {
      return (
        <ApplicationProvider mapping={mapping} theme={dark}>
          <SafeAreaView style={[styles.container, { backgroundColor: global.theme['background-basic-color-1'] }]}>
            <Layout>
              {Platform.OS === 'ios' && <StatusBar barStyle={global.theme == light ? 'dark-content' : 'light-content'} />}
              {Platform.OS === 'android' && <Layout style={{ marginTop: StatusBar.currentHeight }} />}
            </Layout>
            <Layout level='3' style={styles.container}>
              <Layout level='2' style={styles.cameraContainer}>
                <Camera style={[styles.camera, { width: '100%', height: '100%' }]}
                  ref={ref => { this.camera = ref; }}
                  type={this.state.cameraType}
                  autoFocus={Camera.Constants.AutoFocus.on}
                  whiteBalance={Camera.Constants.WhiteBalance.auto} />
              </Layout>
              <Layout level='2' style={styles.statusContainer}>
                <Text style={styles.statusText}>{this.state.photoUri == '' ? DEFAULT_STATUS_TEXT : SNAPSHOT_TAKEN_STATUS_TEXT + this.state.photoUri}</Text>
              </Layout>
              <Layout level='2' style={styles.buttonContainer}>
                <Button style={styles.button} onPress={this.takePicture}>Capture</Button>
              </Layout>
            </Layout>
          </SafeAreaView>
        </ApplicationProvider>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  statusContainer: {
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    margin: 8,
  },
  buttonContainer: {
    marginHorizontal: 8,
    marginBottom: 8,
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
