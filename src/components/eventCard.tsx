import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

interface EventCardProps {
  datetime: string;
  title: string;
  content: string;
  image?: string;
}
const EventCard: React.FC<EventCardProps> = ({
  datetime,
  title,
  content,
  image,
}) => {
  return (
    <Card>
      {image && (
        <CardMedia component="img" sx={{
          height: 300,
          // width: 120,
          objectFit: 'contain',
          objectPosition: 'center'
        }} image={image} alt={title} />
      )}
      <CardContent>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ fontStyle: "italic" }}>
            {datetime}
          </Typography>
        </Box>
        <Typography variant="body1">{content}</Typography>
      </CardContent>
    </Card>
  );
};

export default EventCard;
