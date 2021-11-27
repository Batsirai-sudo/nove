import * as React from 'react';
import {View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Image from '../Image';
import ViewLabel from '../ViewLabel';
import Button from '../SaveButton';
import Card from '../Card';
import ModalImage from '../ModalImage';
import {Images} from '@config';
import * as RNFS from 'react-native-fs';
import styles from './styles';
const options = {
  mediaType: 'photo',
  saveToPhotos: true,
  maxWidth: 500,
  maxHeight: 500,
  quality: 0.5,
};

function InputImage(props) {
  const [isModal, setModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState('');
  const {value, onChangeImage, contentStyle, typeGet, ...rest} = props;

  const getImage = () => {
    launchCamera(options, (response) => {
      const res = response;
      var correctpath;
      if (res.uri) {
        if (res.uri.startsWith('content://')) {
          const uriComponents = res.uri.split('/');
          const destPath = `${RNFS.TemporaryDirectoryPath}/${res.fileName}`;
          RNFS.copyFile(res.uri, destPath).then((rt) => {});
          var str1 = 'file://';
          var str2 = destPath;
          correctpath = str1.concat(str2);
          onChangeImage(correctpath);
          setImage(correctpath);
        }
      }
    });
  };

  return (
    <ViewLabel {...rest} type="solid" style={[styles.view, contentStyle]}>
      <View style={styles.content}>
        <Card secondary style={styles.imageCard}>
          {value === '' || value === 'empty' ? (
            <Image source={Images.default_image} style={styles.imageEmpty} />
          ) : (
            <View>
              <Image source={{uri: value}} style={styles.image} />
            </View>
          )}
        </Card>

        <Button
          title="Select Image"
          size="small"
          secondary
          buttonStyle={styles.button}
          onPress={getImage}
          loading={loading}
        />
      </View>
      <ModalImage
        visible={isModal}
        setModalVisible={(v) => setModal(v)}
        selectImage={value}
        onChange={(v) => onChangeImage(v)}
        typeGet={typeGet}
      />
    </ViewLabel>
  );
}

export default InputImage;
