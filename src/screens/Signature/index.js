import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme, useAppDispatch, useAppSelector } from '@/hooks';
import { Header, Signature, TextComponent } from '@/components';
import { navigate, navigateBack } from '@/navigators/Root';
import { wp } from '@/utils/layout-scaling';
import _ from 'lodash';
import {
  saveSignatureImages,
  getProductsWorkload,
} from '@/store/signatures/signatureInfo';
import { signatureSelector } from '@/store/signatures';

const SignatureScreen = ({ route }) => {
  const { SignatureID: signatureId } = useAppSelector(signatureSelector);

  const { Common, Colors } = useTheme();
  const styles = getStyles(Colors);

  let signatureImage = useAppSelector(state => {
    return state.signature.signatureImage;
  });

  const [totalKollies, setTotalKollies] = useState();
  const [name, setName] = useState('');
  const [totalKollieIds, setTotalKollieIds] = useState([]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (route.params?.data) {
      setTotalKollieIds(route.params.data);
      let cout = route.params.data.length;
      setTotalKollies(cout);
    }
  }, [route.params?.data]);

  useEffect(() => {
    if (signatureId) {
      const form = new FormData();
      form.append('Files', signatureImage);
      form.append('fileType', 'png');
      form.append('EntityType', 8);
      form.append('EntityId', 1);
      form.append('EntityName', 'Signature');
      dispatch(saveSignatureImages(form));
    }
  }, [signatureId]);

  const onOpenSignatureScreen = () => {
    navigate('CaptureSignature');
  };

  const onEnterName = text => {
    setName(text);
  };

  const debouncedSearch = _.debounce(onEnterName, 1000);

  const enterName = text => {
    debouncedSearch(text);
  };

  const Save = () => {
    const payload = {
      Name: name,
      KolliIds: [...totalKollieIds],
    };
    dispatch(getProductsWorkload(payload));
    navigateBack();
  };
  return (
    <View>
      <Header backPage="WorkloadEnd" title="Signature" />
      <Signature
        onOpenSignatureScreen={onOpenSignatureScreen}
        signatureImage={signatureImage}
      />
      <TextComponent
        totalKollies={totalKollies?.toString()}
        enterName={enterName}
      />

      <View style={[styles.marginhorizontal30]}>
        <TouchableOpacity
          // disabled={name.trim() == '' ? true : !signatureImage ? true : false}
          onPress={Save}
          style={[Common.button.fullRounded, styles.marginvertical10]}
        >
          <Text style={[Common.button.buttonText, styles.colorwhite]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = colors =>
  StyleSheet.create({
    marginhorizontal30: {
      marginHorizontal: wp(30),
    },
    marginvertical10: {
      marginVertical: wp(10),
    },
    colorwhite: {
      color: colors.black,
    },
  });
export default SignatureScreen;
