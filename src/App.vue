<template>
  <div id="app" class="container">
    <h1>To Do App</h1>
    <!-- <to-do-list> </to-do-list> -->
    <nav class="nav-bar">
      <div class="link-container">
        <router-link to="/">APP</router-link>
        <router-link to="/archive">Completati</router-link> 
      </div>
    </nav>
    <router-view></router-view>
  </div>


</template>

<script>
 // import ToDoList from './components/ToDoList.vue'

  // export default{
  //   name: 'App',
  //   components: {
  //     ToDoList
  //   }
  // }
</script>

<style>

  * {
    box-sizing: border-box;
  }

  .container {
    width: 600px;
    margin: 0 auto;
    text-align: center;
  }

  


  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center; 
    color: #2c3e50;
    margin-top: 60px;
    font-size: 24px;
  } 
 
  .logo {
    display: block;
    margin: 20px auto;
    height: 75px;
  }

  .nav-bar {
    display: inline-block;
    padding-top: 40px;
  }

  .link-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  router-link {}
</style>
