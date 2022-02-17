import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native';
import React, { useState } from 'react';
import tw from "tailwind-react-native-classnames";
import AddressInput from '../components/AddressInput';
import AddressItem from '../components/AddressItem';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from "react-native-elements/dist/icons/Icon"
import { useNavigation } from '@react-navigation/native';


const AddressScreen = () => {
    const navigation = useNavigation();

    const [courseGoals, setCourseGoals] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false);

    const addGoalHandler = goalTitle => {
        setCourseGoals(currentGoals => [
            ...currentGoals,
            { id: Math.random().toString(), value: goalTitle }
        ]);
        setIsAddMode(false);
    };

    const removeGoalHandler = goalId => {
        setCourseGoals(currentGoals => {
            return currentGoals.filter(goal => goal.id !== goalId);
        });
    };

    const cancelGoalAdditionHandler = () => {
        setIsAddMode(false);
    };

    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate('HomeScreen')}
                style={tw`bg-gray-100 absolute top-16 top-16 left-8 z-50 p-3 rounded-full
        shadow-lg`}
            >
                <Icon name="menu" />
            </TouchableOpacity>

            <View style={styles.screen}>
                <Button title="Add New Address" onPress={() => setIsAddMode(true)} />
                <AddressInput
                    visible={isAddMode}
                    onAddGoal={addGoalHandler}
                    onCancel={cancelGoalAdditionHandler}
                />
                <FlatList
                    keyExtractor={(item, index) => item.id}
                    data={courseGoals}
                    renderItem={itemData => (
                        <AddressItem
                            id={itemData.item.id}
                            onDelete={removeGoalHandler}
                            title={itemData.item.value}
                        />
                    )}
                />
            </View>

        </View>
    );
};

export default AddressScreen;

const styles = StyleSheet.create({
    screen: {
        paddingTop: 150,
        padding: 50
    }
});
