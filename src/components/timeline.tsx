import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { School, Work, Event, EmojiEvents } from "@mui/icons-material";

interface TimelineEventProps {
  datetime: string;
  title: string;
  content: string;
  image?: string;
  type?: "conference" | "internship" | "exam" | "default";
}

interface TimelineComponentProps {
  events: TimelineEventProps[];
}

const getIconForType = (type: string) => {
  switch (type) {
    case "conference":
      return <EmojiEvents />;
    case "internship":
      return <Work />;
    case "exam":
      return <School />;
    default:
      return <Event />;
  }
};

const getColorForType = (type: string) => {
  switch (type) {
    case "conference":
      return "#e76f51"; // Warm coral/orange - complements green beautifully
    case "internship":
      return "#f4a261"; // Golden yellow - creates nice contrast with green
    case "exam":
      return "#2a9d8f"; // Teal green - harmonizes with your background
    default:
      return "#264653"; // Dark teal - matches your green theme
  }
};

const TimelineComponent: React.FC<TimelineComponentProps> = ({ events }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    // Mobile layout: vertical timeline on the left
    return (
      <Box sx={{ position: "relative", paddingLeft: "60px" }}>
        {/* Timeline line */}
        <Box
          sx={{
            position: "absolute",
            left: "28px",
            top: 0,
            bottom: 0,
            width: "3px",
            backgroundColor: "grey.300",
            zIndex: 0,
          }}
        />

        {events.map((event, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              marginBottom: "40px",
              position: "relative",
            }}
          >
            {/* Timeline dot */}
            <Avatar
              sx={{
                backgroundColor: getColorForType(event.type || "default"),
                position: "absolute",
                left: "-32px",
                transform: "translateX(-50%)",
                zIndex: 2,
                width: 56,
                height: 56,
                color: "white",
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
            >
              {getIconForType(event.type || "default")}
            </Avatar>

            {/* Content */}
            <Box sx={{ width: "100%" }}>
              {/* Date */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  marginBottom: 1,
                  fontWeight: "bold",
                }}
              >
                {event.datetime}
              </Typography>

              {/* Event Card */}
              <Card
                sx={{
                  boxShadow: 3,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {event.image && (
                  <CardMedia
                    component="img"
                    sx={{
                      height: 200,
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                    image={event.image}
                    alt={event.title}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.content}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  // Desktop layout: alternating timeline
  return (
    <Box sx={{ position: "relative", padding: "0 20px" }}>
      {/* Timeline line */}
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: "4px",
          backgroundColor: "grey.300",
          transform: "translateX(-50%)",
          zIndex: 0,
        }}
      />

      {events.map((event, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
            marginBottom: "60px",
            position: "relative",
          }}
        >
          {/* Timeline dot */}
          <Avatar
            sx={{
              backgroundColor: getColorForType(event.type || "default"),
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
              width: {
                md: 64,
                lg: 72,
                xl: 80,
              },
              height: {
                md: 64,
                lg: 72,
                xl: 80,
              },
              color: "white",
              "& .MuiSvgIcon-root": {
                fontSize: {
                  md: "2rem",
                  lg: "2.25rem",
                  xl: "2.5rem",
                },
                color: "white",
              },
            }}
          >
            {getIconForType(event.type || "default")}
          </Avatar>

          {/* Content */}
          <Box
            sx={{
              width: {
                md: "45%",
                lg: "48%",
                xl: "50%",
              },
              ...(index % 2 === 0
                ? { marginRight: "55%" }
                : { marginLeft: "55%" }),
            }}
          >
            {/* Date */}
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                textAlign: index % 2 === 0 ? "right" : "left",
                marginBottom: 2,
                fontWeight: "bold",
                fontSize: {
                  md: "1.25rem",
                  lg: "1.5rem",
                },
              }}
            >
              {event.datetime}
            </Typography>

            {/* Event Card */}
            <Card
              sx={{
                maxWidth: "100%",
                boxShadow: 4,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: 8,
                  transform: "translateY(-6px)",
                },
              }}
            >
              {event.image && (
                <CardMedia
                  component="img"
                  sx={{
                    height: {
                      md: 250,
                      lg: 300,
                      xl: 350,
                    },
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                  image={event.image}
                  alt={event.title}
                />
              )}
              <CardContent
                sx={{
                  padding: {
                    md: "20px",
                    lg: "24px",
                    xl: "28px",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    fontSize: {
                      md: "1.5rem",
                      lg: "1.75rem",
                      xl: "2rem",
                    },
                  }}
                >
                  {event.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontSize: {
                      md: "1.125rem",
                      lg: "1.25rem",
                    },
                    lineHeight: 1.6,
                  }}
                >
                  {event.content}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TimelineComponent;
