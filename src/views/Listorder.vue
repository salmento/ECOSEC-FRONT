<template>
  <div class="row justify-content-center">
    <div class="mt-lg-7 mt-2 ">
      <div class="card bg-default px-auto shadow border-0 ">
        <div class ="card-header py-lg-5">
          <div class="row mb-4 ml-1">
              <input
                class="form-control mr-sm-2 col-4 col-sm-4"
                type="search"
                placeholder="Referencia do cliente"
                v-model="reference"
                aria-label="Search"
              />
               <input
                class="form-control mr-sm-2 col-4 col-sm-4"
                type="search"
                placeholder="factura"
                v-model="reference"
                aria-label="Search"
              />
              <base-button
                class="btn btn-outline-primary"
                type="submit"
                @click="searchFunc()"
                >Pesquisar
              </base-button>
            </div>
        </div>
        <div class="card-body  py-lg-5 ">
          <table class="table table-dark ">
            <thead class="">
              <tr>
                <th scope="col">Ref</th>
                <th scope="col">Nome</th>
                <th scope="col">Apelido</th>
                <th scope="col">Factura</th>
                <th scope="col">Peça</th>
                <th scope="col">Quant</th>
                <th scope="col">Obs</th>
                <th scope="col">Estado </th>
                <th scope="col">Data</th>
                <th scope="col">Notificar</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <th> AL20201</th>
                <td>Salmento</td>
                <td>Chitlango </td>
                <td>10/200</td>
                <td>Gravata </td>
                <td>10</td>
                <td>Sem nodoas</td>
                <td>Pendente</td>
                <td>15-02-2022</td>
                <td>
                  <base-button class="bg-default"
                    icon="ni ni-send"
                    @click="
                      notifications(
                        client.firstname,
                        client.lastname,
                        client.phoneNumber
                      )
                    "
                  >
                  </base-button>
                </td>
              </tr>
              <tr >
                <th> AL20201</th>
                <td>Salmento</td>
                <td>Chitlango </td>
                <td>10/200</td>
                <td>Gravata </td>
                <td>10</td>
                <td>Sem nodoas</td>
                <td>Pendente</td>
                <td>15-02-2022</td>
                <td>
                  <base-button class="bg-default"
                    icon="ni ni-send"
                    @click="
                      notifications(
                        client.firstname,
                        client.lastname,
                        client.phoneNumber
                      )
                    "
                  >
                  </base-button>
                </td>
              </tr>
              <tr >
                <th> AL20201</th>
                <td>Salmento</td>
                <td>Chitlango </td>
                <td>10/200</td>
                <td>Gravata </td>
                <td>10</td>
                <td>Sem nodoas</td>
                <td>Pendente</td>
                <td>15-02-2022</td>
                <td>
                  <base-button class="bg-default"
                    icon="ni ni-send"
                    @click="
                      notifications(
                        client.firstname,
                        client.lastname,
                        client.phoneNumber
                      )
                    "
                  >
                  </base-button>
                </td>
              </tr>
              <tr >
                <th> AL20201</th>
                <td>Salmento</td>
                <td>Chitlango </td>
                <td>10/200</td>
                <td>Gravata </td>
                <td>10</td>
                <td>Sem nodoas</td>
                <td>Pendente</td>
                <td>15-02-2022</td>
                <td>
                  <base-button class="bg-default"
                    icon="ni ni-send"
                    @click="
                      notifications(
                        client.firstname,
                        client.lastname,
                        client.phoneNumber
                      )
                    "
                  >
                  </base-button>
                </td>
              </tr>
              <tr v-for="(client, index) in clients" :key="index">
                <th>{{ index + 1 }}</th>
                <th>{{ clinet.reference}}</th>
                <td>{{ client.firstname }}</td>
                <td>{{ client.lastname }}</td>
                <td>{{ client.invoice }}</td>
                <td>{{ client.clothes }}</td>
                <td>{{ client.quantity }}</td>
                <td>{{ client.observation }}</td>
                <td>
                  <base-button class="bg-default"
                    icon="ni ni-send"
                    @click="
                      notifications(
                      )
                    "
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
    };
  },
  methods: {

    notifications() {
      this.$router.push({
        name: "SMS"
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
