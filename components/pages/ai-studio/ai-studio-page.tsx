import { Header } from "@/components/header";
import PlaygroundPage from "@/components/pages/playground/playground-page";

export default function AiStudioPage() {
    return (
        <div className="flex flex-col h-full">
            <Header title="Bem-vindo ao AI Studio!" />
            <div className="flex-1 overflow-hidden">
                <PlaygroundPage />
            </div>
        </div>
    );
}

