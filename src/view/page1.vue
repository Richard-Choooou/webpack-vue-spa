<template>
    <div class="page1">
        page1
        <img src="~@/assets/images/a1.jpeg" alt="">
    </div>
</template>

<script>
const A = function() {
    this.a = 1
}
export default {
    created() {
        new A()
    }
}
</script>

<style lang="scss" scoped>
.page1 {
    background: #ff0;
}
</style>
