import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { AlertTriangle } from "lucide-react";
  
  const DeleteConfirmDialog = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    description, 
    isLoading 
  }) => {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center text-red-500 pb-3">
              <AlertTriangle className="h-5 w-5" />
              {title || "Confirm Deletion"}
            </DialogTitle>
            <DialogDescription className="leading-relaxed text-gray-800">
              {description || "This action cannot be undone. Are you sure you want to delete this item?"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default DeleteConfirmDialog;