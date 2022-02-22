<template>
  <div class="row justify-content-center">
    <div class="mt-lg-7 mt-2 mx-auto">
      <div class="card bg-default px-auto shadow border-0">
        <div class="card-header py-lg-5">
          <div class="row mb-4 ml-1">
            <div class="col-md-4">
              <label for="initialOrder">Quant. encomendas de:</label>
              <input
                class="form-control mr-sm-2"
                type="number"
                min="1"
                v-model="initialOrder"
                aria-label="Search"
              />
            </div>
            <div class="col-md-4">
              <label for="firstname">Até:</label>
              <input
                class="form-control mr-sm-2"
                type="number"
                min="1"
                v-model="lastOrder"
                aria-label="Search"
              />
            </div>
            <div class="col-md-4 my-2 py-4">
              <base-button
                class="btn btn-outline-primary"
                type="submit"
                @click="searchFunc()"
                >Pesquisar
              </base-button>
            </div>
          </div>
          <div>
            <base-button type="primary" @click="modal = true" class="btn btn-outline-success ml-4">
              Mandar promoção
            </base-button>
            <modal v-model:show="modal">
              <template v-slot:header>
                <h5 class="modal-title" id="exampleModalLabel">Mensagem da promoção</h5>
              </template>
              <div>
                <textarea
              class="form-control"
              id="text"
              rows="3"
              v-model="text"
              placeholder="Escreva mensagem para o cliente aqui!!! ..."
            ></textarea>
              </div>
              <template v-slot:footer>
                <base-button type="danger" @click="modal = false"
                  >Cancelar</base-button
                >
                <base-button type="success">Confirmar</base-button>
              </template>
            </modal>
          </div>
        </div>
        <div class="card-body table-responsive px-lg-5 py-lg-5">
          <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Ref</th>
                <th scope="col">Nome</th>
                <th scope="col">Apelido</th>
                <th scope="col">Nr. telefone</th>
                <th scope="col">Q. Encomendas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <th>SC202201</th>
                <td>Salmento</td>
                <td>Chitlango</td>
                <td>849229754</td>
                <td>20</td>
              </tr>
              <tr>
                <th>1</th>
                <th>SC202201</th>
                <td>Salmento</td>
                <td>Chitlango</td>
                <td>849229754</td>
                <td>20</td>
              </tr>
              <tr>
                <th>1</th>
                <th>SC202201</th>
                <td>Salmento</td>
                <td>Chitlango</td>
                <td>849229754</td>
                <td>20</td>
              </tr>
              <tr>
                <th>1</th>
                <th>SC202201</th>
                <td>Salmento</td>
                <td>Chitlango</td>
                <td>849229754</td>
                <td>20</td>
              </tr>
              <tr>
                <th>1</th>
                <th>SC202201</th>
                <td>Salmento</td>
                <td>Chitlango</td>
                <td>849229754</td>
                <td>20</td>
              </tr>
              <tr v-for="(client, index) in clients" :key="index">
                <th>{{ index + 1 }}</th>
                <th>{{ clinet.reference }}</th>
                <td>{{ client.firstname }}</td>
                <td>{{ client.lastname }}</td>
                <td>{{ client.phoneNumber }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <base-pagination
          :page-count="10"
          size="sm"
          class="ml-5"
        ></base-pagination>
      </div>
    </div>
    <p v-if="msg" class="text-danger text-center">{{ msg }}</p>
  </div>
</template>
<script>
import Api from "../service/api";
export default {
  name: "tables",
  data() {
    return {
      clients: [],
      msg: "",
      modal:false
    };
  },
  methods: {
    notifications(firstname, lastname, phoneNumber) {
      this.$router.push({
        name: "SMS",
        params: { firstname, lastname, phoneNumber },
      });
    },
  },
  mounted() {
    Api.get("/client/findall", {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        this.clients = response.data
          .reduce(
            (map, client) => map.set(client.phoneNumber, client),
            new Map()
          )
          .values();
      })
      .catch((err) => {
        this.msg = err.response.data.message;
      });
  },
};
</script>
<style scoped>
.table th,
.table td {
  padding: 0.5rem;
  font-size: 14px;
  text-align: center;
}
</style>
