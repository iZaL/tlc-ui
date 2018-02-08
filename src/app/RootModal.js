import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

export default class RootModal extends Component {
  state = {
    visible: true,
  };

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>Hello!</Text>
      {this._renderButton('Close', () => this.closeModal())}
    </View>
  );

  closeModal = () => {
    this.setState({
      visible: false,
    });
    this.props.navigation.goBack(null);
  };

  // componentDidMount() {
  //   this.setState({
  //     visible:true
  //   });
  // }

  // componentWillUnmount() {
  //   this.setState({
  //     visible:false
  //   })
  // }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          isVisible={this.state.visible}
          style={styles.bottomModal}>
          // onBackdropPress={() => this.setState({ visibleModal: null })}
          // onBackdropPress={() => this.closeModal()}
          {/*{this._renderModalContent()}*/}
          {this.props.render(this.closeModal)}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
