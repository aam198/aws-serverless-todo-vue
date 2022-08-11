<template>
    <header>
      <h1>Vue Todo App</h1>
    </header>
    <div class="add-task-wrapper">
      <input type="text" placeholder="Add a task" v-model="newTaskInput" @keydown.enter="addTask">
      <button class="addTask" @click ="addTask">Add Task</button>
    </div>
    <!-- Tasks will be an array that lists our tasks -->
    <div class="task" v-for="task in tasks" :key="task.id">
      <!-- Double bracket to access data -->
      <span> {{ task.name}} </span><span><button class="delete" @click="removeTask(task.id)"><i class="fa-solid fa-rectangle-xmark"></i></button></span>
    </div>
    <ExtraToasts />
</template>

<script>
import ExtraToasts from '@/components/ExtraToasts.vue';

export default {
  name: 'App',
  components: {
    ExtraToasts

  },
  data() {
    // Return an object
    return{
      // Connects to the v-model above to pass the input to here.
      newTaskInput: "",
      tasks: [],
      statusCode: ""
    }
  },
  // Lifecycle Hook, default function that runs anytime a component is created. 
  async created() {
    // Will pull in json array into created response variable
    let response = await fetch("https://h9ozo62twe.execute-api.us-east-2.amazonaws.com/todos");
    this.tasks = await response.json();
  },
  methods: {
    async addTask() {
      if(this.newTaskInput === ""){
        this.$store.commit('addToast', {
            title: "Uh Oh!",
            type: 'error',
            message: 'Task field is empty, please add a task.'
          })
        console.log(this.$store.state.toasts);
      }
      else {
        // Create random id for the task.id
        let taskId = Math.floor(Math.random() * (99999999 * 100000000) * 100000000)
        // Pushing to tasks array when task has been added
        let newTask = {
          id: taskId,
          name: this.newTaskInput,
        }
        this.tasks.push(newTask);

        // Send to dynamoDb, also passing in an object of extra params
        const response = await fetch("https://h9ozo62twe.execute-api.us-east-2.amazonaws.com/todos", {
          method: "post",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(newTask)
        })
        // Success message
        this.statusCode = response;
        if(this.statusCode.status === 201 ){
          this.$store.commit('addToast', {
            title: "Task Added!",
            type: 'success',
            message: 'Task has been added to DynamoDB!.'
          })
          console.log(this.$store.state.toasts);
        }
        console.log(this.statusCode);
        
        // Clear the input after the user selects Add Task
        this.newTaskInput = '';
      }
    },
    async removeTask(taskId) {
      // Send to dynamoDb, also passing in an object of extra params
        const response = await fetch("https://h9ozo62twe.execute-api.us-east-2.amazonaws.com/todos", {
          method: "delete",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({id: taskId})
        })
        console.log(response);
      // To remove from list on the actual app, filter the list of tasks that do NOT match the tasks. 
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
  padding-bottom: 30px;
  max-width: 500px;
  margin: 0 auto;
  max-height: 100vh;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2);  
}

header{
  background-color: #2a3453;
  border-radius: 10px;
}

h1 {
  font-size: 2.5rem;
  padding: 1rem 0px;
  color: #efae22;
  font-family: 'Gulzar', serif;
}

input {
  font-size: 1rem;
  border-radius: 10px;
  padding: 8px 10px;
  border: 1px solid #2a3453;
  margin: 1rem 10px;
  accent-color: #2a3453;
}

input:focus-visible{
  outline: 1px solid #2a3453;
}

button.delete, button.addTask {
  color: #2a3453;
  border: 1px solid #2a3453;
  border-radius: 10px;
  background-color: #ab5e5c;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 1.5rem 2.5rem 0 rgba(4,12,33,0);
  transition: transform .5s ease-out, box-shadow .5s ease, background-color 0.2s ease;
  margin-left: 1rem;
  padding: 8px 10px;
  margin: 1rem 10px;
}

button:hover{
  background-color: #bc7e7d;
  box-shadow: 0 1rem 10rem 0 #040c21;
  transform: translateY(-.25rem);
}

button.delete  {
  border: none;
  font-size: 1.5rem;
  background-color: transparent;
  transition: box-shadow .5s ease;
}

button:hover.delete  {
  background: none;
}


.add-task-wrapper{
  display: flex;
  margin-bottom: 1rem;
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
