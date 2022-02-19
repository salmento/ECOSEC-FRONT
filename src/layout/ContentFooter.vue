<template>
  <footer class="mt-4 px-4">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-6">
        <div class="copyright text-center text-lg-left text-muted">
          © {{ year }}
          <a
            href="https://www.creative-tim.com"
            class="font-weight-bold ml-1"
            target="_blank"
            >ECOSEC</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style scoped>
footer {
  background-color: #e8e9ee;
  margin-left: 2px;
  left: 20%;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: center;
}
</style>
