import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import { useState } from "react";

import back from "../assets/images/back.png";
import ExpenseItem from "./ExpenseItem";

function AllExpenses(props) {
  return (
    <Modal visible={props.visible} animationType="slide" className="">
      <View className="h-full px-5">
        <View className="flex flex-row items-center my-3 mt-5">
          <Pressable onPress={props.onBack}>
            <Image source={back} className="h-[20px] w-[20px]" />
          </Pressable>
          <Text className="font-semibold text-lg ml-2"> All Expenses</Text>
        </View>

        <ScrollView className="mt-4">
          <View>
            <FlatList
              data={props.expenses}
              renderItem={(itemData) => {
                return (
                  <ExpenseItem
                    name={itemData.item.name}
                    description={itemData.item.description}
                    budget={itemData.item.budget}
                    id={itemData.item.id}
                  />
                );
              }}
              keyExtractor={(item, index) => {
                return item.id;
              }}
              alwaysBounceVertical={true}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default AllExpenses;
