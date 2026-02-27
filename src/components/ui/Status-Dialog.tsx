"use client";

import { useState } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "./alert-dialog";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "./select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateUserStatus } from "@/actions/users.actions";

export default function StatusDialog({
    user,
    open,
    onClose,
}: any) {
    const [status, setStatus] = useState(user.status);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        const toastId = toast.loading("Updating...")
        try {
            setLoading(true);
            const res = await updateUserStatus(status, user.id);
            if (res.error) {
                toast.error(res.error.message, { id: toastId })
                return;
            }
            toast.success(res.data?.message || "Status Updated Successfully", { id: toastId });
            onClose();
        } catch (error) {
            toast.error("Something Went Wrong!", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Update User Status
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        You are updating the account status for{" "}
                        <strong>{user.name}</strong>.
                        <br />
                        Changing status may restrict user access.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="my-4">
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                            <SelectItem value="BANNED">BANNED</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={loading || status === user.status}
                        onClick={handleUpdate}
                        className={
                            status === "BANNED"
                                ? "bg-destructive hover:bg-destructive/90"
                                : ""
                        }
                    >
                        {loading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}