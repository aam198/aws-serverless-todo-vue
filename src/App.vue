<template>
    <header>
      <h1>Vue Todo App</h1>
    </header>
    <div class="add-task-wrapper">
      <input type="text" placeholder="Add a task" v-model="newTaskInput" @keydown.enter="addTask">
      <button @click ="addTask">Add Task</button>
    </div>
    <!-- Tasks will be an array that lists our tasks -->
    <div class="task" v-for="task in tasks" :key="task.id">
      <!-- Double bracket to access data -->
      <span> {{ task.name}} </span><span class="delete"><button @click="removeTask(task.id)">X</button></span>
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
@import url('https://fonts.googleapis.com/css2?family=Gulzar&family=Inter&display=swap'); 

#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #efae22;
  text-align: center;
  color: #2a3453;
  margin-top: 60px;
  padding-bottom: 60px;
  max-width: 500px;
  margin: 0 auto;
  max-height: 100vh;
  height: 100%;
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2);  
}

header{
  background-color: #2a3453;
  border-radius: 5px;
}

h1 {
  font-size: 2.5rem;
  padding: 1rem 0px;
  color: #efae22;
  font-family: 'Gulzar', serif;
}

button, input {
  border-radius: 8px;
  padding: 8px 10px;
  border: 1px solid #2a3453;
  margin: 1rem 10px;
  accent-color: #2a3453;
}

button {
  border: 1px solid #2a3453;
  background-color: #ab5e5c;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 1.5rem 2.5rem 0 rgba(4,12,33,0);
  transition: transform .5s ease-out, box-shadow .5s ease;
  margin-left: 1rem;
}

button:hover{
  box-shadow: 0 1.5rem 2.5rem 0 #040c21;
  transform: translateY(-.25rem);
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
  padding: 5px 5px;
}


</style>
