<template>
  <div class="container">
    <h4 class="my-4">Welcome to SCIM's E-Book Store</h4>

    <div class="row">
      <div
        class="col-md-3 col-lg-3 mb-3"
        v-for="book in books"
        :key="book.mask"
      >
        <div class="book-container">
          <div class="image">
            <img
              :src="book.cover"
              :alt="book.title"
              :style="{ backgroundImage: `url(${book.cover})` }"
            />
          </div>

          <div class="content mt-3">
            <button class="btn btn-info btn-block py-2">Read</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Book from "@services/api/book";

export default {
  name: "Books",
  data() {
    return {
      books: [],
      loading: true,
    };
  },
  methods: {
    getBooks() {
      Book.public.all().then(({ data: res }) => {
        this.books = res.data;
      });
    },
  },
  created() {
    this.getBooks();
  },
};
</script>
