<template>
    <div>
        <div class="container-fluid mt-7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header bg-transparent">
                            <h3 class="mb-0">Relatorio</h3>
                        </div>
                        <div class="card-body">
                            <div class="row icon-examples">
                                <div class="col-lg-4 col-md-6"
                                     v-for="(action , index) in actions" :key="index">
                                  <a type="button" :href="action.link"
                                            :title="action.name"
                                            class="btn-icon-clipboard" data-clipboard-text="air-baloon">
                                        <div>
                                            <span>{{action.name}}</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
 export default {
    
    data() {
      return {
        actions: [
          { name: "Encomenda por mês",
            link:"#/admin/orders"
          },
          { name: "Desempenho do trabalhador",
            link: "#/admin/works"
          },
          
        ]
      }
    },
    methods: {
      
    }
  };
</script>
<style></style>