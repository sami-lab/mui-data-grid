import { Dialog, DialogContent } from "@mui/material";
import React from "react";
import AgentEndpoints from "./AgentEndpoints";
export default function AgentEndpointsDialog({ open, onClose, row }) {
  return (
    <Dialog fullWidth maxWidth='lg' open={open} onClose={onClose}>
      <DialogContent>
        <AgentEndpoints />
      </DialogContent>
    </Dialog>
  );
}
