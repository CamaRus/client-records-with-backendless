// src/store/modules/todo.js
// import { createStore } from "vuex";
import Backendless from "backendless";

const state = {
  tasks: [],
  updatingTask: null,
};

const mutations = {
  SET_TASKS(state, tasks) {
    state.tasks = tasks;
    // state.tasks = state.tasks.sort((task) => task.created === created);
  },
  ADD_TASK(state, task) {
    state.tasks.push(task);
  },
  DELETE_TASK(state, taskId) {
    state.tasks = state.tasks.filter((task) => task.objectId !== taskId);
  },
  SORT_TASKS(state) {
    state.tasks.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at); // Сортировка по убыванию даты
    });
  },
  UPDATE_TASK_TEXT(state, { taskId, newText }) {
    const task = state.tasks.find((task) => task.objectId === taskId);
    if (task) {
      task.text = newText;
    }
  },
  TOGGLE_TASK_DONE(state, { taskId, done }) {
    const task = state.tasks.find((task) => task.objectId === taskId);
    if (task) {
      task.done = done;
    }
  },
  //   SET_UPDATING_TASK(state, taskId) {
  //     state.updatingTask = taskId;
  //   },

  //   CLEAR_UPDATING_TASK(state) {
  //     state.updatingTask = null;
  //   },
};

const actions = {
  async fetchTasks({ commit }) {
    try {
      const queryBuilder = Backendless.DataQueryBuilder.create().setSortBy([
        "created ASC",
      ]);
      const tasks = await Backendless.Data.of("Task").find(queryBuilder);
      commit("SET_TASKS", tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  },

  async createTask({ commit }, taskText) {
    const newTask = {
      text: taskText,
      done: false,
      created_at: new Date().toISOString(),
    };
    const savedTask = await Backendless.Data.of("Task").save(newTask);
    commit("ADD_TASK", savedTask);
    commit("SORT_TASKS"); // Добавляем этот коммит для сортировки
  },
  async deleteTask({ commit }, taskId) {
    await Backendless.Data.of("Task").remove(taskId);
    commit("DELETE_TASK", taskId);
  },
  async updateTaskText({ commit }, { taskId, newText }) {
    await Backendless.Data.of("Task").save({ objectId: taskId, text: newText });
    commit("UPDATE_TASK_TEXT", { taskId, newText });
  },
  async toggleTaskDone({ commit, state }, taskId) {
    try {
      const task = state.tasks.find((task) => task.objectId === taskId);
      if (task) {
        const updatedTask = { ...task, done: !task.done };
        await Backendless.Data.of("Task").save(updatedTask);
        commit("TOGGLE_TASK_DONE", { taskId, done: updatedTask.done });
      }
    } catch (error) {
      console.error("Error toggling task done:", error);
    }
  },
};

const todoModule = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default todoModule;
