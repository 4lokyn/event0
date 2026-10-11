import { ToastQueue } from "@heroui/react";

export const toastQueue = new ToastQueue({maxVisibleToasts: 3})

export const showToast = ({ title, description, variant = 'default' }) => {
    toastQueue.add({
        description: description,
        title: title,
        variant,
    })
}
