<template>
  <div class="card">
    <div class="justify-content-center col-11 mt-lg-7 mt-2 mx-auto">
      <div class="card bg-default px-auto shadow border-0">
        <div class="card-header py-lg-5">
          <div class="row mb-4 ml-1">
            <input
              class="form-control mr-sm-2 col-5 col-sm-4"
              type="search"
              placeholder="Nome do cliente"
              v-model="name"
              aria-label="Search"
            />
            <input
              class="form-control mr-sm-2 col-5 col-sm-4"
              type="search"
              placeholder="Apelido"
              v-model="surname"
              aria-label="Search"
            />
            <base-button
              class="btn btn-outline-primary"
              type="submit"
              @click="searchFunc()"
              >Pesquisar
            </base-button>
          </div>
          <base-button
            type="primary"
            class="btn btn-outline-success"
            @click="login()"
            >Criar user</base-button
          >
        </div>
      </div>
    </div>
    <div class="table-responsive col-11 mx-auto">
      <base-table
        class="table-dark align-items-center table-flush"
        
        :data="tableData"
      >
        <template v-slot:columns>
          <th>#</th>
          <th>Username</th>
          <th>Nome</th>
          <th>Apelido</th>
          <th>Nr. telefone</th>
          <th>T. Cliente</th>
          <th>Função</th>
          <th>Estado</th>
          <th>Acção</th>
        </template>
        <template v-slot:default="row">
          <td scope="row"> {{ row.item.index }}</td>
          <td>{{ row.item.username }}</td>
          <td>{{ row.item.name }}</td>
          <td>{{ row.item.surname }}</td>
          <td>{{ row.item.telefone }}</td>
          <td>{{ row.item.typeclient }}</td>
          <td>{{ row.item.role }}</td>
          <td>{{ row.item.status }}</td>
          <td>
            <base-button
              class="btn btn-outline-primary"
              @click="notifications()"
            >
              Editar
            </base-button>
            <base-button
              class="btn btn-outline-primary"
              @click="notifications()"
            >
              Desactivar
            </base-button>
          </td>
        </template>
      </base-table>
    </div>
    <base-pagination :page-count="10" size="sm" class="ml-5"></base-pagination>
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
      tableData: [
        {
          index: 1,
          username: "salmento",
          name: "Salmento",
          surname: "Chitlango",
          telefone: 849229754,
          typeclient: "Empresarial",
          role: "Operador",
          status: "Activo"
        },
        {
          index: 1,
          username: "salmento",
          name: "Salmento",
          surname: "Chitlango",
          telefone: 849229754,
          typeclient: "Empresarial",
          role: "Operador",
          status: "Activo"
        },{
          index: 1,
          username: "salmento",
          name: "Salmento",
          surname: "Chitlango",
          telefone: 849229754,
          typeclient: "Empresarial",
          role: "Operador",
          status: "Activo"
        },{
          index: 1,
          username: "salmento",
          name: "Salmento",
          surname: "Chitlango",
          telefone: 849229754,
          typeclient: "Empresarial",
          role: "Operador",
          status: "Activo"
        },{
          index: 1,
          username: "salmento",
          name: "Salmento",
          surname: "Chitlango",
          telefone: 849229754,
          typeclient: "Empresarial",
          role: "Operador",
          status: "Activo"
        },
        {
          index: 1,
          username: "salmento",
          name: "Salmento",
          surname: "Chitlango",
          telefone: 849229754,
          typeclient: "Empresarial",
          role: "Operador",
          status: "Activo"
        },{
          index: 1,
          username: "salmento",
          name: "Salmento",
          surname: "Chitlango",
          telefone: 849229754,
          typeclient: "Empresarial",
          role: "Operador",
          status: "Activo"
        },{
          index: 1,
          username: "salmento",
          name: "Salmento",
          surname: "Chitlango",
          telefone: 849229754,
          typeclient: "Empresarial",
          role: "Operador",
          status: "Activo"
        },
        {
          index: 1,
          username: "salmento",
          name: "Salmento",
          surname: "Chitlango",
          telefone: 849229754,
          typeclient: "Empresarial",
          role: "Operador",
          status: "Activo"
        },{
          index: 1,
          username: "salmento",
          name: "Salmento",
          surname: "Chitlango",
          telefone: 849229754,
          typeclient: "Empresarial",
          role: "Operador",
          status: "Activo"
        },{
          index: 1,
          username: "salmento",
          name: "Salmento",
          surname: "Chitlango",
          telefone: 849229754,
          typeclient: "Empresarial",
          role: "Operador",
          status: "Activo"
        },
        {
          index: 1,
          username: "salmento",
          name: "Salmento",
          surname: "Chitlango",
          telefone: 849229754,
          typeclient: "Empresarial",
          role: "Operador",
          status: "Activo"
        },{
          index: 1,
          username: "salmento",
          name: "Salmento",
          surname: "Chitlango",
          telefone: 849229754,
          typeclient: "Empresarial",
          role: "Operador",
          status: "Activo"
        },{
          index: 1,
          username: "salmento",
          name: "Salmento",
          surname: "Chitlango",
          telefone: 849229754,
          typeclient: "Empresarial",
          role: "Operador",
          status: "Activo"
        },
      ],
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
  padding: 0.2rem;
  font-size: 12px;
  text-align: center;
}
</style>
