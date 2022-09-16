<template>
  <div class="joke">
    <p :class="joke-content"> {{ joke }}</p>
    <button class="tellJoke" @click="getJoke">Tell me a joke!</button>
    </div>  
</template>

<script>
export default {
  name: "JokeButton",
  data () {
    return{
      joke: "",
    }
  },
  methods: {
    async getJoke() {
      const res = await fetch("https://api.chucknorris.io/jokes/random")
      const data = await res.json();
      this.joke = data.value;
    }
  }
}
</script>

<style scoped>
button{
  background-color: var(--orange);
  margin-top: 0.5rem;
}

.joke-content {
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.5rem 0.2rem;
  margin: 10px 10px;
}
</style>

