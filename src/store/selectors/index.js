const BASE_BURGER_PRICE = 4;

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export const getPrice = ingredients =>
  Object.entries(ingredients || {}).reduce(
    (acc, [ingredient, quantity]) =>
      acc + (INGREDIENT_PRICES[ingredient] * quantity),
    BASE_BURGER_PRICE,
  );
