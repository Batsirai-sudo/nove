import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import {
  Modal,
  ModalContent,
  SlideAnimation,
  ModalTitle,
  ModalFooter,
  ModalButton,
  ScaleAnimation,
  FadeAnimation,
} from 'react-native-modals';
import {dimensions} from '@utils';
import Text from '../Text';
export default function Dialog(props) {
  const {
    animation,
    content,
    firstButtontext,
    firstButtonOnPress,
    secondButtontext,
    secondButtonOnPress,
    title,
    modalVisible,
    onSwipefunc,
    onTouchOutside,
    height,
    width,
    firstButtonTextStyles,
    secondButtonTextStyles,
    titleTextStyles,
  } = props;

  const Footer = () => {
    return (
      <ModalFooter>
        <ModalButton
          textStyle={[styles.firsttxt, firstButtonTextStyles]}
          bordered={true}
          text={firstButtontext}
          onPress={firstButtonOnPress}
        />
        <ModalButton
          textStyle={[styles.secondtxt, secondButtonTextStyles]}
          text={secondButtontext}
          onPress={secondButtonOnPress}
        />
      </ModalFooter>
    );
  };

  const Title = () => {
    return (
      <ModalTitle textStyle={[styles.title, titleTextStyles]} title={title} />
    );
  };

  const AnimationType = () => {
    return animation === 'scale'
      ? new ScaleAnimation({
          initialValue: 0, // optional
          useNativeDriver: true, // optional
        })
      : animation === 'slide'
      ? new SlideAnimation({
          initialValue: 0, // optional
          slideFrom: 'bottom', // optional
          useNativeDriver: true, // optional
        })
      : animation === 'fade'
      ? new FadeAnimation({
          initialValue: 0, // optional
          animationDuration: 150, // optional
          useNativeDriver: true, // optional
        })
      : new SlideAnimation({
          initialValue: 0, // optional
          slideFrom: 'bottom', // optional
          useNativeDriver: true, // optional
        });
  };

  const renderContent = () => {
    return (
      <ModalContent style={styles.contentStyle}>
        <Text style={{textAlign: 'center', fontSize: 12}}>{content}</Text>
      </ModalContent>
    );
  };
  return (
    <Modal
      visible={modalVisible}
      footer={Footer()}
      onTouchOutside={onTouchOutside}
      width={width}
      height={height}
      modalTitle={Title()}
      modalAnimation={AnimationType()}
      swipeDirection={['up', 'down', 'left', 'right']} // can be string or an array
      swipeThreshold={200} // default 100
      onSwipeOut={onSwipefunc}>
      {renderContent()}
    </Modal>
  );
}

Dialog.propTypes = {
  firstButtontext: PropTypes.string,
  firstButtonOnPress: PropTypes.func,
  secondButtontext: PropTypes.string,
  secondButtonOnPress: PropTypes.func,
  onSwipefunc: PropTypes.func,
  title: PropTypes.string,
  animation: PropTypes.string,
  // content: PropTypes.string,
  modalVisible: PropTypes.bool,
  width: PropTypes.any,
  height: PropTypes.number,
};

Dialog.defaultProps = {
  firstButtontext: 'CANCEL',
  secondButtontext: 'OKAY',
  firstButtonOnPress: () => {},
  secondButtonOnPress: () => {},
  onSwipefunc: () => {},
  title: 'Please Alert',
  animation: 'slide',
  content: 'Dummy text',
  modalVisible: false,
  width: dimensions.width_screen - 60,
  height: 150,
};
