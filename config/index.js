import {
  LineChartOutlined,
  SettingOutlined,
  PlusOutlined,
  TagsOutlined,
  TagOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  DashboardOutlined,
  ApartmentOutlined,
  HomeOutlined
} from "@ant-design/icons";

const config = {
  dev: process.env.NODE_ENV !== "production",
  apiUrl: process.env.API_URL,
  cloudApiUrl: process.env.CLOUD_API_URL
};

const menuConfig = {
  menuItems: [
    {
      key: "0",
      parentKey: null,
      hideInMenu: false,
      title: "Home",
      path: "/",
      asPath: "",
      icon: <HomeOutlined />
    },
    {
      key: "1",
      parentKey: "sub0",
      hideInMenu: false,
      path: "/products",
      asPath: "/products",
      title: "Todos",
      icon: <TagsOutlined />
    },
    {
      key: "6",
      parentKey: "sub0",
      hideInMenu: true,
      path: "/products/new",
      asPath: "/products/new",
      title: "Nuevo producto",
      icon: <PlusOutlined />
    },
    {
      key: "2",
      parentKey: "sub0",
      path: "/categories",
      hideInMenu: false,
      asPath: "/categories",
      title: "Categorias",
      icon: <ApartmentOutlined />
    },
    {
      key: "3",
      parentKey: null,
      hideInMenu: false,
      path: "/orders",
      asPath: "/orders",
      title: "Pedidos",
      icon: <ShoppingCartOutlined />
    },
    {
      key: "4",
      parentKey: null,
      hideInMenu: false,
      path: "/users",
      asPath: "/users",
      title: "Usuarios",
      icon: <TeamOutlined />
    },
    {
      key: "5",
      path: "/sales",
      asPath: "/sales",
      parentKey: "sub1",
      title: "Ventas",
      icon: <LineChartOutlined />
    }
  ],
  subMenus: [
    {
      key: "sub0",
      title: "Productos",
      icon: <TagOutlined />
    },
    {
      key: "sub1",
      title: "Estadísticas",
      icon: <DashboardOutlined />
    }
  ]
};

export { config, menuConfig };
