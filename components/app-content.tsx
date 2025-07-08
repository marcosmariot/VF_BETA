import { Sidebar, TabValue } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav"
import { Suspense, useState } from "react"
import AiStudioPage from "@/components/pages/ai-studio/ai-studio-page";
import GalleryPage from "@/components/pages/gallery/gallery-page";
import FilesPage from "@/components/pages/files/files-page";
import GettingStartedPage from "@/components/pages/getting-started/getting-started-page";
import PlansPage from "@/components/pages/plans/plans-page";
import ContactPage from "@/components/pages/contact/contact-page";
import ViewComfyPage from "@/components/pages/view-comfy/view-comfy-page";
import { ViewComfyProvider } from "@/app/providers/view-comfy-provider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DeployDialog } from "@/components/deploy/deploy-dialog";

export default function AppContent() {
    const [currentTab, setCurrentTab] = useState(TabValue.AiStudio);
    const [deployWindow, setDeployWindow] = useState<boolean>(false);

    return (
        <TooltipProvider>
            <ViewComfyProvider>
                <div className="flex flex-col h-screen w-full overflow-x-auto overflow-y-hidden">
                    <TopNav />
                    <div className="flex flex-1 overflow-x-auto overflow-y-hidden">
                        <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} deployWindow={deployWindow} onDeployWindow={setDeployWindow} />
                        <main className="flex-1 overflow-x-auto overflow-y-hidden">
                            {currentTab === TabValue.AiStudio && <Suspense><AiStudioPage /></Suspense>}
                            {currentTab === TabValue.Gallery && <Suspense><GalleryPage /></Suspense>}
                            {currentTab === TabValue.Files && <Suspense><FilesPage /></Suspense>}
                            {currentTab === TabValue.GettingStarted && <Suspense><GettingStartedPage /></Suspense>}
                            {currentTab === TabValue.Plans && <Suspense><PlansPage /></Suspense>}
                            {currentTab === TabValue.Contact && <Suspense><ContactPage /></Suspense>}
                        </main>
                    </div>
                </div>
                <DeployDialog open={deployWindow} setOpen={setDeployWindow} />
                <Toaster />
            </ViewComfyProvider>
        </TooltipProvider>
    );
}