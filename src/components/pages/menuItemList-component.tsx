import { useEffect, useState } from "react";
import { menuItemModel } from "../../interfaces";
import { MenuItemCard } from ".";

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

  return <div className="container row">
    {menuItems.length > 0 && menuItems.map((menuItem, index) => (
        <MenuItemCard key={index} menuItem={menuItem} />
    ))}
  </div>;
};

export default MenuItemList;
