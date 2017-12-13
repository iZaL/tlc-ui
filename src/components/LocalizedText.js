import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text} from 'react-native';
import I18n from 'utils/locale';

export default class LocalizedText extends Component {
  setNativeProps = nativeProps => {
    this._root.setNativeProps(nativeProps);
  };

  static propTypes = {
    en: PropTypes.string.required,
    ar: PropTypes.string,
    hi: PropTypes.string,
  };

  render() {
    const {en, ar, hi} = this.props;

    let content;
    let locale = I18n.locale;

    if (locale === 'hi') {
      content = hi ? hi : en;
    } else if (locale === 'ar') {
      content = ar ? ar : en;
    } else {
      content = en;
    }

    return (
      <Text
        ref={component => (this._root = component)}
        {...this.props}
        style={[styles.text, this.props.style]}>
        {content ? content : ' '}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    // writingDirection: ['ar'].indexOf(I18n.locale) > -1 ? 'rtl' : 'ltr',
  },
});
