import { SquareTerminal, LifeBuoy, FileJson, Cloud, Image, Folder, BookOpen, CreditCard, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TooltipButton } from "@/components/ui/tooltip-button"
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query"

export enum TabValue {
    AiStudio = 'ai_studio',
    Gallery = 'gallery',
    Files = 'files',
    GettingStarted = 'getting_started',
    Plans = 'plans',
    Contact = 'contact',
    WorkflowApi = 'workflow_api',
    Playground = 'playground'
}

interface SidebarProps {
    currentTab: TabValue;
    onTabChange: (tab: TabValue) => void;
    deployWindow: boolean;
    onDeployWindow: (deployWindow: boolean) => void;
}

const SidebarButton = ({ icon, label, isActive, onClick, isSmallScreen }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void, isSmallScreen: boolean }) => {
    if (isSmallScreen) {
        return (
            <TooltipButton
                icon={icon}
                label={label}
                tooltipContent={label}
                className={isActive ? 'bg-muted' : ''}
                onClick={onClick}
            />
        )
    }
    return (
        <Button
            variant={isActive ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={onClick}
        >
            {icon}
            <span className="ml-2">{label}</span>
        </Button>
    )
}

export function Sidebar({ currentTab, onTabChange, deployWindow, onDeployWindow }: SidebarProps) {
    const viewMode = process.env.NEXT_PUBLIC_VIEW_MODE === "true";
    const isSmallScreen = useMediaQuery("(max-width: 1024px)");

    return (
        <aside className={`flex flex-col h-full overflow-y-auto border-r bg-background transition-all duration-300 ${isSmallScreen ? 'w-12' : 'w-48'}`}>
            <nav className="flex-grow space-y-2 p-2">
                {viewMode ? (
                    <SidebarButton
                        icon={<SquareTerminal className="size-5" />}
                        label="Playground"
                        isActive={currentTab === TabValue.Playground}
                        onClick={() => onTabChange(TabValue.Playground)}
                        isSmallScreen={isSmallScreen}
                    />
                ) : (
                    <>
                        {/* <PlaygroundButton currentTab={currentTab} onTabChange={onTabChange} /> */}
                        <SidebarButton
                            icon={<SquareTerminal className="size-5" />}
                            label="Ai Studio"
                            isActive={currentTab === TabValue.AiStudio}
                            onClick={() => onTabChange(TabValue.AiStudio)}
                            isSmallScreen={isSmallScreen}
                        />
                        <SidebarButton
                            icon={<Image className="size-5" />}
                            label="Galeria"
                            isActive={currentTab === TabValue.Gallery}
                            onClick={() => onTabChange(TabValue.Gallery)}
                            isSmallScreen={isSmallScreen}
                        />
                        <SidebarButton
                            icon={<Folder className="size-5" />}
                            label="Arquivos"
                            isActive={currentTab === TabValue.Files}
                            onClick={() => onTabChange(TabValue.Files)}
                            isSmallScreen={isSmallScreen}
                        />
                        <SidebarButton
                            icon={<BookOpen className="size-5" />}
                            label="Começando"
                            isActive={currentTab === TabValue.GettingStarted}
                            onClick={() => onTabChange(TabValue.GettingStarted)}
                            isSmallScreen={isSmallScreen}
                        />
                        <SidebarButton
                            icon={<CreditCard className="size-5" />}
                            label="Planos"
                            isActive={currentTab === TabValue.Plans}
                            onClick={() => onTabChange(TabValue.Plans)}
                            isSmallScreen={isSmallScreen}
                        />
                        <SidebarButton
                            icon={<Mail className="size-5" />}
                            label="Contato"
                            isActive={currentTab === TabValue.Contact}
                            onClick={() => onTabChange(TabValue.Contact)}
                            isSmallScreen={isSmallScreen}
                        />
                    </>
                )}
            </nav>

        </aside>
    )
}
