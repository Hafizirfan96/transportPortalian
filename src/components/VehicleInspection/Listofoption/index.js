import React, { useEffect, useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { useTheme } from '@/hooks';
import _ from 'lodash';
import getStyles from './styles';
import CheckItem from '@/components/CheckItem';
import { RadioButton } from 'react-native-paper';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

const Listofoption = ({
  text,
  id,
  setQuestionAnswerDetail,
  questionList,
  control,
  errors,
  // clearErrors,
}) => {
  const { Colors, Layout, FontSize } = useTheme();
  const styles = getStyles(Colors, FontSize);

  const [status, SetStatus] = useState(3);
  const [isSelected, setSelection] = useState(false);
  const [comments, setComment] = useState('');

  useEffect(() => {
    questionList?.forEach(items => {
      if (items.QuestionId == id) {
        SetStatus(items.QuestionOptionAnswer);
        setComment(items.Comment);
      }
    });
  }, []);

  const onComment = inputText => {
    const value = {
      id: id,
      status: status,
      isSelected: isSelected,
      comments: inputText,
    };
    console.log('setQuestionAnswerDetail function ', value);
    setQuestionAnswerDetail(value);
    setComment(inputText);
  };

  const debouncedSearch = _.debounce(onComment, 1000);

  const Comment = inputText => {
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

  const radioButton = (state, id) => {
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
          styles.marginLeftRight,
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
                colorScheme="lime"
                value="1"
                my="1"
                color={Colors.appColor}
              />
              <Text style={[styles.itemQuestionsText, styles.marginleft3]}>
                Ok
              </Text>
            </View>
            <View style={[Layout.alignItemsCenter]}>
              <RadioButton
                colorScheme={'lime'}
                value="2"
                my="1"
                color={Colors.appColor}
              />
              <Text style={[styles.itemQuestionsText]}>Not Ok</Text>
            </View>
            <View style={[Layout.alignItemsCenter]}>
              <RadioButton
                colorScheme={'lime'}
                value="3"
                my="1"
                color={Colors.appColor}
              />
              <Text style={[styles.itemQuestionsText]}>Not checked</Text>
            </View>
          </View>
        </RadioButton.Group>
        {/* <Controller
          control={control}
          name="myRadioGroup"
          rules={{ required: 'Select an option' }}
          render={({ field: { name, rules, onBlur, value } }) => (
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
                    colorScheme="lime"
                    value="1"
                    my="1"
                    color={Colors.appColor}
                  />
                  <Text style={[styles.itemQuestionsText, styles.marginleft3]}>
                    Ok
                  </Text>
                </View>
                <View style={[Layout.alignItemsCenter]}>
                  <RadioButton
                    colorScheme={'lime'}
                    value="2"
                    my="1"
                    color={Colors.appColor}
                  />
                  <Text style={[styles.itemQuestionsText]}>Not Ok</Text>
                </View>
                <View style={[Layout.alignItemsCenter]}>
                  <RadioButton
                    colorScheme={'lime'}
                    value="3"
                    my="1"
                    color={Colors.appColor}
                  />
                  <Text style={[styles.itemQuestionsText]}>Not checked</Text>
                </View>
              </View>
            </RadioButton.Group>
          )}
        /> */}
        {/* <View
          style={[
            {
              position: 'absolute',
              top: -10,
            },
          ]}
        >
          {errors?.myRadioGroup?.message && (
            <Text style={styles.errorText}>
              {errors?.myRadioGroup?.message}
            </Text>
          )}
        </View> */}

        <View>
          <View style={[styles.checkbox]}>
            <CheckItem
              onChangeValue={checkbox}
              value={isSelected}
              isContainerClickable={true}
              colorActive={Colors.appColor}
              style={[styles.checkbox]}
              colorScheme={'lime'}
            />
          </View>

          <Text style={[styles.itemQuestionsText]}>Comment</Text>
        </View>
      </View>

      {isSelected && (
        <TextInput
          style={[styles.inputText]}
          onChangeText={Comment}
          // value={comments}
          placeholder="Please type your comment here"
          multiline
          numberOfLines={8}
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
