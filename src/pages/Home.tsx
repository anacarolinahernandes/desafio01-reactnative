import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const sameTask = tasks.find(task => task.title === newTaskTitle);

    if (sameTask) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome. Tente novamente.",
        [{ text: "Ok, entendi"}]
      );
      return;
    }

    const newTask: Task = {
      id: Math.floor(Math.random() * 1000),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldState => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const selectedTask = tasks.map(task => task.id == id ? 
      {...task, done: !task.done} : task
    );

    setTasks(selectedTask);
  }

  function handleRemoveTask(id: number) {
    const updatedTasks = tasks.filter(task => task.id != id);
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        { 
          text: "Sim", 
          onPress: () => setTasks(updatedTasks) 
        },
        {
          text: "Não",
          style: "cancel"
        },
      ]
    );

    ;
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})