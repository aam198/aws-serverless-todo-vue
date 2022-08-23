<template>
<!-- https://www.digitalocean.com/community/tutorials/vuejs-vue-pagination-component -->
  <ul class="pagination">
    <li class="pagination-item">
      <button 
        class="control"
        type="button"
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
        aria-label="Go to first page"><i class="fa fa-angles-left"></i></button>
    </li>
    <li class="pagination-item">
      <button 
        class="control"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
        aria-label="Go to previous page"><i class="fa fa-angle-left"></i></button>
    </li>
  <!-- Visible Button Start -->
  <li
      v-for="page in pages"
      :key="page.name"
      class="pagination-item"
    >
      <button
        class="control"
        type="button"
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
      >
        {{ page.name }}
      </button>
    </li>
  <!-- Visible Button End -->

  <li class="pagination-item">
    <button 
      class="control"
      type="button"
      @click="onClickNextPage"
      :disabled="isInLastPage">
      <i class="fa fa-angle-right"></i>
    </button>
  </li>
  <li class="pagination-item">
    <button 
      class="control"
      type="button"
       @click="onClickLastPage"
       :disabled="isInLastPage">
     <i class="fa fa-angles-right"></i>
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
      required: true
    },
    currentPage: {
      type: Number,
      required: true
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
        const start = this.totalPages - (this.maxVisibleButtons - 1);

        if(start === 0) {
          return 1;
        } else { 
          return start;
        }
      }

      // When in between
      return this.currentPage - 1;
    },
    pages() {
      const range = [];

      for (
        let i = this.startPage;
        i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }

      return range;
    },
    endPage() {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
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
    }
  }
};

</script>

<style>
.pagination{
  list-style-type: none;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 10vh;
  margin-top: 1rem;
  margin: 0;
  padding: 0;
}
.pagination-item button{
  display:flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border: 0;
}
.control{
  cursor: pointer;
  position: relative;
  display: block;
  width: 2rem;
  height: 2rem;
  margin: 0 5px;
  background: transparent;
}
button:is(:disabled, :disabled:active){
  cursor:not-allowed;
}
.active {
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2 ease-in-out;
  background-color: var(--orange);
  color: #fff;
}
</style>