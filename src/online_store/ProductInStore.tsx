import { Stack, Typography } from "@mui/material";
import type React from "react";
import type { Product } from "../types";

interface ProductInStoreProps {
    productsinstore: Product[]
    selectedProductInStoreId: number | null
    onSelectedProductInStoreId: (id: number) => void
}

export const ProductInStore: React.FC<ProductInStoreProps> =
 ({productsinstore, selectedProductInStoreId, onSelectedProductInStoreId}) => {

  return (
      <Stack direction="column" spacing={1}>
                

      {productsinstore.map(product => (
        <Stack
          justifyContent="space-between" 
          key={product.id}
          direction="row"
          spacing={1}
          onClick={() => {
            onSelectedProductInStoreId(product.id);
          }}
          sx={{
              bgcolor: product.id === selectedProductInStoreId ? "rgba(243, 191, 191, 0.35)" : "transparent",
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