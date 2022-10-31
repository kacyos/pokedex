<template>
  <ul v-if="total > 1" class="paginator">
    <li>
      <button class="button-first-page" v-if="currentPage">
        <mdicon name="arrowCollapseLeft" size="18" />
      </button>
    </li>

    <li @click="selectCurrentPage" v-for="page in pages" :key="page">
      <button @click="handlePage(perPage * (page - 1))">
        {{ page.toLocaleString("pt-Br", { minimumIntegerDigits: 2 }) }}
      </button>
    </li>

    <li>
      <button
        class="button-last-page"
        @click="handlePage(perPage * (totalPages - 1))"
      >
        <mdicon name="arrowCollapseRight" size="18" />
      </button>
    </li>
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
  components: {},
  computed: {
    pages() {
      /* eslint-disable */
      const current = this.currentPage;
      const rangePage = 8;
      const offset = 7;
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
  gap: 20px;
  justify-content: center;
  width: 100%;
  padding: 20px;

  > li {
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;

    > span {
      color: aliceblue;
      font-size: 12px;
    }

    > button {
      cursor: pointer;
      border: none;
      border-radius: 4px;
      height: 25px;
      width: 25px;
    }
  }

  .button-last-page,
  .button-first-page {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 45%;
    background-color: rgba(210, 222, 255, 0.598);
    color: #fff;
  }

  .active {
    background-color: rgba(210, 222, 255, 0.598);
  }
}
</style>
