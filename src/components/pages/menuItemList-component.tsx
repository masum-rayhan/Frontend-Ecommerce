import { useEffect, useState } from "react";
import { menuItemModel } from "../../interfaces";

const MenuItemList = () => {
  const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);

  useEffect(() => {
    fetch("https://foodfancywebapi.azurewebsites.net/menuItem")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMenuItems(data.result);
      });
  }, []);

  return <div>menuItemList-component</div>;
};

export default MenuItemList;
