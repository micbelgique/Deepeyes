import { Box, Link } from "@mui/material"

export default function Footer() {
  return (
    <footer className="footer">
      <Box
        sx={{
          mt: "2rem",
          mb: 0.4,
          color: (theme) => {
            return theme.palette.grey[600]
          },
        }}
      >
        Made by{" "}
        <Link href="https://github.com/micbelgique/Deepeyes" underline="hover">
          MIC Belgique
        </Link>
        .
      </Box>
    </footer>
  )
}
