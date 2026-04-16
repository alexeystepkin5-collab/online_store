/*
1. При открытии страницы сайта пользователь должен видеть ассортимент товаров, загруженных с сервера.
2. Каждый товар на странице должен иметь название, описание и цену за штуку.
3. У пользователя есть возможность добавить один или несколько товаров в корзину.
4. Пользователь может регулировать количество выбранного товара.
5. Пользователь видит на странице сайта итоговую стоимость товаров в корзине при выборе товара и изменении его количества.
6. При нажатии на кнопку «Оформить заказ» информация о купленных товарах и их количестве сохраняется на сервер и открывается диалоговое окно «Заказ оформлен».
7. Сервер должен быть мокирован MirageJS, взаимодействие с сервером должно осуществляться через React Query (TanStack Query).
*/
import type React from "react";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query"
import type { Product } from "../types";
import { addProductsInBasket, getProductsInBasket, getProductsInStore, type AddProductInBasketDto } from "../api/products"
import { Box, Button, Stack, Typography } from "@mui/material";
import { ProductInStore } from "./ProductInStore";
import { ProductInBasket } from "./ProductInBasket";
import { useState } from "react";
import { DialogAddInBasket } from "./DialogAddInBasket";


interface OnlineStoreProps {

}

export const OnlineStore: React.FC<OnlineStoreProps> = ({}) => {

const queryClient = useQueryClient();

const results = useQueries({
  queries: [
    { queryKey: ['productsinstore'], queryFn: getProductsInStore },
    //{ queryKey: ['productsinbasket'], queryFn: getProductsInBasket },
  ],
});


const productsinstore = results[0].data ?? [];
//const productsinbasket = results[1].data ?? [];
const isLoading = results.some(result => result.isLoading);

const createBasketMutation = useMutation<Product, Error, AddProductInBasketDto>({  //здесь происходит измениение спика продуктов в корзине и отправка на сервер
    mutationFn: addProductsInBasket,
    onSuccess: (addProductsInBasket) => {
        queryClient.setQueryData<Product[]>(['productsinbasket'], (current = []) => [...current, addProductsInBasket])
    },
})

const [productstobasket, setProductsToBasket] = useState <Product[]>([]);

const [selectedProductInStoreId, setSelectedProductInStoreId] = useState<number | null>(null);
const [selectedProductInBasketId, setSelectedProductInBasketId] = useState<number | null>(null);
const selectedProduct = productsinstore.find(Product => Product.id === selectedProductInStoreId)
const totalCost = productstobasket.reduce((sum, product) => sum + product.price * product.quantity, 0);

const [openDialog, setOpenDialog] = useState(false);

    return (
        <Stack direction="column" spacing={1} width="92vw"
            sx={{
                border: '3px solid #b11111', // Тип, толщина и цвет рамки
                borderRadius: '16px',      // Закругление углов (опционально)
                padding: '16px',          // Внутренний отступ
            }}
            >
            <Typography variant="h4" align="center">{"Добро пожаловать в простой интернет магазин!"}</Typography>
            {!isLoading && <Stack direction="row" spacing={1} width="90vw"
                sx={{
                    border: '3px solid #b11111', // Тип, толщина и цвет рамки
                    borderRadius: '16px',      // Закругление углов (опционально)
                    padding: '16px',          // Внутренний отступ
                }}>
                <Typography variant="h5">{"Стоимость корзины: "}</Typography>
                <Typography variant="h5">{totalCost}</Typography>
                 <Button
                    variant="outlined"
                    size="small"
                    onClick={() => console.log(JSON.stringify(productstobasket, null, 2))}
                >
                    Оформить заказ
                </Button>
            </Stack>}
            <Stack direction="row" spacing={1} width="90vw"
                sx={{
                    border: '3px solid #b11111', // Тип, толщина и цвет рамки
                    borderRadius: '16px',      // Закругление углов (опционально)
                    padding: '16px',          // Внутренний отступ
                }}
                >

                <DialogAddInBasket
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    addproduct={selectedProduct!}
                    // onAdd={(newProduct) => {
                    //     createBasketMutation.mutateAsync({...newProduct})
                    //     //console.log(JSON.stringify(newProduct, null, 2));
                    // }}
                    // onAdd={(newProduct) => {
                    //         setProductsToBasket([...productstobasket, newProduct])
                    // }}
                    onAdd={(newProduct) => {
                        
                        if (
                        !productstobasket.some(newProduct => newProduct.id === selectedProductInStoreId)) {
                            //console.log('В магазине выбран ', JSON.stringify(selectedProduct, null, 2));
                            //console.log('Новый продукт ', JSON.stringify(newProduct, null, 2));
                            setProductsToBasket([...productstobasket, newProduct]);

                        } else {
                            //console.log('товар уже добавлен', selectedProductInStoreId); // эта часть — «иначе»
                            setProductsToBasket(prev => 
                                prev.map(Product => Product.id === selectedProductInStoreId ? { ...newProduct } : Product)
                            )
                            
                        }

                    }}
                />

                <Box width="50%">
                    <Stack 
                        direction="column"
                        spacing={1} 
                        width="43vw"
                        sx={{
                            border: '3px solid #b11111', // Тип, толщина и цвет рамки
                            borderRadius: '16px',      // Закругление углов (опционально)
                            padding: '16px',          // Внутренний отступ
                        }}
                        onClick={() => setOpenDialog(true)}
                        >
                        {!isLoading && <Typography variant="h5">{"Ассортимент товаров"}</Typography>}
                        {isLoading && <Typography>Загрузка...</Typography>}
                        {!isLoading &&<ProductInStore 
                            productsinstore={productsinstore}
                            onProductsInStore={()=>('')}
                            selectedProductInStoreId={selectedProductInStoreId}
                            onSelectedProductInStoreId={(id) => setSelectedProductInStoreId(id)}
                        />}
                    </Stack>
                </Box>
                <Box width="50%">
                    <Stack 
                        direction="column"
                        spacing={1}
                        width="43vw"
                        sx={{
                            border: '3px solid #b11111', // Тип, толщина и цвет рамки
                            borderRadius: '16px',      // Закругление углов (опционально)
                            padding: '16px',          // Внутренний отступ
                        }}
                    >
                        {!isLoading &&<Typography variant="h5">{"Моя корзина"}</Typography>}
                        {isLoading && <Typography>Загрузка...</Typography>}
                        {!isLoading &&<ProductInBasket
                            productsinbasket={productstobasket}
                            onProductsInBasket={()=>('')}//{(addProduct) => createBasketMutation.mutateAsync({...addProduct})}
                            selectedProductInBasketId={selectedProductInBasketId}
                            onSelectedProductInBasketId={(id)=>setSelectedProductInBasketId(id)}
                        />}
                    </Stack>
                </Box>
            </Stack>
        </Stack>
    )
}

