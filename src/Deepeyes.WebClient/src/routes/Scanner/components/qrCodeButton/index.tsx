
import { Box, Button, Modal } from "@mui/material"
import { useState } from "react"
import QRCode from "qrcode.react"
import QrCode2Icon from '@mui/icons-material/QrCode2';


export default function QRCodeButton() {
    const [open, setOpen] = useState(false)


    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
            <Button onClick={handleOpen} variant="contained" color="primary" sx={{ mt: 2 }}>
                <QrCode2Icon />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="qr-code-modal"
                aria-describedby="modal-with-qr-code"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "white",
                        border: "2px solid #000",
                        p: 5,
                        outline: 0,
                        textAlign: "center",

                    }}
                >
                    <h2 id="qr-code-modal">Try it by yourself !</h2>
                    <QRCode value={window.location.href} size={256} />
                </Box>
            </Modal>
        </>
    )
}
