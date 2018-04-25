/* @flow */
import * as React from 'react';
import {
  Paragraph,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Colors,
} from 'react-native-paper';
import I18n from 'utils/locale';

const SuccessDialog = ({
  visible,
  onPress,
}: {
  visible: boolean,
  onPress: Function,
}) => (
  <Dialog visible={visible} dismissable={false}>
    <DialogTitle>{I18n.t('success')}</DialogTitle>
    <DialogContent>
      <Paragraph>{I18n.t('load_create_success')}</Paragraph>
    </DialogContent>
    <DialogActions>
      <Button primary onPress={onPress}>
        {I18n.t('view_matching_drivers')}
      </Button>
    </DialogActions>
  </Dialog>
);

export default SuccessDialog;
