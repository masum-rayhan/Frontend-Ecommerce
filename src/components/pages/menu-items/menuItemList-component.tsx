import { useEffect, useState } from "react";
import { MenuItemCard } from ".";
import { menuItemModel } from "../../../interfaces";

const MenuItemList = () => {
  const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);

  useEffect(() => {
    fetch("")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMenuItems(data.result);
      });
  }, []);

  return (
    <div className="container row">
      {menuItems.length > 0 &&
        menuItems.map((menuItem, index) => (
          <MenuItemCard key={index} menuItem={menuItem} />
        ))}
    </div>
  );
};

export default MenuItemList;
