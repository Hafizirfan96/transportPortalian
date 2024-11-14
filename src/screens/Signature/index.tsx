import _ from 'lodash';
import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { signatureSelector } from '@/store/signatures';
import { navigate, navigateBack } from '@/navigators/Root';
import { Button, Header, Signature, TextComponent } from '@/components';
import { useTheme, useAppDispatch, useAppSelector } from '@/hooks';
import {
  saveSignatureImages,
  getProductsWorkload,
} from '@/store/signatures/signatureInfo';

const SignatureScreen = ({ route }: any) => {
  const { SignatureID: signatureId } = useAppSelector(signatureSelector);

  const { Gutters } = useTheme();

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
    if (signatureId && signatureImage) {
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

  const onEnterName = (text: any) => {
    setName(text);
  };

  const debouncedSearch = _.debounce(onEnterName, 1000);

  const enterName = (text: any) => {
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

      <View style={[Gutters.mediumHPadding]}>
        <Button title="Submit" handleSubmit={Save} />
      </View>
    </View>
  );
};

export default SignatureScreen;
