import React from 'react';
import { StyleSheet, TouchableHighlightBase } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction, Text, Button, } from '@ui-kitten/components';
import { ArrowBackIcon } from "../assets/icons/icons.js";
import Grid from "../UIComponents/Grid.js";
import * as firebase from "firebase";

const PAGE_TITLE = 'Solution'

export default class ResultsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
        };
    }

    componentDidMount() {
        var database = firebase.database();
        console.log('ResultsPage: ', this.props.navigation.state.params.photoUri);
        this.uriToBlob(this.props.navigation.state.params.photoUri).then((blob) => {
            this.uploadToFirebase(blob).then((snapshot) => {
                console.log("File uploaded");
            }).catch(() => {
                console.log("Upload failed!");
            });
        });
    }

    uploadToFirebase = (blob) => {
        return new Promise((resolve, reject) => {
            var storageRef = firebase.storage().ref();
            storageRef.child('uploads/photo.jpg').put(blob, {
                contentType: 'image/jpeg'
            }).then((snapshot) => {
                blob.close();
                resolve(snapshot);
                if (snapshot.metadata != null) {
                    this.setState({ values: snapshot.metadata });
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }

    uriToBlob = (uri) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };

            xhr.onerror = function () {
                reject(new Error('Failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
    }

    render() {
        const renderMenuAction = () => (
            <TopNavigationAction
                icon={ArrowBackIcon}
                onPress={() => this.props.navigation.goBack()}
            />
        );
        return (
            <React.Fragment>
                <TopNavigation
                    title={PAGE_TITLE}
                    alignment="center"
                    leftControl={renderMenuAction()}
                />
                <Layout level='2' style={styles.container}>
                    <Grid values={this.state.values} />
                </Layout>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});