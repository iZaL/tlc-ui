import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {SELECTORS as TRUCK_SELECTORS} from 'trucks/common/selectors';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {ACTIONS as TRUCK_ACTIONS} from 'trucks/common/actions';
import Separator from 'components/Separator';
import ListItem from 'components/ListItem';
import Touchable from 'react-native-platform-touchable';
import FormLabel from "components/FormLabel";
import {Title} from "react-native-paper";
import I18n from 'utils/locale';
import AppButton from "components/AppButton";
import List from "components/List";

class TrailerUpdateScene extends Component {
  static propTypes = {
    truck: PropTypes.shape({
      model: PropTypes.object.isRequired,
    }),
  };

  static defaultProps = {
    trailer: {
      make:{},
      type:{}
    },
  };

  state = {
    make_id: null,
    type_id: null,
    showMakeModal: false,
    showTypeModal: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let {type,make} = nextProps.trailer;
    return {
      make_id: make.id,
      type_id: type.id,
    };
  }

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchProfile());
    this.props.dispatch(TRUCK_ACTIONS.fetchTrailerMakes());
    this.props.dispatch(TRUCK_ACTIONS.fetchTrailerTypes());
  }

  showTypeModal = () => {
    this.setState({
      showTypeModal: true,
    });
  };

  hideTypeModal = () => {
    this.setState({
      showTypeModal: false,
    });
  };

  showMakeModal = () => {
    this.setState({
      showMakeModal: true,
    });
  };

  hideMakeModal = () => {
    this.setState({
      showMakeModal: false,
    });
  };

  setType = id => {
    this.setState({
      type_id: id,
    });
  };

  setMake = id => {
    this.setState({
      make_id: id,
    });
  };

  onSave = () => {
    console.log('save');
  };

  render() {
    const {trailer,trailer_types,trailer_makes} = this.props;
    const {type_id,make_id,showMakeModal,showTypeModal} = this.state;

    console.log('trailer_types',trailer_types);
    console.log('trailer_makes',trailer_makes);

    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 10,
          paddingTop: 20,
        }}>

        <Touchable onPress={this.showTypeModal}>
          <View>
            <FormLabel title={I18n.t('trailer_type')} />
            <Title>{trailer.type.id ? trailer.type.name : I18n.t('select')}</Title>
          </View>
        </Touchable>

        <Separator style={{marginVertical: 20}} />

        <Touchable onPress={this.showMakeModal}>
          <View>
            <FormLabel title={I18n.t('trailer_make')} />
            <Title>{trailer.make.id ? trailer.make.name : I18n.t('select')}</Title>
          </View>
        </Touchable>

        <Separator style={{marginVertical: 20}} />

        <AppButton onPress={this.onSave} />

        <List
          title={I18n.t('trailer_type')}
          activeIDs={[type_id]}
          isVisible={showTypeModal}
          onConfirm={this.setType}
          onCancel={this.hideTypeModal}
          items={trailer_types}
        />

        <List
          title={I18n.t('trailer_make')}
          activeIDs={[make_id]}
          isVisible={showMakeModal}
          onConfirm={this.setMake}
          onCancel={this.hideMakeModal}
          items={trailer_makes}
        />

      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    trailer: DRIVER_SELECTORS.getTrailer(state),
    trailer_makes:TRUCK_SELECTORS.getTrailerMakes(state),
    trailer_types:TRUCK_SELECTORS.getTrailerTypes(state)
  };
}

export default connect(mapStateToProps)(TrailerUpdateScene);
