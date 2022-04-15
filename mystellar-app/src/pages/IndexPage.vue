<template>
  <q-page class="flex flex-center"> Hello {{ getName }} </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "IndexPage",
  computed: {
    getName() {
      return "Joachim Fricker - or Jeff";
    },
  },
  async created() {
    console.log(" In async created");
    //const posts = await axios.get(`http://localhost:8888/catalog.json`);
    const posts = await axios.get(
      "https://drive.google.com/file/d/1XqhWwqpW_FZc3XQeXA6t4fMCCDLGBg2n/view?usp=sharing"
    );
    if (posts.data) {
      this.posts = posts.data;
      console.log("catalog is", posts.data);
    }
  },
});
</script>
