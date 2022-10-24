<template>
  <ul class="paginator">
    <li v-for="page in totalPages" :key="page">
      <button @click="handlePage(perPage * (page - 1))">{{ page }}</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "PaginatorList",
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
    totalPages() {
      const calculatedTotalPages = this.total / this.perPage;
      return calculatedTotalPages !== Infinity
        ? Math.ceil(calculatedTotalPages)
        : 0;
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
  }
}
</style>
