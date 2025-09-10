// pages/index.tsx
"use client";
import { useState } from "react";
import Header from "@/components/header";
import { createLightTheme, createDarkTheme } from "@/theme";
import { Box, Container, Link, ThemeProvider, Typography } from "@mui/material";
import Image from "next/image";
import CustomLink from "@/components/customLink";
import { GitHub, LinkedIn, School } from "@mui/icons-material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TimelineComponent from "@/components/timeline";

const HomePage: React.FC = () => {
  const [theme, setTheme] = useState<string>("dark");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    console.log("Theme changed to", newTheme);
  };

  let currentTheme = theme === "light" ? createLightTheme() : createDarkTheme();

  const styleImage = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <div className={`min-h-screen`}>
        <Container
          className="py-20 flex flex-col items-center justify-center"
          maxWidth={false}
          sx={{
            maxWidth: {
              xs: "100%",
              sm: "100%",
              md: "1200px",
              lg: "1400px",
              xl: "1600px",
            },
            padding: {
              xs: "80px 16px",
              sm: "80px 24px",
              md: "80px 32px",
              lg: "80px 40px",
            },
          }}
        >
          <Header toggleTheme={toggleTheme} />

          {/* main intro */}
          <Grid2 container spacing={2}>
            <Grid2 xs={12} md={4} lg={4} justifyContent="center">
              <div style={styleImage}>
                <Image
                  src="/profile.jpeg"
                  alt="Profile Picture"
                  width={400}
                  height={400}
                  className="rounded"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </div>
            </Grid2>
            <Grid2 xs={12} md={8} lg={8}>
              <div className="flex-grow ml-8">
                <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
                  Ting-Yu Dai
                </Typography>
                <Box sx={{ height: "32px" }} />{" "}
                {/* Add space between the two Typography components */}
                <Typography variant="h5" gutterBottom>
                  <em>Eat well, Sleep well, Think well, and Research.</em>
                </Typography>
                <Typography variant="body1">
                  I am a PhD student at the University of Texas at Austin, where
                  I study machine learning, sustainable systems, and climate
                  change. My advisors are{" "}
                  <CustomLink href="https://niyogi.dev/">
                    {" "}
                    Dr. Dev Niyogi
                  </CustomLink>{" "}
                  and{" "}
                  <CustomLink href="https://www.ie-lab.org/">
                    Dr. Zoltan Nagy
                  </CustomLink>
                  . My research interests include applying machine learning to
                  urban energy systems and geospatial data analysis. I am
                  passionate about coding and exploring real-world data
                  distributions.
                </Typography>
              </div>
            </Grid2>
          </Grid2>

          <div className="flex mt-8" style={{ justifyContent: "center" }}>
            <Link href="https://www.linkedin.com/in/ting-yu-dai-1abb1a1a1/">
              <LinkedIn fontSize="large" color="inherit" />
            </Link>
            <Link href="https://github.com/funnyengineer">
              <GitHub fontSize="large" />
            </Link>
            <Link href="https://scholar.google.com/citations?user=syId_AQAAAAJ">
              <School fontSize="large" />
            </Link>
          </div>
          {/* Timeline of activities */}
          <Typography
            variant="h2"
            component="h2"
            align="center"
            style={{ marginTop: "2rem" }}
          >
            Recent Activities
          </Typography>
          <Box
            style={{ marginTop: "2rem" }}
            sx={{
              width: "100%",
              maxWidth: {
                xs: "100%",
                sm: "100%",
                md: "1200px",
                lg: "1400px",
                xl: "1600px",
              },
              margin: "2rem auto 0",
              padding: {
                xs: "0",
                md: "0 24px",
                lg: "0 32px",
              },
            }}
          >
            <TimelineComponent
              events={[
                {
                  datetime: "February 2025",
                  title: "AAAI 2025",
                  content:
                    "Attended AAAI 2025 conference to present my internship work on precipitation downscaling using diffusion models. I was in the social impact track and saw some friends that I met at NeurIPS 2023.The community is so small that people often cross paths in different conferences. This is my first time that a work actually gets accepted to a top AI conference in the track with proceedings. Feel so good to be recognized.",
                  image: "/events/aaai25/header.jpeg",
                  type: "conference",
                },
                {
                  datetime: "October 2024",
                  title: "Comprehensive Exam",
                  content:
                    "Successfully completed my PhD comprehensive exam with my committee. My research will focus on building energy modeling, and I'm excited about the upcoming work ahead. The committee ensured I have a solid foundation before defending my PhD dissertation.",
                  image: "/events/compre2024/header.png",
                  type: "exam",
                },
                {
                  datetime: "May - Aug. 2024",
                  title: "Fujitsu Internship",
                  content:
                    "Completed my second internship during PhD studies, spending three months working on precipitation downscaling using diffusion models. This experience opened my eyes to the possibilities of working in an industrial research lab.",
                  image: "/events/fujitsu2024/header.jpg",
                  type: "internship",
                },
                {
                  datetime: "July 2024",
                  title: "i3ce 2024",
                  content:
                    "Attended the i3ce conference (my first in-person civil engineering conference) and reunited with friends who motivated me to pursue a PhD.",
                  image: "/events/i3ce2024/header.jpg",
                  type: "conference",
                },
                {
                  datetime: "December 2023",
                  title: "NeurIPS 2023",
                  content:
                    "Presented a poster at the Climate Change AI Workshop about CityTFT, a transformer model for urban building energy modeling. This was my first in-person AI conference, and I had a wonderful time in New Orleans.",
                  image: "/events/NeurIPS2023/header.jpeg",
                  type: "conference",
                },
              ]}
            />
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default HomePage;
