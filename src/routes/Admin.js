import EditSingular from "views/admin/editsingular.js";
import editcompany from "views/admin/editcompany";
import Singular from "views/admin/singular.js";
import ArticlesFamily from "views/admin/articlesfamily.js";
import Company from "views/admin/company.js";
import EditUsers from "views/admin/editusers.js";
import Users from "views/admin/users.js";
import Clients from "views/admin/clients.js";
import Order from "views/admin/order.js";
import Invoices from "views/admin/invoice.js";
import Report from "views/admin/report.js";
import invoiceReport from "views/admin/reportInvoice";
import receiptsReport from "views/admin/receiptsReport.js";
import moneyReport from "views/admin/moneyReport.js";
import articleReport from "views/admin/articleReport.js";
import boxClosure from "views/admin/boxClosureReport.js";
import buildingReport from "views/admin/buildingReport.js";
import tag from "views/admin/tag.js";
import address from "views/admin/address.js"; 
import Receipt from "views/admin/receipt.js";
import Quotation from "views/admin/quotation";
import QuotationView from "views/admin/viewQuotation";
var routes = [
  {
    path: "/clients",
    name: "Clientes",
    icon: "fas fa-user-friends text-white",
    component: Clients,
    layout: "/admin",
  },{
    path: "/address",
    name: "Endereço",
    icon: "fas fa-address-card text-white",
    component: address,
    layout: "/admin",
  },
  {
    path: "/tag",
    name: "Etiqueta",
    icon: "fas fa-tags text-white",
    component: tag,
    layout: "/admin",
  },

  {
    path: "/quotation/view",
    name: "Editar utilizadores",
    icon: "ni ni-books text-white",
    component: QuotationView,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/editusers",
    name: "Editar utilizadores",
    icon: "ni ni-books text-white",
    component: EditUsers,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/order",
    name: "Facturação",
    icon: "fas fa-sort-amount-down-alt text-white",
    component: Order,
    layout: "/admin",
  },
  {
    path: "/articlesfamily",
    name: "Familia de artigos",
    icon: "fas fa-tshirt text-white", 
    component: ArticlesFamily,
    layout: "/admin",
  },
  
  {
    path: "/emp",
    name: "Fecho de Caixa",
    icon: "fas fa-paste text-white",
    component: boxClosure,
    layout: "/admin",
  },
  {
    path: "/company",
    name: "empresa",
    icon: "fas fa-building text-white",
    component: Company,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/singular",
    name: "Singular",
    icon: "fas fa-male text-white",
    component: Singular,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/editsingular",
    name: "Editar",
    icon: "fas fa-male text-white",
    component: EditSingular,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/editcompany",
    name: "Editar",
    icon: "fas fa-male text-white",
    component: editcompany,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/outstanding",
    name: "pagametos",
    icon: "fas fa-credit-card text-white",
    component: Receipt,
    layout: "/admin",
  },
  {
    path: "/quotation",
    name: "Pedido de Cotação",
    icon: "fas fa-sort-amount-down-alt text-white",
    component: Quotation,
    layout: "/admin",
  },
  {
    path: "/reporter",
    name: "Relatórios",
    icon: "fas fa-paste text-white",
    component: Report,
    layout: "/admin",
  },
  {
    path: "/invoicereport",
    name: "Facturas Pendentes",
    icon: "fas fa-paste text-white",
    component: invoiceReport,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/receiptsreport",
    name: "Recibos",
    icon: "fas fa-paste text-white",
    component: receiptsReport,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/moneyreport",
    name: "Dinheiro",
    icon: "fas fa-paste text-white",
    component: moneyReport,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/articlereport",
    name: "Artigo",
    icon: "fas fa-paste text-white",
    component: articleReport,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/buildingreport",
    name: "Edificio",
    icon: "fas fa-paste text-white",
    component: buildingReport,
    layout: "/admin",
    invisible: true
  },{
    path: "/invoice",
    name: "Segunda Via",
    icon: "fas fa-file-invoice text-white",
    component: Invoices,
    layout: "/admin",
  },
  
  {
    path: "/users",
    name: "Utilizadores",
    icon: "ni ni-badge text-white",
    component: Users,
    layout: "/admin",

  }

];

export default routes;
