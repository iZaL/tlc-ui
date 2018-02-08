import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, View,} from 'react-native';
import Modal from "react-native-modal";
import isEmpty from 'lodash/isEmpty';
import colors from 'theme/colors';

export default class Notification extends React.Component {

  static propTypes = {
    // message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    messageType: PropTypes.string,
  };

  state = {
    visible:false
  };

  shouldComponentUpdate(nextProps,nextState) {
    return nextState.visible !== this.state.visible;
  }

  componentWillReceiveProps(nextProps) {
    if(!isEmpty(nextProps.message)) {
      this.setState({
        visible:true
      })
    }
  }

  closeModal = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const {messageType, message, modalStyle} = this.props;
    const {visible} = this.state;

    return (
      <View style={styles.container}>
        <Modal
          isVisible={visible}
          style={styles.bottomModal}
          onBackdropPress={()=>this.closeModal()}
        >
          <View style={[styles.modalContent,{backgroundColor:colors[messageType]},modalStyle]}>
            <Text style={styles.text}>{message}</Text>
          </View>
        </Modal>
      </View>
    );

    // return (
    //   <AppModal
    //     visible={showModal}
    //     closeOnBackdropPress={true}
    //     render={(closeModal) => {
    //       return (
    //         <View style={[styles.container,{backgroundColor:colors[messageType]}]}>
    //           <Text style={styles.text}> {message} </Text>
    //         </View>
    //       )
    //     }}
    //   />
    // );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
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
  },
  text:{
    color:'white',
    fontSize:25,
  }
});
