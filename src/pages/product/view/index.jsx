import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, TextField, Grid, IconButton, Divider, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartToast } from "./cartToast";
import { SelectableImage } from "./selectableImage";
import { QuantityModal } from "./quantityModal";
import { getAllProducts } from "../../../services/productCalls";
import { ProductsDetailViewer } from "./productDetailsViewer";

export const View = () => {
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [showQunatityModal, setShowQuantityModal] = useState(false);
  const [isCartToastOpen, setIsCartToastOpen] = useState(false);
  useEffect(() => {
    getAllProducts((err, response) => {
      if(err) {
        // Need to handle error
      }
      else {
        setData(response);
        setIsLoading(false);
      }
    });
  }, []);

  const handleOnChange = (item, isChecked) => {
    if(isChecked) {
      const obj = {item, quantity: 0};
      setCartItems(prevItems => [...prevItems, obj]);
      setShowQuantityModal(true);
      setIsCartToastOpen(true);
    }
    else {
      setCartItems(prevItems => prevItems.filter(currentItem => currentItem.item.id !== item.id));
    }
  };

  const onSubmitQuantity = (quantity) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      const indexToUpdate = cartItems.length - 1;
      if (indexToUpdate !== -1) {
        updatedItems[indexToUpdate].quantity = quantity;
      }
      return updatedItems;
    });
    setShowQuantityModal(false);
  };

  const parseData = useCallback(colorTones => {
    let colors = colorTones.map(item => item.color);
    colors = [...new Set(colors)];
    const colorInputFields = Array.from({ length: colors.length }, (_, index) => (
            <Grid item key={index} xs={2}>
              <TextField disabled value={colors[index]} />
            </Grid>
            ));
    const tones = [...new Set(colorTones.map(item => item.tone))];
    const shades = [];
    for(let i = 0; i < tones.length; i++) {
      shades.push(colorTones.filter(item => item.tone === tones[i]));
    }
    const toneRows = tones.map((tone, rowIndex) => (
      <Grid container item key={rowIndex} xs={12} spacing={2}>
        <Grid item xs={2}>
          <IconButton disabled aria-label="delete" color="error">
            <DeleteIcon />
          </IconButton>
          <TextField
            name={`color${rowIndex + 1}`}
            label={`Tone Color ${rowIndex + 1}`}
            value={tone}
            disabled
          />
        </Grid>
        {
          shades[rowIndex].map(({ shade }, index) => {
            const mimeType = "image/jpeg";
            const data = shade.data.toString("base64");
            const dataUrl = `data:${mimeType};base64,${data}`;
            return <Grid item key={`img-${index}-${rowIndex}`} xs={2}>
              <SelectableImage src={dataUrl} alt={`img-${index}`} onChange={isChecked => handleOnChange(shades[rowIndex][index], isChecked)}/>
            </Grid>
          })
        }
      </Grid>
    ));
    return { colorInputFields, toneRows };
  }, []);

  const productsWrapper = useMemo(() => (
    data.map((product, index) => {
      const { colorInputFields, toneRows } = parseData(product.colorTones);
      return <Box key={`${product.title}-${index}`} >
        <StyledProductsWrapper container spacing={2}>
          <Box>
            <ProductsDetailViewer title={product.title} description={product.description}/>
          </Box>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={2} />
            {colorInputFields}
          </Grid>
          {toneRows}
        </StyledProductsWrapper>
        <StyledDivider/>
      </Box>
    }
    )
  ), [data, parseData])
  if(loading) return (<StyledLoadingWrapper> <CircularProgress /> </StyledLoadingWrapper>);
  return <Box>
      { showQunatityModal && <QuantityModal isOpen={showQunatityModal} onSubmitQuantity={onSubmitQuantity}/>}
      { isCartToastOpen && <CartToast cartItems={cartItems} isOpen={isCartToastOpen}/>}
      { productsWrapper }
    </Box>;
};

const StyledProductsWrapper = styled(Grid)({
  marginTop: "20px",
});

const StyledDivider = styled(Divider)({
  marginTop: "20px",
});

const StyledLoadingWrapper = styled(Box)({
  display: "flex",
});
