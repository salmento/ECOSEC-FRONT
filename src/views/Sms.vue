<template>
  <div class="row justify-content-center">
    <div class="col-lg-11 col-md-10 col-10 mt-lg-7 mt-2">
      <div class="card bg-default shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <form>
            <div class="row mb-4 ml-1">
              <input
                class="form-control mr-sm-2 col-10 col-sm-8"
                type="search"
                placeholder="Search"
                v-model="search"
                aria-label="Search"
                required
              />
              <base-button
                class="btn btn-outline-primary"
                type="submit"
                @click="searchFunc()"
                >Search
              </base-button>
            </div>
            <hr v-if="msg" />
            <p v-if="msg" class="text-danger text-center">{{ msg }}</p>
            <hr v-if="msg" />
            <hr v-if="success" />
            <p v-if="success" class="text-success text-center">{{ success }}</p>
            <hr v-if="success" />
            <p class="" v-if="this.$route.params.phoneNumber">
              Mandar notificação para o número
              <span>{{ (phoneNumber = this.$route.params.phoneNumber) }} </span>
              do
              <span
                >{{
                  this.$route.params.firstname +
                  " " +
                  this.$route.params.lastname
                }}
              </span>
            </p>
            <p class="" v-if="client">
              Mandar notificação para o número
              <span>{{ client.phoneNumber }} </span>
              do
              <span>{{ client.firstname + " " + client.lastname }} </span>
            </p>
            <textarea
              class="form-control"
              id="text"
              rows="3"
              v-model="text"
              placeholder="Escreva mensagem para o cliente aqui!!! ..."
            ></textarea>

            <div class="text-center">
              <base-button
                block
                type="primary"
                icon="ni ni-send"
                class="my-4"
                @click="send()"
                >Mandar notificação
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
  name: "sms",
  data() {
    return {
      client: "",
      text: "",
      search: "",
      msg: "",
      controller: 0,
      success: "",
    };
  },
  methods: {
    
    searchFunc() {
      this.success = "";
      this.msg = ""
      Api.get(`/client/findone/${this.search}`, {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
      })
        .then((response) => {
          this.client = response.data;
          this.controller = 1;
          this.msg = "";
        })
        .catch((err) => {
          this.msg = err.response.data.message;
        });
    },
    send() {
      this.success = "";
      this.msg = ""
      Api.post(
        `/client/sms`,
        {
          
          phoneNumber: this.client.phoneNumber | this.$route.params.phoneNumber,
          text: this.text,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      )
        .then((response) => {
          this.success = response.data.message;
          this.client = "";
          this.$route.params.phoneNumber = "";
        })
        .catch((err) => {
          this.msg = err.response.data.message;
        });
    },
  },
};
</script>
<style></style>
