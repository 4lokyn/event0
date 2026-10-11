'use client'

import { Toast } from "@heroui/react";
import { toastQueue } from "@/utils/toast";

export default function ToastProvider() {
    return <Toast.Provider placement="bottom" queue={toastQueue} />;
}
