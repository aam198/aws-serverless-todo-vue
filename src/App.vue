<template>
  <div id="app">
    <h1>Vue Todo App</h1>
    <div class="add-task-wrapper">
      <input type="text" v-model="newTaskInput" @keydown.enter="addTask">
      <button @click ="addTask">Add Task</button>
    </div>
    <!-- Tasks will be an array that lists our tasks -->
    <div class="task" v-for="task in tasks" :key="task.id">
      <!-- Double bracket to access data -->
      <span> {{ task.name}} </span><span class="delete"><button @click="removeTask(task.id)">X</button></span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    // Return an object
    return{
      // Connects to the v-model above to pass the input to here.
      newTaskInput: "",
      tasks: [],
    }
  },
  methods: {
    addTask() {
      // Create random id for the task.id
      let taskId = Math.floor(Math.random() * (99999999 * 100000000) * 100000000)
      // Pushing to tasks array
      let newTask = {
        id: taskId,
        name: this.newTaskInput,
      }
      this.tasks.push(newTask);
      // Clear the input after the user selects Add Task
      this.newTaskInput = '';
    },
    removeTask(taskId) {
      // filter the list of tasks that do NOT match the tasks. 
      this.tasks = this.tasks.filter(task => task.id !== taskId)
    }
  }


}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 500px;
  margin: 0 auto;
}

button, input {
  border-radius: 5px;
  padding: 5px 10px;
  border: 1px solid #aaa;
  margin: 5px;
}

.add-task-wrapper{
  display: flex;
}

.add-task-wrapper input {
  flex: 1;
}

.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eee;
  border-radius: 5px;
  margin: 5px 10px;
  padding: 5px 10px;
}


</style>
