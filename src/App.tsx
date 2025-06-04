import { useSelector } from "react-redux";
import RecursiveComponent from "./components/RecursiveComponent";
import ResizablePanel from "./components/ResizablePanel";
import { fileTree } from "./data/fileTree";
import OpenFileComponent from "./OpenFileCompoent";
import { RootState } from "./app/store";
import WelcomeTab from "./WelcomeTab";
import { Toaster } from "react-hot-toast";
import Preview from "./components/Preview";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Terminal from "./components/Terminal";
import HeaderVs from "./components/Header";

const App = () => {
  const { openedFiles,closeTerminial } = useSelector((state: RootState) => state.fileTree);

  return (
    <div className="h-screen">
      <HeaderVs/>
      <PanelGroup direction="vertical">
        {/* Editor Panel */}
        <Panel defaultSize={70} minSize={30} order={1}>
          <div className="flex h-full">
            <ResizablePanel
              showLeftPanel
              leftPanel={
                <div className="w-64 p-2">
                  <OpenFileComponent />
                  <RecursiveComponent fileTree={fileTree} />
                </div>
              }
              rightPanel={openedFiles.length ? <Preview /> : <WelcomeTab />}
            />
          </div>
        </Panel>

        {/* Resize Handle */}
        <PanelResizeHandle className="border-1 border-b-2 transition-colors" />

        {/* Terminal Panel */}
{
  closeTerminial&&
          <Panel defaultSize={30} minSize={10} order={2}>
          <div className="h-full bg-[#1E1E1E]">
            <Terminal />
          </div>
        </Panel>
}
      </PanelGroup>
      <Toaster />
    </div>
  );
};

export default App; 