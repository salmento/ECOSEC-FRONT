<template>
  <div class="row justify-content-center">
    <div class="col-lg-11 col-md-10 mt-8">
      <div class="card bg-default shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <form role="form" class="text-primary">
            <div class="row">
              <div class="col-md-6">
                <label for="firstname">Nome</label>
                <base-input
                  formClasses="input-group-alternative"
                  placeholder="Nome"
                  addon-left-icon="ni ni-circle-08"
                  v-model="firstname"
                  id="firstname"
                  required
                ></base-input>
              </div>
              <div class="col-md-6">
                <label for="lastname">Apelido</label>
                <base-input
                  placeholder="Apelido"
                  id="lastname"
                  formClasses="input-group-alternative"
                  addon-left-icon="ni ni-circle-08"
                  v-model="lastname"
                  required
                ></base-input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label for="phoneNumber">Número do telefone</label>
                <base-input
                  label="+258"
                  formClasses="input-group-alternative"
                  placeholder="Número do telefone"
                  addon-left-icon="ni ni-mobile-button"
                  id="phoneNumber"
                  v-model="phoneNumber"
                  type="number"
                  required
                ></base-input>
              </div>
              <div class="col-md-6">
                <label for="clientType">Tipo de Cliente</label>
                <div>
                  <select
                    v-model="clientType"
                    id="clientType"
                    class="form-control"
                    required
                  >
                    <option disabled value="">Escolha o tipo de cliente</option>
                    <option selected value="Empresa">Empresa</option>
                    <option value="Individual">Individual</option>
                  </select>
                </div>
              </div>
            </div>
            <hr v-if="msg" />
            <p v-if="msg" class="text-danger text-center">{{ msg }}</p>
            <hr v-if="msg" />

            <hr v-if="success" />
            <p v-if="success" class="text-success text-center">{{ success }}</p>
            <hr v-if="success" />
            <div class="text-center">
              <base-button
                block
                type="primary"
                icon="ni ni-send"
                class="my-4"
                @click="register()"
                >Gravar
              </base-button>
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
  name: "register",
  data() {
    return {
      firstname: "",
      lastname: "",
      phoneNumber: "",
      clientType: "Individual",
      msg: "",
      success: "",
    };
  },
  methods: {
    register() {

      this.$router.push({
        name: "Encomenda",
      });
      
      this.success = "";
      this.msg = "";
      Api.post(
        "/client/create",
        {
          firstname: this.firstname,
          lastname: this.lastname,
          phoneNumber: this.phoneNumber,
          clientType: this.clientType,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      )
        .then((response) => {
          this.firstname = "";
          this.lastname = "";
          this.phoneNumber = "";
          this.success = response.data.message;
        })
        .catch((err) => {
          this.msg = err.response.data.message;
        });
    },
  },
};
</script>
<style></style>
