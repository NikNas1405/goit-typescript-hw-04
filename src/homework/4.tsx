import React, { createContext, useMemo, useState, useContext } from "react";
import noop from "lodash/noop";

type MenuIds = "first" | "second" | "last";
type Menu = { id: MenuIds; title: string };

//1 Описати тип SelectedMenu: Це має бути об'єкт, який містить id з типом MenuIds
type SelectedMenu = {
  id: MenuIds;
};

// Додати тип Menu Selected //+
//2 Описати тип MenuSelected: Цей тип є об'єктом, що містить selectedMenu
type MenuSelected = {
  selectedMenu: SelectedMenu;
};

const MenuSelectedContext = createContext<MenuSelected>({
  selectedMenu: { id: "second" },
});

// Додайте тип MenuAction //+
//3 Описати тип MenuAction: Цей тип являє собою об'єкт з методом onSelectedMenu, який приймає об'єкт типу SelectedMenu як аргумент повертає void.
type MenuAction = {
  onSelectedMenu: (arg0: SelectedMenu) => void;
};

const MenuActionContext = createContext<MenuAction>({
  onSelectedMenu: noop,
});

//4 Описати тип PropsProvider: Опишіть правильний тип для дітей
type PropsProvider = {
  children: React.ReactNode; // Додати тип для children //+
};

function MenuProvider({ children }: PropsProvider) {
  // Додати тип для SelectedMenu він повинен містити { id }
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>({
    id: "second", //+
  });

  const menuContextAction = useMemo(
    () => ({
      onSelectedMenu: setSelectedMenu,
    }),
    []
  );

  const menuContextSelected = useMemo(
    () => ({
      selectedMenu,
    }),
    [selectedMenu]
  );

  return (
    <MenuActionContext.Provider value={menuContextAction}>
      <MenuSelectedContext.Provider value={menuContextSelected}>
        {children}
      </MenuSelectedContext.Provider>
    </MenuActionContext.Provider>
  );
}

//5 Описати тип PropsMenu: Опишіть тип для menus, він має бути від типу Menu
type PropsMenu = {
  menus: Menu[]; // Додайте вірний тип для меню  //+
};

function MenuComponent({ menus }: PropsMenu) {
  const { onSelectedMenu } = useContext(MenuActionContext);
  const { selectedMenu } = useContext(MenuSelectedContext);

  return (
    <>
      {menus.map((menu) => (
        <div key={menu.id} onClick={() => onSelectedMenu({ id: menu.id })}>
          {menu.title}{" "}
          {selectedMenu.id === menu.id ? "Selected" : "Not selected"}
        </div>
      ))}
    </>
  );
}

export function ComponentApp() {
  const menus: Menu[] = [
    {
      id: "first",
      title: "first",
    },
    {
      id: "second",
      title: "second",
    },
    {
      id: "last",
      title: "last",
    },
  ];

  return (
    <MenuProvider>
      <MenuComponent menus={menus} />
    </MenuProvider>
  );
}
