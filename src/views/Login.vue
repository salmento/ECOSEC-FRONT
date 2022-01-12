<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>ECOSEC</small>
          </div>
          <form role="form">
            <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Username"
              addon-left-icon="ni ni-circle-08"
              v-model="username"
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="password"
            >
            </base-input>

            <p v-if="msg" class="text-danger text-center">{{ msg }}</p>
            <div class="text-center">
              <base-button type="primary" class="my-4" @click="login()"
                >Login</base-button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Api from "../service/api";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      msg: "",
    };
  },
  methods: {
    login() {
      Api.post("/auth/login", {
        username: this.username,
        password: this.password,
      })
        .then((response) => {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("firstname", response.data.firstname);
          localStorage.setItem("lastname", response.data.lastname);
          this.$router.push("/register");
        })
        .catch((err) => {
          this.msg = err.response.data.message;
        });
    },
  },
};
</script>
<style></style>
