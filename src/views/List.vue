<template>
  <div class="row justify-content-center">
    <div class="col-lg-11 col-md-10 col-10 mt-lg-7 mt-2">
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Apelido</th>
            <th scope="col">Número do telefone</th>
            <th scope="col">Tipo de Cliente</th>
            <th scope="col">Notifcar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(client, index) in clients" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ client.firstname }}</td>
            <td>{{ client.lastname }}</td>
            <td>{{ client.phoneNumber }}</td>
            <td>{{ client.clientType }}</td>
            <td>
              <base-button
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
        </tbody>
      </table>
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
    };
  },
  methods: {
    notifications(firstname, lastname, phoneNumber) {
      console.log(firstname, lastname, phoneNumber);
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
        this.clients = response.data;
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
