import { Alert, AlertColor, Button, CircularProgress, Snackbar, TextField } from "@mui/material"
import { useCallback, useState } from "react"
import { generateImage } from "./services/generateImage";
import { uploadImage } from "../Scanner/services/blobStorage";
import { saveGeneratedImage } from "./services/uploadGeneratedImage";

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
        <div className="content Container">
            <h1 style={{ margin: "0.2em 0" }}>Deep Eyes Project</h1>
            {imageUri &&
                <img src={imageUri}></img>
            }
            {isLoading && <CircularProgress />}

            <TextField
                id="outlined-multiline-flexible"
                label="Multiline"
                multiline
                maxRows={4}
                onChange={(e) => setPrompt(e.target.value)}
            />

            <Button onClick={handleClickGenerateBtn}>
                Generate an image
            </Button>

            <Button onClick={sendImage} disabled={imageUri ===""}>
                upload image
            </Button>



            {error !== "" && <p>{error}</p>}

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
        </div>
    );
}