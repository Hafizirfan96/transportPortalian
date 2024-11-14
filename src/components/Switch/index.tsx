import React, { FC, useEffect, useState } from 'react';
import { Pressable, View, Animated, StyleSheet } from 'react-native';

const defaultStyles = {
	bgColor: '#9CB3D6',
	headColor: '#ffffff',
};

const activeStyles = {
	bgColor: '#43F7B6',
	headColor: '#ffffff',
};

interface IProps {
    value: boolean
    onChange: (value: boolean)=> void
}

const Switch: FC<IProps> = ({ value, onChange }) => {
	const currentStyles = value ? activeStyles : defaultStyles;
	const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));

	useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: value ? 1 : 0,
			duration: 300,
			useNativeDriver: false,
		}).start();
	}, [value]);

	const translateX = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [2, 20],
	});

	const toggleSwitch = () => {
		const newValue = !value;
		onChange(newValue);
	};

	return (
		<Pressable onPress={toggleSwitch} style={styles.pressable}>
			<View style={[styles.background, { backgroundColor: currentStyles.bgColor }]}>
                <Animated.View 
                    style={[styles.head, { transform: [{ translateX }], backgroundColor: currentStyles.headColor }]}
                />
            </View>
		</Pressable>
	);
};

export default Switch;

const styles = StyleSheet.create({
	pressable: {
		width: 42,
		height: 24,
		borderRadius: 16,
	},
	background: {
		width: '100%',
		height: '100%',
		borderRadius: 16,
		justifyContent: 'center',
	},
	head: {
        width: 20,
        height: 20,
        borderRadius: 10,
	},
});

   