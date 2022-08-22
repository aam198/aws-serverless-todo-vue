<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button 
        type="button"
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
        aria-label="Go to first page">First</button>
    </li>
    <li class="pagination-item">
      <button 
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
        aria-label="Go to previous page">Previous</button>
    </li>
  <!-- Visible Button Start -->
  <li v-for="page in pages" :key="page.name"  class="pagination-item">
    <button 
      type="button"
      @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
        :aria-label="`Go to page number ${page.name}`"> {{page.name}}</button>
   </li>
  <!-- Visible Button End -->

  <li class="pagination-item">
    <button 
      type="button"
      @click="onClickNextPage"
      :disabled="isInLastPage">
      Next
    </button>
  </li>
  <li class="pagination-item">
    <button 
      type="button"
       @click="onClickLastPage"
       :disabled="isInLastPage">
      Last
    </button>
  </li>
  </ul>
</template>

<script>

export default {
  name: 'PagePagination',
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
    total: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
  },
  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }
      // When on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }
      // When in between these pages
      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
    },
    pages () {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i+= 1 ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage 
        });
      }
      return range;
    },
    isInFirstPage () {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    }
  },
  methods: {
    // In order to inform the parent, we’ll use the $emit method to emit an event with the page clicked.
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);    
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};

</script>

<style>
.pagination{
  list-style-type: none;
}
.pagination-item {
  display: inline-block;
}
.active {
  background-color: #4aae9b;
  color: #fff;
}
</style>