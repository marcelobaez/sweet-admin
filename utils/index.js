import { Menu } from "antd";
import Link from "next/link";

const { SubMenu } = Menu;

const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const getUrlWithTransforms = publicId => {
  return `https://res.cloudinary.com/dbvfkfj4d/image/upload/c_scale,w_150/v1570726181/${publicId}`;
};

const combine = arg => {
  var r = [],
    max = arg.length - 1;
  function helper(arr, i) {
    for (var j = 0, l = arg[i].length; j < l; j++) {
      var a = arr.slice(0); // clone arr
      a.push(arg[i][j]);
      if (i == max) r.push(a);
      else helper(a, i + 1);
    }
  }
  helper([], 0);
  return r;
};

const tagColors = ["geekblue", "blue", "cyan"];

const subMenus = menuConfig => {
  return menuConfig.subMenus.map(submenu => {
    return (
      <SubMenu
        key={submenu.key}
        title={
          <span>
            {submenu.icon}
            <span>{submenu.title}</span>
          </span>
        }
      >
        {menuConfig.menuItems.map(item => {
          if (item.parentKey === submenu.key && !item.hideInMenu) {
            return (
              <Menu.Item key={item.key}>
                <Link href={item.path}>
                  <a>
                    {item.icon}
                    <span>{item.title}</span>
                  </a>
                </Link>
              </Menu.Item>
            );
          }
        })}
      </SubMenu>
    );
  });
};

const menuItems = items => {
  return items.map(item => {
    if (!item.parentKey && !item.hideInMenu && item.key !== "0") {
      return (
        <Menu.Item key={item.key}>
          <Link href={item.path}>
            <a>
              {item.icon}
              <span>{item.title}</span>
            </a>
          </Link>
        </Menu.Item>
      );
    }
  });
};

const firstMenuItem = menuItems => {
  const firstItem = menuItems.find(item => item.key === "0");

  return (
    <Menu.Item key={firstItem.key}>
      <Link href={firstItem.path}>
        <a>
          {firstItem.icon}
          <span>{firstItem.title}</span>
        </a>
      </Link>
    </Menu.Item>
  );
};

const createMenu = menuConfig => {
  const menu = [];

  menu.push(
    firstMenuItem(menuConfig.menuItems),
    subMenus(menuConfig),
    menuItems(menuConfig.menuItems)
  );
  return menu;
};

export { getBase64, getUrlWithTransforms, combine, tagColors, createMenu };
