<template>
  <div class="app-wrapper">
    <header>
      <h1>Dashboard</h1>
    </header>
    <div class="add-task-wrapper">
      <input type="text" placeholder="Add a task" v-model="newTaskInput" @keydown.enter="addTask">
      <button class="addTask" @click ="addTask">Add Task</button>
    </div>
    <!-- Tasks will be an array that lists our tasks -->
    <div class="task" v-for="task in tasks" :key="task.id">
    <div class="task-main">
      <span class="task-name"> <i class="fa-solid fa-circle-dot"></i> {{ task.name}} </span>
      <span class="buttons">
        <button class="browseImage" @click="browseForImage(task.id)"><i class="fa-solid fa-file-image"></i></button>
        <!-- <button class="edit" @click="editTask(task.id)"><i class="fa-solid fa-pen-nib"></i></button> -->
        <button class="delete" @click="removeTask(task.id)"><i class="fa-solid fa-rectangle-xmark "></i></button>
        </span>
        <input :id="`fileInput-${task.id}`" type="file" class="file-input" @change="event => attachImage(event,task)" hidden  />
    </div>
    <!-- If the imageUrl is empty then this will hide -->
    <div class="task-img" v-if="task.imageUrl">
      <img :src="task.imageUrl" />
    </div>
      <!-- Double bracket to access data -->
      
    </div>
  </div>
  <transition name= "toast">
    <ExtraToasts />
  </transition>
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

        // Success Toast 
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
    },
  // Takes our image and converts it to a string to upload it to AWS for storage
    async getDataUrl(file) {
      const reader = new FileReader()
      return new Promise(resolve => {
        reader.onload = event => resolve(event.target.result)
        reader.readAsDataURL(file)
      })
    },
    
    async browseForImage(id) {
      const inputEl = document.getElementById(`fileInput-${id}`)
      inputEl.click()
    },

    async attachImage(event, task) {
      // Only taking in 1 file at a time so we can use the array.
      let file = event.target.files[0];
      let dataUrl = await this.getDataUrl(file);

      console.log(task, dataUrl);

      let imageReqBody = {
        fileName : file.name,
        fileData: dataUrl
      }
      let imageRes = await fetch("https://vue-todo-app-images.s3.us-east-2.amazonaws.com/images", {
       method: "post",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(imageReqBody)
      });
      let imageResponseJson = await imageRes.json();
      console.log(imageResponseJson);
    }

  }


}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Gulzar&family=Inter&display=swap'); 

@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates&display=swap');

:root{
  --dark-blue: #1d313b;
  --med-blue: #4b6d7e;
  --accent-blue: #518099;
  --light-accent: #b2cfde;
  --orange: #ff844b;
  --light-orange: #ffe0d2;

}

#app {
  font-family: 'Montserrat Alternates', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f0f5f8;
  text-align: center;
  color: var(--dark-blue);
  margin-top: 60px;
  padding-bottom: 30px;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2);  
  box-sizing: border-box;
  height: 100%;
}

.app-wrapper{
  max-height: auto;
}

header{
  background-color: #518099;
  border-radius: 10px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2);
}

.adaptive-glass {
  --glass-lightness: 100%;
  background: hsl(0 0% var(--glass-lightness) / 50%);
  backdrop-filter: blur(40px);
}


h1 {
  text-shadow: 0 1px 0 hsl(0 0% 0% / 20%);
  font-size: clamp(1.25rem, calc(1rem + 2vw), 2.5rem);
  color: #ffffff;
  font-family: 'Montserrat Alternates', sans-serif;
  padding: 3rem 10px;
}

input {
  font-family: inherit;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 10px;
  padding: 8px 10px;
  border: 1px solid var(--light-accent);
  margin: 1rem 10px;
  accent-color:var(--dark-blue);
  transition: outline .2ms ease;
}

input:focus-visible{
  outline: 1px solid var(--dark-blue);
}

button.addTask {
  background-color: #ff844b;
  color: var(--dark-blue);
  border: 1px solid #ffe0d2;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2);
}

button.addTask{
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  font-family: inherit;
  box-shadow: 0 1.5rem 2.5rem 0 rgba(4,12,33,0);
  transition: transform .5s ease-out, box-shadow .5s ease, background-color 0.2s ease, text-shadow .5s ease;
  margin: 1rem 15px;
  padding: 10px 12px;
}

.buttons{
  padding: 10px 12px;
}


button.delete, button.edit, button.browseImage {
  color: #2a3453;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  font-family: inherit;
  box-shadow: 0 1.5rem 2.5rem 0 rgba(4,12,33,0);
  transition: transform .5s ease-out, box-shadow .5s ease, background-color 0.2s ease, text-shadow .5s ease;
  margin: 1rem 0px;
}

button.addTask:hover{
  background-color: #ffe0d2;
  border: 1px solid #ff844b;
  box-shadow: 0 1rem 10rem 0 #040c21;
  transform: translateY(-.25rem);
  text-shadow: 0 1px 0 hsl(0 0% 0% / 20%);
}


button.edit, button.browseImage{
  background-color: transparent;
  color: var(--orange);
  border: none;
  font-size: 1.5rem;
}

button.delete  {
  border: none;
  font-size: 1.5rem;
  background-color: transparent;
  transition: box-shadow .5s ease, transform .4s ease;
}

button:hover.delete  {
  background: none;
  transform: translateY(-.25rem) scale(1.2);
}


.add-task-wrapper{
  display: flex;
  margin-bottom: 1.2rem;
}

.add-task-wrapper input {
  flex: 1;
}

.task-main{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-img {
  max-width: 40%;
  border: 1px solid white;
}

.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 5px;
  margin: 8px 10px;
  padding: 5px 10px;
  font-weight: bold;
  transition: box-shadow .3s ease-in;
}
.task:hover{
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2);
}

.task-name {
  margin-left: 10px;
}

.task-name i{
  margin-right: 10px;
}

.file-input{
  display: none;
  visibility: hidden;
}

/* Enter transitions */
 .toast-enter-from {
    opacity: 0;
    transform: translateY(-60px);
  }
  .toast-enter-to {
    opacity: 1;
    transform: translateY(0);
  }
  .toast-enter-active {
    transition: all 0.3s ease;
  }
  /* leave transitions */
  .toast-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
  .toast-leave-to {
    opacity: 0;
    transform: translateY(-60px);
  }
  .toast-leave-active {
    transition: all 0.3s ease;
  }

</style>
