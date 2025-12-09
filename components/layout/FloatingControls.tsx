import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import BackToTop from "@/components/ui/BackToTop";

export default function FloatingControls() {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4">
            <ThemeSwitcher />
            <BackToTop />
        </div>
    );
}