<!-- **********Change password page to import all necessary components********** -->
<template>
  <NavBar></NavBar>
  <LoGo></LoGo>
  <NewPass></NewPass>
  <FooTer></FooTer>
  <router-view></router-view>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import LoGo from '@/components/LoGo'
import NewPass from '@/components/NewPass'
import FooTer from '@/components/FooTer.vue'

export default {
    components: {
    NavBar,
    LoGo,
    NewPass,
    FooTer
  }
}
</script>