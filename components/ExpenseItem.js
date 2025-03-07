import { Text, View, Image, TouchableOpacity, Pressable } from "react-native";

import ExpenseIcon from "../assets/images/ExpenseIcon.png";
import PlusIcon from "../assets/images/check.png";

function ExpenseItem(props) {
  return (
    <View className="rounded-xl bg-gray-100 h-[70px] my-1">
      <TouchableOpacity className="flex" onPress={props.onEditItem}>
        <View className="px-3 flex flex-row items-center justify-between h-[70px] pr-3">
          <View className=" flex flex-row items-center h-[70px]">
            <View className="w-auto h-auto bg-[#e4a0b7] p-2  rounded-lg">
              <Image source={ExpenseIcon} className="h-[40px] w-[40px]" />
            </View>

            <View className="px-4 ">
              <Text className="font-bold text-lg">{props.name}</Text>
              <Text className="font-medium text-sm text-gray-400">
                {props.description}
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center gap-5 ">
            <Text className="font-bold text-base">₱{props.budget}</Text>
            <TouchableOpacity onPress={props.onDelete} className="size-10">
              <Image source={PlusIcon} className="size-8" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default ExpenseItem;
