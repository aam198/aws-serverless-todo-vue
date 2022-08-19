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
    maxVisibleButtons: {
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
  },
  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }
      // When on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons;
      }
      // When in between these pages
      return this.currentPage - 1;
    },
    pages () {
      const range = [];

      for (let i = this.startPage; i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages); i++) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage});
      }
      return range;
    },
  }
};


</script>