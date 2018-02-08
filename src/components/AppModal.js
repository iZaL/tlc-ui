import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import Modal from "react-native-modal";
import Button from "./Button";
import colors from "../assets/theme/colors";

export default class AppModal extends Component {

  state = {
    visible: false
  };

  static defaultProps = {
    closeOnBackdropPress: false,
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.visible !== this.state.visible) {
      this.setState({
        visible:nextProps.visible
      })
    }
  }

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
      {this._renderButton("Close", () => this.closeModal())}
    </View>
  );

  closeModal = () => {
    this.setState({
      visible: false
    });
  };

  render() {

    let {render,modalStyle} = this.props;
    return (
      <View style={styles.container}>
        <Modal
          isVisible={this.state.visible}
          style={styles.bottomModal}
          onBackdropPress={this.props.closeOnBackdropPress ? this.closeModal : undefined }
        >
          <View style={[styles.modalContent,modalStyle]}>
            {render(this.closeModal)}
          </View>
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalContent: {
    backgroundColor: colors.primary,
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  }
});
