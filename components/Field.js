import { Text, View, TextInput } from "react-native";

function Field(props) {
  return (
    <View className="my-2">
      <Text className="mx-3 font-medium text-base mb-1 text-gray-500">
        {props.title}
      </Text>

      <View className=" border-[1px] border-[#E4A0B7] w-full h-16 px-4 rounded-2xl focus:border-black items-center flex-row">
        <TextInput
          placeholder={props.placeholder}
          value={props.value}
          placeholderTextColor="#7b7b8b"
          onChangeText={props.onChangeText}
          className="flex-1 text-1 text-gray-500 font-psemibold text-base"
        />
      </View>
    </View>
  );
}

export default Field;
