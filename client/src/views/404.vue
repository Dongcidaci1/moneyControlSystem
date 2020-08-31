<template>
  <div class="notfound">
    <h1>NOT FOUND</h1>
  </div>
</template>

<script>
export default {
  name:"index"
}
</script>

<style scoped>
.notfound{
  width: 100%;
  height: 100%;
  /* text-align: center;
   */
  /* margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0; */
}
.notfound h1{
  font-size:30px;
  position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}
</style>