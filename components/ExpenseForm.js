import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";

import back from "../assets/images/back.png";

import Field from "./Field";

function ExpenseForm(props) {
  const [formData, setFormData] = useState({});

  const [name, setName] = useState(
    props.selectedExpense ? props.selectedExpense.name : formData.name
  );
  const [description, setDescription] = useState(
    props.selectedExpense
      ? props.selectedExpense.description
      : formData.description
  );
  const [budget, setBudget] = useState(
    props.selectedExpense ? props.selectedExpense.budget : formData.budget
  );

  useEffect(() => {
    if (props.selectedExpense) {
      setName(props.selectedExpense.name);
      setDescription(props.selectedExpense.description);
      setBudget(props.selectedExpense.budget);
    }
  }, [props.selectedExpense]);

  function submitHandler() {
    if (props.selectedExpense) {
      props.onUpdateExpense(
        props.selectedExpense.id,
        name,
        description,
        budget
      );
    } else {
      props.onAddExpenses(name, description, budget);
    }
    setName("");
    setDescription("");
    setBudget("");
    props.onBack();
  }

  return (
    <Modal visible={props.visible} animationType="slide" className="">
      <View className="h-full px-5">
        <View className="flex flex-row items-center my-3 mt-5">
          <Pressable onPress={props.onBack}>
            <Image source={back} className="h-[20px] w-[20px]" />
          </Pressable>
          <Text className="font-semibold text-lg ml-2">
            {props.selectedExpense ? "Update Expense" : "Add Expense"}
          </Text>
        </View>

        <View className="mt-4">
          <Field
            placeholder="Bill/Grocery/etc..."
            title="Name"
            value={name}
            onChangeText={setName}
          />
          <Field
            placeholder="Description"
            title="Description"
            value={description}
            onChangeText={setDescription}
          />
          <Field
            placeholder="Your budget for this spending"
            title="Budget"
            value={budget}
            onChangeText={setBudget}
          />
        </View>

        <TouchableOpacity
          className="w-full items-center justify-center h-[50px] bg-[#fb6f92] rounded-xl mt-5"
          onPress={submitHandler}
        >
          <Text className="text-white font-semibold text-xl">
            {props.selectedExpense ? "Update" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default ExpenseForm;
