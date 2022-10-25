<template>
  <ul v-if="total > 1" class="paginator">
    <button v-if="currentPage > 9">01</button>
    <span v-if="currentPage > 9">...</span>
    <li @click="selectCurrentPage" v-for="page in pages" :key="page">
      <button @click="handlePage(perPage * (page - 1))">
        {{ page }}
      </button>
    </li>
    <span v-if="currentPage != totalPages">...</span>
    <button v-if="currentPage != totalPages">{{ totalPages }}</button>
  </ul>
</template>

<script>
export default {
  name: "PaginatorList",
  data() {
    return {
      currentPage: 1,
    };
  },
  props: {
    total: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 20,
    },
    handlePage: Function,
  },
  computed: {
    pages() {
      /* eslint-disable */
      const current = this.currentPage;
      const rangePage = 10;
      const offset = 9;
      const totalPages = this.totalPages;
      const arrayPages = [];

      for (let index = 1; index <= totalPages; index++) {
        arrayPages.push(index);
      }

      arrayPages.splice(0, current - offset);
      arrayPages.splice(rangePage, this.total);

      return arrayPages;
    },

    totalPages() {
      const calculatedTotalPages = this.total / this.perPage;

      return calculatedTotalPages !== Infinity
        ? Math.ceil(calculatedTotalPages)
        : 0;
    },
  },
  methods: {
    selectCurrentPage(event) {
      const elements = document.querySelectorAll(".active");
      for (let index = 0; index < elements.length; index++) {
        elements[index].classList.remove("active");
      }
      this.currentPage = event.target.innerText;
      event.target.className = "active";
    },
  },
};
</script>

<style lang="scss" scoped>
.paginator {
  display: flex;
  > li {
    padding: 4px;
    margin: 4px;
    border-radius: 4px;

    > button {
      cursor: pointer;
    }
  }

  .active {
    background-color: rgb(142, 69, 252);
  }
  span {
    color: #fff;
    font-size: 24px;
  }
}
</style>
