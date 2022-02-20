<template>
  <div class="row justify-content-center">
    <div class="mt-lg-7 mt-2">
      <div class="card bg-default px-auto shadow border-0">
        <div class="card-header py-lg-5">
          <div class="row mb-4 ml-1">
            <div class="col-md-4">
            <label for="firstname">De:</label>
            <input
              class="form-control mr-sm-2 "
              type="date"
              v-model="inDate"
              aria-label="Search"
            />
            </div>
            <div class="col-md-4">
            <label for="firstname">Até:</label>
            <input
              class="form-control mr-sm-2 "
              type="date"
              v-model="outDate"
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
            </div >
          </div>
          <div class=" row  ">
            <div class="col-2 bg-default mx-1">
              <p>Total de encomendas:</p>
              <span class="label">1234</span>
            </div>
            <div class="col-2 bg-default  mx-1">
              <p>Total de entregas:</p>
              <span class="label">1234</span>
            </div>
            <div class="col-2 bg-default mx-1">
              <p>Total de Prontos:</p>
              <span class="label">1234</span>
            </div>
            <div class="col-2  bg-default mx-1">
              <p>Total de Pendentes:</p>
              <span class="label">1234</span>
            </div>
          </div>
        </div>

        <div class="card-body py-lg-5">
          <table class="table table-dark">
            <thead class="">
              <tr>
                <th scope="col">Ref</th>
                <th scope="col">Nome</th>
                <th scope="col">Apelido</th>
                <th scope="col">Factura</th>
                <th scope="col">Peça</th>
                <th scope="col">Quant</th>
                <th scope="col">Obs</th>
                <th scope="col">Estado</th>
                <th scope="col">D. Entrada</th>
                <th scope="col">D . Entrega</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>AL20201</th>
                <td>Salmento</td>
                <td>Chitlango</td>
                <td>10/200</td>
                <td>Gravata</td>
                <td>10</td>
                <td>Sem nodoas</td>
                <td>Pendente</td>
                <td>15-02-2022</td>
                <td>20-02-2022</td>
              </tr>
              <tr>
                <th>AL20201</th>
                <td>Salmento</td>
                <td>Chitlango</td>
                <td>10/200</td>
                <td>Gravata</td>
                <td>10</td>
                <td>Sem nodoas</td>
                <td>Pendente</td>
                <td>15-02-2022</td>
                <td>20-02-2022</td>
              </tr>
              <tr>
                <th>AL20201</th>
                <td>Salmento</td>
                <td>Chitlango</td>
                <td>10/200</td>
                <td>Gravata</td>
                <td>10</td>
                <td>Sem nodoas</td>
                <td>Pendente</td>
                <td>15-02-2022</td>
                <td>20-02-2022</td>
              </tr>
              <tr>
                <th>AL20201</th>
                <td>Salmento</td>
                <td>Chitlango</td>
                <td>10/200</td>
                <td>Gravata</td>
                <td>10</td>
                <td>Sem nodoas</td>
                <td>Pendente</td>
                <td>15-02-2022</td>
                <td>20-02-2022</td>
              </tr>
              <tr v-for="(client, index) in clients" :key="index">
                <th>{{ index + 1 }}</th>
                <th>{{ clinet.reference }}</th>
                <td>{{ client.firstname }}</td>
                <td>{{ client.lastname }}</td>
                <td>{{ client.invoice }}</td>
                <td>{{ client.clothes }}</td>
                <td>{{ client.quantity }}</td>
                <td>{{ client.observation }}</td>
                <td>{{ client.status }}</td>
                <td>{{ client.data }}</td>
                <td>
                  <base-button
                    class="bg-default"
                    icon="ni ni-send"
                    @click="notifications()"
                  >
                  </base-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <p v-if="msg" class="text-danger text-center">{{ msg }}</p>
  </div>
</template>
<script>
//import Api from "../service/api";
export default {
  name: "tables",
  data() {
    return {
      clients: [],
      msg: "",
      reference: "",
    };
  },
  methods: {
    notifications() {
      this.$router.push({
        name: "SMS",
      });
    },
    /*notifications(firstname, lastname, phoneNumber) {
      this.$router.push({
        name: "SMS",
        params: { firstname, lastname, phoneNumber },
      });
    },*/
  },
  /*mounted() {
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
  },*/
};
</script>
<style scoped>
.table th,
.table td {
  padding: 0.2rem;
  font-size: 12px;
  text-align: center;
}
</style>
