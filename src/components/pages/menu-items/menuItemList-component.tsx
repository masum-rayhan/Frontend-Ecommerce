import { useEffect } from "react";
import { MenuItemCard } from ".";
import { menuItemModel } from "../../../interfaces";
import { useGetMenuItemsQuery } from "../../../apis/menuItem-api";
import { useDispatch } from "react-redux";
import { setMenuItem } from "../../../storage/redux/menuItem-slice";
import { MainLoader } from "../common";

const MenuItemList = () => {
  //const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);

  const { data, isLoading } = useGetMenuItemsQuery(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result));
    }
  }, [isLoading]);

  if (isLoading) return <MainLoader />;

  return (
    <div className="container row">
      {data.result.length > 0 &&
        data.result.map((menuItem: menuItemModel, index: number) => (
          <MenuItemCard key={index} menuItem={menuItem} />
        ))}
    </div>
  );
};

export default MenuItemList;
