import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
} from '@mui/material';

import type { Product } from '../types';


interface DialogAddInBasketProps {
  open: boolean;
  onClose: () => void;
  addproduct: Product;
  onAdd:  (addproduct: Product) => void;
}

export const DialogAddInBasket: React.FC<DialogAddInBasketProps> = ({
    open,
    onClose,
    addproduct,
    onAdd
}) => {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [maxquantity, setMaxQuantity] = useState(0);

  
  const handleOpenDialog = () => {
    setId(addproduct.id);
    setTitle(addproduct.title);
    setDescription(addproduct.description);
    setPrice(addproduct.price);
    setQuantity(quantity);
    setMaxQuantity(addproduct.quantity);
  };

  const handleSubmit = () => {
    if (!quantity) {
      return;
    }
    
    onAdd({
      id: id,
      title: title,
      description: description,
      price: price,
      quantity: quantity 
    });
      
    handleClose();
  };

  const handleClose = () => {
    setId(0);
    setTitle('');
    setDescription('');
    setPrice(0);
    setQuantity(0);
    onClose();
  };

  return (
    
    <Dialog 
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        transition: { onEntered: () => {
        handleOpenDialog()
        }}
      }}
      >
      <DialogTitle>Добавить товар в корзину?</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="h6">{description}</Typography>
          <Typography variant="h6">Цена за единицу: {price}</Typography>
          <Typography variant="h6">В наличии: {maxquantity-quantity}</Typography>

          <TextField
            type="number"
            defaultValue={quantity}
            slotProps={{ 
              htmlInput: { 
                min: 0,
                max: maxquantity,
                step: "1" 
              }
            }} 
            label="Количество"

            onChange={(e) => setQuantity(Number(e.target.value))}
            fullWidth
            required
            autoFocus
          />
          <Typography variant="h6">Стоимость: {price*quantity}</Typography>

        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!quantity}
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
