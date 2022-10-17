<!-- **********Post comment page to import all necessary components********** -->
<template>
  <NavBar></NavBar>
  <LoGo></LoGo>
  <PoSt></PoSt>
  <FooTer></FooTer>
  <router-view></router-view>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import LoGo from '@/components/LoGo'
import PoSt from '@/components/PoSt'
import FooTer from '@/components/FooTer.vue'

export default {
  components: {
    NavBar,
    LoGo,
    PoSt,
    FooTer
  }
}
</script>