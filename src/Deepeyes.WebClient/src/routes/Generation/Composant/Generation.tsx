import { Alert, AlertColor, Button, CircularProgress, Container, Snackbar, TextField, Typography } from "@mui/material"
import { useCallback, useState } from "react"
import { generateImage } from "../services/generateImage";
import { saveGeneratedImage } from "../services/uploadGeneratedImage";
import BackupIcon from '@mui/icons-material/Backup';
import SendIcon from '@mui/icons-material/Send';


export default function Generation() {
    const [imageUri, setImageUri] = useState<string>("");
    const [prompt, setPrompt] = useState("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [open, setOpen] = useState(false)
    const [snackbarText, setSnackbarText] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success")

    const handleClickGenerateBtn = useCallback(async () => {

        if (prompt === "") {
            setError("Please enter a correct prompt.")
            return;
        }

        try {
            setIsLoading(true)
            const uri = await generateImage(prompt);
            console.log("uri : " + uri);
            if (uri !== "" && uri !== undefined) setImageUri(uri);
            setIsLoading(false)
        } catch (e) {
            setError((e as Error).message)
            console.log(e);
            setIsLoading(false)
        }
    }, [prompt])

    const sendImage = useCallback(async () => {
        try {

            await saveGeneratedImage(imageUri)
            setSnackbarText("Image uploaded")
            setSnackbarSeverity("success")
            setOpen(true)
        } catch (error) {
            setSnackbarText("Error uploading image")
            setSnackbarSeverity("error")
            setOpen(true)
            console.error(error)
        }
    }, [imageUri])


    return (
        <Container sx={{ textAlign: "center", display: "flex", flexDirection: "column", minHeight: "80vh", justifyContent: "space-between" }}>
            <div>
                <Typography variant="h2" sx={{ color: "black", textAlign: "center" }}>
                    Generation
                </Typography>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Multiline"
                    multiline
                    maxRows={4}
                    onChange={(e) => setPrompt(e.target.value)}
                    sx={{ mt: 2, width: "45%" }}
                />
            </div>
            <div style={{padding: "2%"}}>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    imageUri && <img src={imageUri} alt="Generated" />
                )}
            </div>


            <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
                <Button onClick={handleClickGenerateBtn} variant="contained" color="primary" sx={{ mr: 1 }}>
                    <SendIcon/>
                </Button>
                <Button onClick={sendImage} variant="contained" color="primary" disabled={imageUri === ""}>
                    <BackupIcon/>
                </Button>
            </Container>


            {error !== "" && <Typography color="error">{error}</Typography>}

            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={() => setOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
                    {snackbarText}
                </Alert>
            </Snackbar>
        </Container>
    );
}