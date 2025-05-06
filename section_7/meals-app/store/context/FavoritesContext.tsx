import { createContext, ReactNode, useContext, useState } from "react";

interface FavoritesContextType {
  ids: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType>(
  {} as FavoritesContextType
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteMealIds, setFavoriteMealIds] = useState<string[]>([]);

  const addFavorite = (id: string) => {
    setFavoriteMealIds((prevFavoriteMealIds) => prevFavoriteMealIds.concat(id));
  };

  const removeFavorite = (id: string) => {
    setFavoriteMealIds((prevFavoriteMealIds) =>
      prevFavoriteMealIds.filter((mealId) => mealId !== id)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ ids: favoriteMealIds, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => useContext(FavoritesContext);
