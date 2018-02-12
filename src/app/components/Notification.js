import PropTypes from 'prop-types';
import React,{Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import isEmpty from 'lodash/isEmpty';
import colors from 'assets/theme/colors';

export default class Notification extends Component {
  static propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
  };

  state = {
    visible: false,
  };

  static defaultProps = {
    type : 'success'
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.visible !== this.state.visible;
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.message)) {
      this.setState({
        visible: true,
      });
    }
  }

  closeModal = () => {
    this.setState({
      visible: false,
    });
    this.props.dismissNotification();
  };

  render() {
    const {type, message} = this.props;
    const {visible} = this.state;

    return (
      <View style={styles.container}>
        <Modal
          isVisible={visible}
          style={styles.bottomModal}
          onBackdropPress={() => this.closeModal()}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor:colors[type]
              }
            ]}>

            {
              <Text style={styles.text}>{message}</Text>
            }

          </View>
        </Modal>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  modalContent: {
    backgroundColor: colors.primary,
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  text: {
    color: 'white',
    fontSize: 25,
  },
});
