<template>
<Login/>
</template>

<script>
export default {
      data: () => ({
            drawer: true
      }),
      props: {
            source: String
      }
}
</script>

<script>
import Login from '../components/Login'
export default {
      name: "HomePage",
      components: {
            Login
      }
}
</script>

<style>

</style>
