import { ActivityIndicator, StyleSheet, Text, View, FlatList, Platform, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import Autocomplete from 'react-native-autocomplete-input';
import { useTheme } from '@/hooks';
import Input from '../Input/Input';
import { hp, wp } from '@/utils/layout-scaling';
import getStyles from '@/screens/NewWorkload/styles';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'; 
import { Button } from 'react-native';

const AutoCompleteInput = (props: any) => {
    const { Layout, Colors, Common, FontSize, Gutters } = useTheme();
    const [selectedItem, setSelectedItem] = useState(null)
    const styles = getStyles(Colors, FontSize); 
    const searchRef = useRef(null)
    const dropdownController = useRef(null)
    return (
        //     <Autocomplete 
        //     inputContainerStyle={{ borderColor: Colors.white }}
        //     style={[props.AutoCompleteStyle,styles.autoComplete,{color:Colors.black}]}
        //     data={props.data}
        //     value={props.value}
        //     placeholder={props.placeholder}
        //     onChangeText={props.onChange}
        //     flatListProps={props.flatListProps}
        //     hideResults={props.hideResults}
        //     listContainerStyle={[props.listContainerStyle,styles.listContainer]}
        //     placeholderTextColor={props.placeholderTextColor || Colors. }
        //   />
        // <View style={styles.container}>
        //     <Input
        //         placeholder="Workload Location"
        //         outerStyle={styles.input}
        //         value={props.value}
        //         rightIcon={props.isLoading && <ActivityIndicator style={[Gutters.smallLPadding]} />}
        //         onChangeText={props.onChange}
        //     />
        //     {props.value.length > 0 && props.data.length > 0 && <FlatList
        //         data={props.data}
        //         contentContainerStyle={styles.textContainer}
        //         ListEmptyComponent={props.isLoading && (
        //             <ActivityIndicator style={[Gutters.smallLPadding]} />
        //         )}
        //         keyExtractor={(item, index) => index.toString()}
        //         renderItem={({ item }: { item: any }) => props.flatListProps(item)}
        //     />}
        // </View>
        <>
      <View
        style={[
          { flex: 1, flexDirection: 'row', alignItems: 'center' },
          Platform.select({ ios: { zIndex: 1 } }),
        ]}>
        <AutocompleteDropdown
          ref={searchRef}
          controller={controller => {
            dropdownController.current = controller
          }}
          direction={Platform.select({ ios: 'down' })}
          dataSet={props.data}
          onChangeText={props.onChangeText}
          onSelectItem={item => {
            // item && setSelectedItem(item.id)
          }}
        //   debounce={600}
          suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
        //   onClear={onClearPress}
          onOpenSuggestionsList={()=>{}}
          loading={props.loading}
          useFilter={false} // set false to prevent rerender twice
          textInputProps={{
            placeholder: props.placeholder,
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              borderRadius: 25,
              backgroundColor: '#383b42',
              color: '#fff',
              paddingLeft: 18,
            },
          }}
          rightButtonsContainerStyle={{
            right: 8,
            height: 30,

            alignSelf: 'center',
          }}
          inputContainerStyle={{
            backgroundColor: '#383b42',
            borderRadius: 25,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: '#383b42',
          }}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={(item, text) => <Text style={{ color: '#fff', padding: 15 }}>{item.title}</Text>}
        //   ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
        //   ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
          inputHeight={50}
          showChevron={false}
          closeOnBlur={false}
          //  showClear={false}
        />
        {/* <Button style={{ flexGrow: 0 }} title="Toggle" onPress={() => dropdownController.current.toggle()} /> */}
      </View>
      {/* <Text style={{ color: '#668', fontSize: 13 }}>Selected item id: {JSON.stringify(selectedItem)}</Text> */}
    </>
    )
}

export default AutoCompleteInput
// const getStyles = (colors: any) => {
//     var styles = StyleSheet.create({
//         container: {
//             flexDirection: 'column',
//             alignItems: 'center',
//             backgroundColor:'red',
//             alignContent:'center',
//         },
//         textContainer: {
//             backgroundColor: colors.white,
//             borderRadius: wp(4),
//             elevation: wp(10),
//             shadowColor: colors.black,
//             width: '100%',
//             // maxHeight:'20%',
//         },
//         input: {
//             top: hp(10),
//             width: '100%',
//             alignSelf: 'center',
//             backgroundColor:'red'
//         }
//     });

//     return styles;
// };

