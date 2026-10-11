import AuthProvider from "@/providers/authProvider";
import ToastProvider from "@/providers/toastProvider";
import NavigationProvider from "@/providers/routerProvider";

export default function Providers({ children }) {
    return(
        <AuthProvider>
            <NavigationProvider>
                <ToastProvider/>
                {children}
            </NavigationProvider>
        </AuthProvider>
    )
}
