import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useState } from "react";

import back from "../assets/images/back.png";

import Field from "./Field";
import DropdownComponent from "./DropdownComponent";

function BudgetForm(props) {
  const [formData, setFormData] = useState({
    budgetType: "",
    budget: "",
  });

  function inputChangeHandler(field, value) {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }

  function addBudgetHandler() {
    props.onAddBudget(`${formData.budgetType} Budget`, formData.budget);
    setFormData({ budgetType: "", budget: "" });
  }

  return (
    <Modal visible={props.visible} animationType="slide" className="">
      <View className="h-full px-5">
        <View className="flex flex-row items-center my-3 mt-5">
          <Pressable onPress={props.onBack}>
            <Image source={back} className="h-[20px] w-[20px]" />
          </Pressable>
          <Text className="font-semibold text-lg ml-2"> Add Your Budget</Text>
        </View>

        <View className="mt-4">
          <DropdownComponent
            label="Type of Budget"
            onChangeText={(text) => inputChangeHandler("budgetType", text)}
          />
          <Field
            placeholder="Your Budget for this Period"
            title="Budget"
            value={formData.budget}
            onChangeText={(text) => inputChangeHandler("budget", text)}
          />
        </View>

        <TouchableOpacity
          className="w-full items-center justify-center h-[50px] bg-[#fb6f92] rounded-xl mt-5"
          onPress={addBudgetHandler}
        >
          <Text className="text-white font-semibold text-xl">Add</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default BudgetForm;
