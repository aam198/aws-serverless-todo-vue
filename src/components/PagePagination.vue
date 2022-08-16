<template>
  <ul>
    <li>
      <button type="button">First</button>
    </li>
    <li>
      <button type="button">Previous</button>
    </li>
  <!-- Visible Button Start -->
  <li v-for="page in pages" :key="page.name">
    <button type="button" :disabled="page.isDisabled"> {{page.name}}</button>
   </li>
  <!-- Visible Button End -->

  <li>
    <button type="button">
      Next
    </button>
  </li>
  <li>
    <button type="button">
      Last
    </button>
  </li>
  </ul>
</template>

<script>

export default {
  props: {
    maxVisiblebuttons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      currentPage: {
        type: Number,
        required: true
      }
    }
  }
};


</script>