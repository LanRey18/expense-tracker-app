import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import "./global.css";

import ExpenseItem from "./components/ExpenseItem";
import ExpenseForm from "./components/ExpenseForm";
import BudgetForm from "./components/BudgetForm";

import plusIcon from "./assets/images/plus.png";

export default function App() {
  const [expenseFormVisible, setExpenseFormIsVisible] = useState(false);
  const [budgetFormVisible, setBudgetFormIsVisible] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [budgetinfo, setBudgetInfo] = useState({
    budgetType: "",
    budget: "",
  });

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + Number(expense.budget),
    0
  );

  const remainingBudget = budgetinfo.budget
    ? Number(budgetinfo.budget) - totalExpenses
    : "00000";

  function addExpensesHandler(name, description, budget) {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      {
        name: name,
        description: description,
        budget: budget,
        id: Math.random().toString(),
      },
    ]);

    endAddExpenseHandler();
  }

  function updateExpenseHandler(
    id,
    updatedName,
    updatedDescription,
    updatedBudget
  ) {
    setExpenses((currentExpenses) =>
      currentExpenses.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              name: updatedName,
              description: updatedDescription,
              budget: updatedBudget,
            }
          : expense
      )
    );
    setSelectedExpense(null); // Clear selection
  }

  function addBudgetHandler(budgetType, budget) {
    setBudgetInfo({
      budgetType: budgetType,
      budget: budget,
    });

    setBudgetFormIsVisible(false);
  }

  function startAddExpenseHandler() {
    setExpenseFormIsVisible(true);
  }

  function endAddExpenseHandler() {
    setExpenseFormIsVisible(false);
  }
  function startEditExpenseHandler(expense) {
    setSelectedExpense(expense);
    setExpenseFormIsVisible(true);
  }

  function deleteExpenseHandler(id) {
    setExpenses((currentExpenses) => {
      return currentExpenses.filter((expense) => expense.id !== id);
    });
    setBudgetInfo({
      budget: remainingBudget,
      budgetType: budgetinfo.budgetType,
    });
  }

  return (
    <SafeAreaView className="h-full">
      <ExpenseForm
        visible={expenseFormVisible}
        onBack={endAddExpenseHandler}
        onAddExpenses={addExpensesHandler}
        onUpdateExpense={updateExpenseHandler}
        selectedExpense={selectedExpense}
      />

      <StatusBar style="dark" />

      <View className="my-5 mx-4">
        <Text className="px-5 font-semibold text-xl">Expense Tracker</Text>
      </View>

      <Pressable
        className="bg-[#E18AAA] h-[20vh] mx-8 my-5 rounded-[40px] "
        onPress={() => setBudgetFormIsVisible(true)}
      >
        <View className="px-7 gap-3 mt-9">
          <Text className="font-medium text-white text-sm">
            {budgetinfo.budgetType}
          </Text>
          <Text className="text-white text-5xl">₱ {remainingBudget}</Text>
        </View>
      </Pressable>
      <BudgetForm
        visible={budgetFormVisible}
        onAddBudget={addBudgetHandler}
        onBack={() => setBudgetFormIsVisible(false)}
      />

      <View className="mx-8 mt-3">
        <View className="flex flex-row justify-between align-middle">
          <Text className="font-semibold">All Expenses</Text>
        </View>

        <ScrollView className="mt-3">
          <FlatList
            data={expenses}
            renderItem={(itemData) => {
              return (
                <ExpenseItem
                  name={itemData.item.name}
                  description={itemData.item.description}
                  budget={itemData.item.budget}
                  id={itemData.item.id}
                  onDelete={() => deleteExpenseHandler(itemData.item.id)}
                  onEditItem={() => startEditExpenseHandler(itemData.item)}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={true}
          />
        </ScrollView>
      </View>

      <TouchableOpacity
        className=" bg-[#E18AAA] absolute right-4 bottom-10 size-20 rounded-[100px] flex justify-center items-center"
        onPress={startAddExpenseHandler}
      >
        <Image source={plusIcon} className="size-14" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
