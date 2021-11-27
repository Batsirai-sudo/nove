import React, {memo, useContext, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Pdf from 'react-native-pdf';
import styles from './styles';
import {batchTable} from '@config';
import {
  SaveButton,
  Icon,
  Input,
  InputImage,
  FilterCategories,
  IconRadio,
  Errors,
  Loader,
  TextComponent,
  SearchBar,
  HotKeys,
  ActivityIndicator,
  ShimmerItemOrder,
  shimmerItemOrderHeight,
  ItemOrder,
  FilterOrder,
  ShimmerLoading,
} from '@components';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPrint from 'react-native-print';
import Share from 'react-native-share';
import {useSelector} from 'react-redux';
// import {AdminContext} from '../../../context/adminContext';
import AwesomeLoading from 'react-native-awesome-loading';

const ConvertToPdf = () => {
  const user = useSelector((state) => state.auth.user);
  const batchOrder = useSelector((state) => state.admin.batchOrder);
  //   const {prizeInclude} = useContext(AdminContext);

  const [pdfUriBase64, setPdfUriBase64] = useState({});
  const [pdfFilePath, setPdfFilePath] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [allPages, setAllPages] = useState(0);
  const [horizontal, setHorizontal] = useState(false);
  const [loading, setLoading] = useState(true);
  const listViewData = Array(100)
    .fill('')
    .map((_, i) => ({
      number: `00000${i}`,
      line_items: [{name: `Henken`, quantity: i}],
      status: 'accepted',
      name: 'Matthew Mlambo',
    }));
  const data = {
    orderList: listViewData,
  };

  useEffect(() => {
    setLoading(true);

    // const shopDetails = {
    //   shopName: user.shopName,
    //   city: user.city,
    //   country: user.country,
    //   email: user.email,
    //   fullName: user.fullName,
    //   mobileNumber: user.mobileNumber,
    //   shopOwner: user.shopOwner,
    //   shopType: user.shopType,
    //   streetAddress: user.streetAddress,
    //   uid: user.uid,
    // };

    let options = {
      documentSize: 'A4',
      type: 'base64',
    };

    onCreate();

    // PDFGenerator.fromHTML(
    //   batchTable(batchOrder, shopDetails, prizeInclude),
    //   `http://localhost`,
    // )
    //   .then((data) => {
    //     console.log({uri: `data:application/pdf;base64,${data}`});
    //     setPdfUriBase64({uri: `data:application/pdf;base64,${data}`});
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log('error->', err);
    //   });
  }, []);

  const onCreate = async () => {
    const shopDetails = {
      shopName: user.shopName,
      city: user.city,
      country: user.country,
      email: user.email,
      fullName: user.fullName,
      mobileNumber: user.mobileNumber,
      shopOwner: user.shopOwner,
      shopType: user.shopType,
      streetAddress: user.streetAddress,
      uid: user.uid,
    };
    let options2 = {
      html: batchTable(batchOrder, shopDetails),
      fileName: 'test',

      //   directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options2);
    console.log(file);
    setPdfUriBase64({uri: file.filePath});
    const pdfSource = {uri: file.filePath};

    setLoading(false);
  };

  const onPrint = () => {
    RNPrint.print({filePath: pdfFilePath});
  };

  const onShare = () => {
    const options = {
      title: 'good1',
      subject: 'title2',
      message: 'Batch Order	✅	',
      url: 'file://' + pdfUriBase64.uri,
      filename: 'Matthew Order',
    };

    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <AwesomeLoading
            indicatorId={11}
            size={70}
            isActive={true}
            text="Generating PDF"
          />
        </View>
      ) : (
        <>
          <Pdf
            source={pdfUriBase64}
            horizontal={horizontal}
            // enablePaging={true}
            // singlePage={true}
            onLoadComplete={(numberOfPages, filePath) => {
              setAllPages(numberOfPages);
              console.log(`number of pages: ${numberOfPages}`);
              console.log(`filepath: ${filePath}`);
              setPdfFilePath(filePath);
            }}
            onPageChanged={(page, numberOfPages) => {
              setCurrentPage(page);
              console.log(`current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            // fitWidth={true}
            style={styles.pdf}
          />
          <View style={styles.floatText}>
            <TextComponent style={{color: 'white'}}>
              {currentPage}
            </TextComponent>
            <TextComponent style={{color: 'white'}}> /{allPages}</TextComponent>
          </View>
          <View
            style={[
              styles.floatButton,
              {
                backgroundColor: horizontal
                  ? 'rgba(240,95,62,0.9)'
                  : 'rgba(0,0,0,0.6)',
                bottom: 300,
              },
            ]}>
            <TouchableOpacity
              onPress={() =>
                horizontal ? setHorizontal(false) : setHorizontal(true)
              }>
              <Entypo name="align-horizontal-middle" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.floatButton,
              {
                backgroundColor: 'rgba(0,0,0,0.6)',
                bottom: 200,
              },
            ]}>
            <TouchableOpacity onPress={() => onPrint()}>
              <Ionicons name="print" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.floatButton,
              {
                backgroundColor: 'rgba(0,0,0,0.6)',
                bottom: 100,
              },
            ]}>
            <TouchableOpacity onPress={() => onShare()}>
              <AntDesign name="sharealt" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default ConvertToPdf;
