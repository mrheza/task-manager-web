<template>
  <div id="app">
    <md-toolbar color="primary" class="expanded-toolbar">
      <span class="branding">
        <md-button
          ><router-link to="/">{{ title }}</router-link></md-button
        >
      </span>
    </md-toolbar>
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";

export default class App extends Vue {
  title = "Task Manager";
}
</script>

<style>
#app {
  font-family: "Ubuntu", sans-serif;
}

.branding {
  flex: 1;
  text-align: left;
}

h1 {
  text-align: center;
}
</style>
