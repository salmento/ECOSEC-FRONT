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
                placeholder="Referencia do cliente"
                v-model="reference"
                aria-label="Search"
                required
              />
              <base-button
                class="btn btn-outline-primary"
                type="submit"
                @click="searchFunc()"
                >Pesquisar
              </base-button>
            </div>
            <hr v-if="msg" />
            <p v-if="msg" class="text-danger text-center">{{ msg }}</p>
            <hr v-if="msg" />
            <hr v-if="success" />
            <p v-if="success" class="text-success text-center">{{ success }}</p>
            <hr v-if="success" />
            <p class="" v-if="this.$route.params.reference">
              Registar roupas do cliente
              <span>{{ (reference = this.$route.params.reference) }} </span>
              -
              <span
                >{{
                  this.$route.params.firstname +
                  " " +
                  this.$route.params.lastname
                }}
              </span>
            </p>
            <div class="row">
              <div class="col-md-6">
                <label for="invoice">Factura</label>
                <base-input
                  formClasses="input-group-alternative"
                  placeholder="Factura"
                  v-model="invoice"
                  addon-left-icon="ni ni-credit-card"
                  id="factura"
                  required
                ></base-input>
              </div>
            </div>

            <hr />
            <div class="row" v-for="(order, index) in orders" :key="index">
              <div class="col-md-3">
                <div><label for="clothe"> Peça de roupa</label></div>
                <select v-model="selected" class="form-control">
                  <option disabled selected value="">
                    Selecione uma opção
                  </option>
                  <option>Gravata</option>
                  <option>Boxers</option>
                  <option>Camisa</option>
                  <option>Calças</option>
                  <option>Camisola</option>
                </select>
              </div>
              <div class="col-md-3">
                <label for="quantity"> Quantidade</label>
                <base-input
                  placeholder="Quantidade"
                  type="number"
                  id="quantity"
                  min="1"
                  formClasses="input-group-alternative"
                  v-model="quantity"
                  required
                ></base-input>
              </div>
              <div class="col-md-6">
                <label for="observation"> Observação</label>
                <base-input
                  placeholder="Observação"
                  id="observation"
                  formClasses="input-group-alternative"
                  v-model="observation"
                  required
                ></base-input>
              </div>
            </div>

            <div>
              <base-button
                type="primary"
                icon="ni ni-fat-add"
                class="my-4"
                @click="orderAdd()"
              >
              </base-button>
              <base-button
                type="primary"
                icon="ni ni-fat-delete"
                class="my-4"
                @click="orderMinus()"
              >
              </base-button>
            </div>

            <div class="text-right">
              <base-button
                type="primary"
                icon="ni ni-send"
                class="my-4"
                @click="send()"
                >Gravar
              </base-button>
              <base-button
                type="primary"
                icon="ni ni-fat-remove"
                class="my-4"
                @click="cancel()"
                >Cancelar
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
      orders: [
        {
          name: "",
        },
      ],
      client: "",
      text: "",
      search: "",
      msg: "",
      controller: 0,
      success: "",
      selected: "",
      quantity: "",
      lastname: "",
      firstname: "",
      observation: "",
      reference: "",
      invoice: "",
    };
  },
  methods: {
    searchFunc() {
      this.success = "";
      this.msg = "";
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
    orderAdd() {
      this.orders.push({
        name: "",
      });
    },
    orderMinus() {
      this.orders.pop();
    },
    send() {
      this.$router.push({
        name: "register",
      });
      /*this.success = "";
      this.msg = "";
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
        });*/
    },
    cancel() {
      (this.order = [
        {
          name: "",
        },
      ]),
        (this.client = "");
      this.text = "";
      this.search = "";
      this.msg = "";
      this.controller = 0;
      this.success = "";
      this.selected = "";
      this.quantity = "";
      this.lastname = "";
      this.firstname = "";
      this.observation = "";
      this.reference = "";
      this.invoice = "";
    },
  },
};
</script>
<style></style>
