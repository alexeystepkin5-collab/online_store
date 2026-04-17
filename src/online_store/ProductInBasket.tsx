import { Stack, Typography } from "@mui/material";
import type React from "react";
import type { Product } from "../types";

interface ProductInBasketProps {
    productsinbasket: Product[]
    selectedProductInBasketId: number | null
    onSelectedProductInBasketId: (id: number) => void
}

export const ProductInBasket: React.FC<ProductInBasketProps> =
 ({productsinbasket, selectedProductInBasketId, onSelectedProductInBasketId }) => {
 
  return (
      <Stack direction="column" spacing={1}>
      {productsinbasket.map(product => (
        <Stack
          justifyContent="space-between" 
          key={product.id}
          direction="row"
          spacing={1}
          onClick={() => {
            onSelectedProductInBasketId(product.id);
          }}
          sx={{
              bgcolor: product.id === selectedProductInBasketId ? "rgba(243, 191, 191, 0.35)" : "transparent",
              "&:hover": {
              bgcolor: "rgb(243, 194, 191)",
              cursor: "pointer"
            }
          }}
        >
          <Typography variant="h4">{product.title}</Typography>
          <Typography variant="subtitle1">{product.price}</Typography>
          <Typography variant="subtitle1">{product.quantity}</Typography>
        </Stack>
      ))}
    </Stack>
    )
}