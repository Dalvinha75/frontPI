import BlankLayout from "@/layouts/BlankLayout";
import SidebarLayout from "@/layouts/SidebarLayout";
import { RouterRaw } from "@/types/RouterRaw";

/**
 *   { icon: Home, label: "Home", path: "/" },
  { icon: Users, label: "Cliente", path: "/clientes" },
  { icon: FileSpreadsheet, label: "Projetos", path: "/projetos" },
  { icon: Calculator, label: "Orçamentos", path: "/orcamentos" },
  { icon: DollarSign, label: "Comissões", path: "/comissoes" },
  { icon: PiggyBank, label: "Fluxo de caixa", path: "/fluxo-de-caixa" },
 */

export const routes: RouterRaw[] = [
  {
    title: "",
    path: "/",
    layout: BlankLayout,
    children: [
      {
        title: "login",
        path: "",
        component: () => import("@/pages/auth/Login"),
      },
    ],
  },
  {
    title: "pages",
    path: "/pages",
    layout: SidebarLayout,
    children: [
      {
        title: "home",
        path: "",
        component: () => import("@/pages/Index"),
      },
      {
        title: "clientes",
        path: "clientes",
        component: () => import("@/pages/Clientes"),
  },
      {
        title: "projetos",
        path: "projects",
        component: () => import("@/pages/Projects")
  },
      {
        title: "fluxo-de-caixa",
        path: "fluxo-de-caixa",
        component: () => import("@/pages/FluxoDeCaixa"),
 },
      {
        title: "nova-transacao",
        path: "nova-transacao",
        component: () => import("@/pages/NovaTransacao"),
 },
      {
        title: "nova-comissao",
        path: "nova-comissao",
        component: () => import("@/pages/NovaComissao"),
},
      {
        title: "exclusao-comissao",
        path: "exclusao-comissao",
        component: () => import("@/pages/ExclusaoComissao"),
},
      {
        title: "comissoes",
        path: "comissoes",
        component: () => import("@/pages/Comissoes"),
}



    ],
  },
];
