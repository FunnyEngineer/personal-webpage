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
import EventCard from "@/components/eventCard";

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
          maxWidth="lg"
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
                  I am a PhD student at the University of Texas at Austin where
                  I study machine learning, sustainable system, and climate
                  change. My advisors are{" "}
                  <CustomLink href="https://niyogi.dev/">
                    {" "}
                    Dr. Dev Niyogi
                  </CustomLink>{" "}
                  and{" "}
                  <CustomLink href="https://www.ie-lab.org/">
                    Dr. Zoltan Nagy
                  </CustomLink>
                  . My research interests include machine learning on urban
                  energy systems and geospatial data. I am passionate to code
                  and explore the real world data distribution.
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
          {/* some activity */}
          <Typography variant="h2" component="h2" align='center' style={{marginTop: "2rem"}}>
            Recent Activities
          </Typography>
          <Grid2 container spacing={2} style={{marginTop: "2rem"}}>
            <Grid2 xs={12} md={6}>
              <EventCard
                datetime="December 2023"
                title="NeurIPS 2023"
                content="Present a poster at the Climate Change AI Workshop about CityTFT, a transformer model for urban building energy modeling. My first in-person AI conference and having a great time at New Orleans."
                image="/events/NeurIPS2023/header.jpeg"
              />
            </Grid2>
            <Grid2 xs={12} md={6}>
              <EventCard
                datetime="July 2024"
                title="i3ce 2024"
                content="Attended i3ce conference (my first in-person civil conference) and reunited with friends that motivated me to pursue a PhD"
                image="\events\i3ce2024\header.jpg"
              />
            </Grid2>
            <Grid2 xs={12} md={6}>
              <EventCard
                datetime="May - Aug. 2024"
                title="Fujitsu Internship"
                content="My second internship during the PhD study. Spending three months to work on Precipitation downscaling using diffusion model. First time feeling the possibility to get into the industrial lab."
                image="\events\fujitsu2024\header.jpg"
              />
            </Grid2>
            <Grid2 xs={12} md={6}>
              <EventCard
                datetime="October 2024"
                title="Comprehensive Exam"
                content="Just finish the meeting with my phd committee. The topic will be around building energy modeling, and they are making sure I won't do anything crazy before I defend my PhD. Supre excited about the coming work. Let's get it done."
                image="\events\compre2024\header.png"
              />
            </Grid2>
          </Grid2>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default HomePage;
