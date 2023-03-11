import EditSingular from "views/operator/editsingular.js";
import EditCompany from "views/operator/editcompany.js";
import Singular from "views/operator/singular.js";
import ArticlesFamily from "views/operator/tag.js";
import Company from "views/operator/company.js";
import Clients from "views/operator/clients.js";
import Order from "views/operator/order.js";
import Invoices from "views/operator/invoice.js";
import boxClosure from "views/operator/boxClosureReport.js";
import Receipt from "views/operator/receipt.js";
import Quotation from "views/operator/quotation"

import QuotationView from "views/admin/viewQuotation";

var routes = [

 
  {
    path: "/clients",
    name: "Clientes",
    icon: "fas fa-user-friends text-white",
    component: Clients,
    layout: "/operator",
  },
  {
    path: "/tag",
    name: "Etiquetas",
    icon: "fas fa-tshirt text-white", 
    component: ArticlesFamily,
    layout: "/operator",
  },
  {
    path: "/quotation/view",
    name: "Editar utilizadores",
    icon: "ni ni-books text-white",
    component: QuotationView,
    layout: "/operator",
    invisible: true,
  },
  {
    path: "/order",
    name: "Facturação",
    icon: "fas fa-sort-amount-down-alt text-white",
    component: Order,
    layout: "/operator",
  },
  {
    path: "/emp",
    name: "Fecho de Caixa",
    icon: "fas fa-paste text-white",
    component: boxClosure,
    layout: "/operator",
  },
  {
    path: "/company",
    name: "empresa",
    icon: "fas fa-building text-white",
    component: Company,
    layout: "/operator",
    invisible: true,
  },
  {
    path: "/singular",
    name: "Singular",
    icon: "fas fa-male text-white",
    component: Singular,
    layout: "/operator",
    invisible: true,
  },
  
  {
    path: "/editsingular",
    name: "Editar",
    icon: "fas fa-male text-white",
    component: EditSingular,
    layout: "/operator",
    invisible: true,
  }, {
    path: "/editcompany",
    name: "Editar",
    icon: "fas fa-male text-white",
    component: EditCompany,
    layout: "/operator",
    invisible: true,
  },
  
  {
    path: "/payment",
    name: "pagametos",
    icon: "fas fa-credit-card text-white",
    component: Receipt,
    layout: "/operator",
  },
  {
    path: "/quotation",
    name: "Pedido de Cotação",
    icon: "fas fa-sort-amount-down-alt text-white",
    component: Quotation,
    layout: "/operator",
  },
  
  {
    path: "/outstanding",
    name: "Segunda Via",
    icon: "fas fa-file-invoice text-white",
    component: Invoices,
    layout: "/operator",
  },
  
  
];
export default routes;
