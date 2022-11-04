<template>
  <div v-if="total > 1" class="container flex justify-center mx-auto">
    <ul class="flex">
      <li @click="selectCurrentPage(1)">
        <button
          @click="handlePage"
          :disabled="currentPage < 8"
          class="disabled:bg-zinc-400 disabled:text-blue-200 disabled:cursor-not-allowed w-auto h-8 md:h-10 px-1 md:px-5 text-gray-600 bg-white border border-r-0 border-gray-600 rounded-l-md hover:bg-gray-100"
        >
          <mdicon name="page-first" size="24" />
        </button>
      </li>
      <li @click="selectCurrentPage(page)" v-for="page in pages" :key="page">
        <button
          :class="
            currentPage == page
              ? 'w-8 px-1 h-8 md:h-10 md:w-auto md:px-4 text-white bg-blue-900 border border-r-0 border-gray-600'
              : 'w-8 px-1 h-8 md:h-10 md:w-auto md:px-4 text-gray-600 bg-gray-200 border border-r-0 border-gray-600 hover:bg-blue-300'
          "
          @click="handlePage(perPage * (page - 1))"
        >
          {{ page }}
        </button>
      </li>
      <li @click="selectCurrentPage(totalPages)">
        <button
          :disabled="totalPages == currentPage"
          class="disabled:bg-zinc-400 disabled:text-blue-200 w-auto px-1 md:h-10 h-8 md:px-5 text-gray-600 bg-white border border-gray-600 rounded-r-md hover:bg-gray-100"
          @click="handlePage(perPage * (totalPages - 1))"
        >
          <mdicon name="page-last" size="24" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PaginatorComponent",
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
      console.log(this.currentPage);
      const current = Number(this.currentPage);
      const rangePage = 8;
      const offset = 7;
      const totalPages = this.totalPages;
      const arrayPages = [];

      for (let index = 1; index <= totalPages; index++) {
        arrayPages.push(
          index.toLocaleString("pt-Br", { minimumIntegerDigits: 2 })
        );
      }

      arrayPages.splice(0, current - offset);
      arrayPages.splice(rangePage, this.total);
      console.log(arrayPages);
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
    selectCurrentPage(page) {
      /*
      if (text === "Início") {
        this.currentPage = "01";
        return;
      }
      if (text === "Fim") {
        this.currentPage = this.totalPages;
        return;
      }*/
      this.currentPage = page;
    },
  },
};
</script>
