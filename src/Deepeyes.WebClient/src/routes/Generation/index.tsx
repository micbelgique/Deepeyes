import { Alert, AlertColor, Button, CircularProgress, Container, Snackbar, TextField, Typography } from "@mui/material"
import { useCallback, useState } from "react"
import { generateImage } from "./services/generateImage";
import { uploadImage } from "../Scanner/services/blobStorage";
import { saveGeneratedImage } from "./services/uploadGeneratedImage";
import Generation from "./Composant/Generation";
import Footer from "../Scanner/components/footer";

export default function GenerationHome() {



    return (
        <>
            <Generation />
            <Footer />
        </>
    );
}