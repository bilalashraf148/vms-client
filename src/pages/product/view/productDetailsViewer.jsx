import { Card, CardContent, Typography, CardActionArea, styled } from "@mui/material";

export const ProductsDetailViewer = ({ title, description }) => {
  return (
    <StyledCardWrapper>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Title: {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCardWrapper>
  );
};

const StyledCardWrapper = styled(Card)({
  marginLeft: "20px",
  maxWidth: 345,
});
