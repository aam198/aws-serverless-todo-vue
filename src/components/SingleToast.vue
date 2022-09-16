<template>
 <div class="toast">
    <div class="sidebar" :class="toast.type"></div>
    <div class="content">
      <div class="header">
        <h3>{{ toast.title }}</h3>
        <button @click="dismissToast"><i class="fa-solid fa-rectangle-xmark"></i></button>
      </div>
      <div class="text">
        <p>{{ toast.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ToastError',
  props: {
    toast: { required: true, type: Object }
  },
  created () {
    //  Automatically dismiss toast after 5 seconds
    setTimeout(() => {
      this.dismissToast();
    }, 5000);
  },
  methods: {
    dismissToast() {
      this.$store.commit('clearToast', this.toast.title);
    }
  }
  
}
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/fontawesome.min.css');

:root {
  --cream: #faf8f7;
  --light-grey: #F0F7F4;
  --grey: #cccccc;
  --white: #FFFFFF;
  --green: #1A936F;
  --red: #df2935;
  --blue: #009999;
  --yellow: #fdca40;
}

.success, .info, .warning, .error {
  color: var(--white);
}

.success {
  background-color: var(--green);
}

.info {
  background-color: var(--blue);
}

.warning {
  background-color: var(--yellow);
}

.error {
  background-color: var(--red);
}

.toast {
  width: 500px;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  background-color: var(--cream);
  justify-content: center;
  border-top-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-top-right-radius: .5rem;
  box-shadow: 0 0 0.5rem rgb(76, 66, 76, 0.5);
}

.toast p {
  font-weight: 100;
}

.toast .sidebar {
  width: .5rem;
}

.toast .content, .toast .header, .toast .text {
  width: 100%;
  display: flex;
}

.toast .content {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
  box-sizing: border-box;
}

.toast .header, .toast .text {
  flex-direction: row;
  justify-content: flex-start;
  text-align: left;
}

.toast .header {
  height: 25px;
  margin-bottom: 1rem;
}

.toast .header button {
  margin-left: auto;
  text-decoration: none;
  border: none;
  cursor: pointer;
  background: none;
  font-size: 1.5rem;
  height: 30px;
  width: 30px;
  transition: transform 200ms ease;
}

.toast .header button:hover {
  transform: scale(1.2);
  background-color: var(--cream);
  box-shadow: none;
}

.toast .content {
  flex-grow: 1;
}
</style>