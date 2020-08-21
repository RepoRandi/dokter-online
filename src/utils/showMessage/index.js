import {showMessage} from 'react-native-flash-message';
import {colors} from '../colors';
import {useDispatch} from 'react-redux';

export const showError = message => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: colors.error,
    color: colors.white,
  });
};

export const showSuccess = message => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: colors.primary,
    color: colors.white,
  });
};
