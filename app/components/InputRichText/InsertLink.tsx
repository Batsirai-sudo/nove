import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../Text';
import Button from '../SaveButton';
import Modal from '../Modal';
import Input from '../Input';

class InsertLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      errors: {},
    };
  }
  setModal = (value) => {
    this.setState({isModal: value, errors: {}}, () => {
      if (value === false) {
        this.title = '';
        this.url = '';
      }
    });
  };

  setTitle = (title) => {
    this.title = title;
  };

  setURL = (url) => {
    this.url = url;
  };

  validate = (title, url) => {
    let errors = {};
    if (!title) {
      errors.title = 'validate:text_title';
    }
    if (!url) {
      errors.url = 'validate:text_url';
    }
    return errors;
  };

  onDone = () => {
    const title = this.title;
    const url = this.url;
    const errors = this.validate(title, url);
    this.setState({errors});

    if (Object.keys(errors).length < 1) {
      this.setModal(false);
      this.props?.onDone({title, url});
    }
  };

  render() {
    const {isModal, errors} = this.state;
    return (
      <Modal visible={isModal} setModalVisible={this.setModal} keyboardView>
        <View style={styles.container}>
          <Text h4 medium h4Style={styles.title}>
            {'common:text_insert_link'}
          </Text>
          <Input
            label={'inputs:text_title'}
            onChangeText={this.setTitle}
            error={errors?.title}
          />
          <Input
            label={'inputs:text_url'}
            onChangeText={this.setURL}
            error={errors?.url}
          />
          <View style={styles.footer}>
            <View style={styles.viewButton}>
              <Button title={'common:text_ok'} onPress={this.onDone} />
            </View>
            <View style={styles.viewButton}>
              <Button
                title={'common:text_cancel'}
                secondary
                onPress={() => this.setModal(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
  title: {
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 25,
    marginHorizontal: -5,
  },
  viewButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default InsertLink;
