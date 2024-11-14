import _ from 'lodash';
import getStyles from './styles';
import { useTheme } from '@/hooks';
import CheckItem from '@/components/CheckItem';
import { RadioButton } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Image } from 'react-native';

const Listofoption = ({
  text,
  id,
  setQuestionAnswerDetail,
  questionList,
}: any) => {
  const { Colors, Layout, Images, Gutters } = useTheme();
  const styles = getStyles(Colors);

  const [status, SetStatus] = useState(3);
  const [isSelected, setSelection] = useState(false);
  const [comments, setComment] = useState('');

  useEffect(() => {
    questionList?.forEach((items: any) => {
      if (items.QuestionId == id) {
        SetStatus(items.QuestionOptionAnswer);
        setComment(items.Comment);
      }
    });
  }, []);

  const onComment = (inputText: any) => {
    const value = {
      id: id,
      status: status,
      isSelected: isSelected,
      comments: inputText,
    };
    setQuestionAnswerDetail(value);
    setComment(inputText);
  };

  const debouncedSearch = _.debounce(onComment, 1000);

  const Comment = (inputText: any) => {
    debouncedSearch(inputText);
  };

  const checkbox = () => {
    setSelection(!isSelected);
    const value = {
      id: id,
      status: status,
      isSelected: isSelected,
      comments: comments,
    };
    setQuestionAnswerDetail(value);
  };

  const radioButton = (state: any, id: any) => {
    const value = {
      id: id,
      status: state,
      isSelected: isSelected,
      comments: comments,
    };
    setQuestionAnswerDetail(value);
    SetStatus(state);
    // clearErrors('myRadioGroup');
  };
  return (
    <>
      {text && (
        <View style={[Layout.row]}>
          <View style={[styles.createDot]} />
          <Text
            style={[
              styles.itemQuestionsText,
              styles.itemQuestionsMargin,
              styles.marginLeft5,
            ]}
          >
            {text}
          </Text>
        </View>
      )}
      <View
        style={[
          Layout.row,
          Layout.justifyContentBetween,
          Layout.alignItemsCenter,
        ]}
      >
        <RadioButton.Group
          name="myRadioGroup"
          value={status}
          onValueChange={nextValue => {
            radioButton(nextValue, (id = id), comments);
          }}
        >
          <View
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              styles.radioButtonMainView,
            ]}
          >
            <View>
              <RadioButton
                value="1"
                color={Colors.appColor}
                uncheckedColor={Colors.darkgray}
              />
              <Text style={[styles.itemQuestionsText, styles.marginleft3]}>
                Ok
              </Text>
            </View>
            <View style={[Layout.alignItemsCenter]}>
              <RadioButton
                value="2"
                color={Colors.appColor}
                uncheckedColor={Colors.darkgray}
              />
              <Text style={[styles.itemQuestionsText]}>Not Ok</Text>
            </View>
            <View style={[Layout.alignItemsCenter]}>
              <RadioButton
                value="3"
                color={Colors.appColor}
                uncheckedColor={Colors.darkgray}
              />
              <Text style={[styles.itemQuestionsText]}>Not checked</Text>
            </View>
          </View>
        </RadioButton.Group>

        <View>
          <View style={[styles.checkbox]}>
            <CheckItem
              onChangeValue={checkbox}
              value={isSelected}
              isContainerClickable={true}
              colorActive={Colors.appColor}
              colorInactive={Colors.schedul}
              Icon={
                isSelected ? (
                  <Image source={Images.activeCheckBox} />
                ) : (
                  <Image source={Images.inActiveCheckBox} />
                )
              }
            />
          </View>

          <Text style={[styles.itemQuestionsText]}>Comment</Text>
        </View>
      </View>

      {isSelected && (
        <TextInput
          style={[styles.inputText, Gutters.smallTMargin]}
          onChangeText={Comment}
          placeholder="Please type your comment here"
          multiline
          maxLength={200}
          textAlignVertical="top"
        >
          {comments}
        </TextInput>
      )}
    </>
  );
};
export default Listofoption;
