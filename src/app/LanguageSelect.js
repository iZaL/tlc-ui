import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import LanguageSelectScene from 'app/scenes/LanguageSelectScene';

class LanguageSelect extends Component {

  onLanguageSelect = name => {
    if (this.props.app.language === name) {
      return this.props.navigation.goBack();
    }
    this.props.dispatch(APP_ACTIONS.setLanguage(name));
  };

  render() {
    let active = this.props.app.language;

    return (
      <LanguageSelectScene
        active={active}
        onItemPress={this.onLanguageSelect}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default connect(
  mapStateToProps,
)(LanguageSelect);
