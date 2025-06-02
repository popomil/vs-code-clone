import { v4 as uuid } from "uuid";
import { IFile } from "../interfaces";

export const fileTree: IFile = {
  id: uuid(),
  name: "VS Code Clone",
  isFolder: true,
  children: [
    {
      id: uuid(),
      name: "node_modules",
      isFolder: true,
      children: [],
    },
    {
      name: "public",
      id: uuid(),
      isFolder: true,
      children: [
        {
          id: uuid(),
          name: "index.html",
          isFolder: false,
          content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
        },
        {
          id: uuid(),
          name: "vite.svg",
          isFolder: false,
          content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
        },
      ],
    },
    {
      id: uuid(),
      name: "src",
      isFolder: true,
      children: [
        {
          id: uuid(),
          name: "app",
          isFolder: true,
          children: [
            {
              id: uuid(),
              name: "store.ts",
              isFolder: false,
              content: `import { configureStore } from "@reduxjs/toolkit";
import fileTreeSlice from "./features/fileTreeSlice";

export const store = configureStore({
  reducer: {
    tree: fileTreeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
`,
            },
            {
              id: uuid(),
              name: "features",
              isFolder: true,
              children: [
                {
                  id: uuid(),
                  name: "fileTreeSlice.ts",
                  isFolder: false,
                  content: `import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFile } from "../../interfaces";
// Removed import for fileTree from data/fileTree to avoid circular dependency
// import { fileTree } from "../../data/fileTree"; 

interface FileTreeState {
  tree: IFile; // This will be initialized with the full fileTree object where this slice is used (e.g., in store.ts)
  clickedFile: {
    fileId: string | null;
    fileContent: string;
  };
  openedFiles: IFile[];
}

// Initial state for fileTree will be set in the store configuration, not here to avoid circular dependency
const initialState: FileTreeState = {
  tree: {} as IFile, // Initialize with an empty object for now, it will be populated
  clickedFile: {
    fileId: null,
    fileContent: "",
  },
  openedFiles: [],
};

const fileTreeSlice = createSlice({
  name: "fileTree",
  initialState,
  reducers: {
    setTree: (state, action: PayloadAction<IFile>) => { // Add a reducer to set the initial tree
      state.tree = action.payload;
    },
    setClickedFile: (state, action: PayloadAction<{ id: string; content: string }>) => {
      state.clickedFile.fileId = action.payload.id;
      state.clickedFile.fileContent = action.payload.content;
      const fileExists = state.openedFiles.some(file => file.id === action.payload.id);
      if (!fileExists) {
        // Find the file object to add to openedFiles
        const findFileInTree = (node: IFile, id: string): IFile | undefined => {
          if (node.id === id) return node;
          if (node.isFolder && node.children) {
            for (const child of node.children) {
              const found = findFileInTree(child, id);
              if (found) return found;
            }
          }
          return undefined;
        };
        const newFile = findFileInTree(state.tree, action.payload.id);
        if (newFile) {
          state.openedFiles.push(newFile);
        }
      }
    },
    closeFile: (state, action: PayloadAction<string>) => {
      state.openedFiles = state.openedFiles.filter(file => file.id !== action.payload);
      if (state.clickedFile.fileId === action.payload) {
        if (state.openedFiles.length > 0) {
          state.clickedFile.fileId = state.openedFiles[state.openedFiles.length - 1].id;
          state.clickedFile.fileContent = state.openedFiles[state.openedFiles.length - 1].content || "";
        } else {
          state.clickedFile.fileId = null;
          state.clickedFile.fileContent = "";
        }
      }
    },
    updateFileContent: (state, action: PayloadAction<{ id: string; content: string }>) => {
      const updateContentInTree = (node: IFile, id: string, newContent: string) => {
        if (node.id === id) {
          node.content = newContent;
          return true;
        }
        if (node.isFolder && node.children) {
          for (const child of node.children) {
            if (updateContentInTree(child, id, newContent)) {
              return true;
            }
          }
        }
        return false;
      };

      updateContentInTree(state.tree, action.payload.id, action.payload.content);

      if (state.clickedFile.fileId === action.payload.id) {
        state.clickedFile.fileContent = action.payload.content;
      }
      const openedFile = state.openedFiles.find(file => file.id === action.payload.id);
      if (openedFile) {
        openedFile.content = action.payload.content;
      }
    },
  },
});

export const { setClickedFile, closeFile, updateFileContent, setTree } = fileTreeSlice.actions;
export default fileTreeSlice.reducer;
`,
                },
              ],
            },
          ],
        },
        {
          id: uuid(),
          name: "components",
          isFolder: true,
          children: [
            {
              id: uuid(),
              name: "IconImg.tsx",
              isFolder: false,
              content: `interface IProps {
  src: string;
  className?: string;
}

const IconImg = ({ src, className = "w-6 h-w-6" }: IProps) => {
  return <img src={src} className={className} />;
};

export default IconImg;
`,
            },
            {
              id: uuid(),
              name: "Preview.tsx",
              isFolder: false,
              content: `import { useSelector } from "react-redux";
import FileSyntaxHighlighter from "./FileSyntaxHighlighter";
import OpenedFilesBar from "./OpenedFilesBar";
import { RootState } from "../app/store";

const Preview = () => {
  const {
    clickedFile: { fileContent },
  } = useSelector(({ tree }: RootState) => tree);

  return (
    <>
      <OpenedFilesBar />
      <FileSyntaxHighlighter content={fileContent} />
    </>
  );
};

export default Preview;
`,
            },
            {
              id: uuid(),
              name: "FileSyntaxHighlighter.tsx",
              isFolder: false,
              content: `import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { updateFileContent } from "../app/features/fileTreeSlice";

interface IProps {
  content: string;
}

const FileSyntaxHighlighter = ({ content }: IProps) => {
  const dispatch = useDispatch();
  const { clickedFile } = useSelector((state: RootState) => state.tree);

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (clickedFile.fileId) {
      dispatch(updateFileContent({ id: clickedFile.fileId, content: event.target.value }));
    }
  };

  return (
    <div className="relative h-[calc(100vh-2.5rem)]">
      {clickedFile.fileId ? (
        <textarea
          className="absolute inset-0 w-full h-full bg-[#282C34] text-white p-4 resize-none outline-none font-mono"
          value={content}
          onChange={handleContentChange}
          spellCheck="false"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          Select a file to view its content
        </div>
      )}
    </div>
  );
};

export default FileSyntaxHighlighter;
`,
            },
            {
              id: uuid(),
              name: "OpenedFilesBar.tsx",
              isFolder: false,
              content: `import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setClickedFile, closeFile } from "../app/features/fileTreeSlice";
import { IFile } from "../interfaces";
import { getFileExtension } from "../utils/helpers";
import { extensionIconPaths } = "../constants";
import IconImg from "./IconImg";

const OpenedFilesBar = () => {
  const dispatch = useDispatch();
  const { openedFiles, clickedFile } = useSelector((state: RootState) => state.tree);

  const handleFileClick = (file: IFile) => {
    dispatch(setClickedFile({ id: file.id, content: file.content || "" }));
  };

  const handleCloseFile = (e: React.MouseEvent, fileId: string) => {
    e.stopPropagation();
    dispatch(closeFile(fileId));
  };

  return (
    <div className="h-10 bg-[#252526] flex items-center px-2 shadow-md">
      {openedFiles.map((file) => {
        const extension = getFileExtension(file.name);
        const iconSrc = extension ? \`\${extensionIconPaths[extension]}.svg\` : "/icons/file.svg";
        return (
          <div
            key={file.id}
            className={\`flex items-center gap-2 px-3 py-1 text-sm cursor-pointer border-r border-[#1D1D1D] \${
              clickedFile.fileId === file.id ? "bg-[#1E1E1E] text-white" : "text-gray-400 hover:bg-[#333333]"
            }\`}
            onClick={() => handleFileClick(file)}
          >
            <IconImg src={iconSrc} className="w-4 h-4" />
            <span>{file.name}</span>
            <button
              className="ml-2 text-gray-400 hover:text-white"
              onClick={(e) => handleCloseFile(e, file.id)}
            >
              &times;
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default OpenedFilesBar;
`,
            },
            {
              id: uuid(),
              name: "Sidebar.tsx",
              isFolder: false,
              content: `import FileTreeNode from "./FileTreeNode";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Sidebar = () => {
  const { tree } = useSelector((state: RootState) => state.tree);

  return (
    <div className="w-full h-[calc(100vh-2.5rem)] bg-[#252526] text-white overflow-y-auto">
      <div className="py-2 px-4 text-xs font-semibold text-gray-400 uppercase">Explorer</div>
      <FileTreeNode node={tree} />
    </div>
  );
};

export default Sidebar;
`,
            },
            {
              id: uuid(),
              name: "FileTreeNode.tsx",
              isFolder: false,
              content: `import { useState } from "react";
import { IFile } from "../interfaces";
import IconImg from "./IconImg";
import { getFileExtension } from "../utils/helpers";
import { extensionIconPaths } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { setClickedFile } from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";

interface IProps {
  node: IFile;
}

const FileTreeNode = ({ node }: IProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const { clickedFile } = useSelector((state: RootState) => state.tree);

  const handleToggle = () => {
    if (node.isFolder) {
      setIsExpanded(!isExpanded);
    } else {
      dispatch(setClickedFile({ id: node.id, content: node.content || "" }));
    }
  };

  const extension = getFileExtension(node.name);
  const iconSrc = node.isFolder
    ? isExpanded
      ? "/icons/folder-open.svg"
      : "/icons/folder.svg"
    : extension
    ? \`\${extensionIconPaths[extension]}.svg\`
    : "/icons/file.svg";

  return (
    <div>
      <div
        className={\`flex items-center gap-2 py-1 pl-\${node.isFolder ? 4 : 8} cursor-pointer \${
          clickedFile.fileId === node.id ? "bg-[#062F4A] text-white" : "hover:bg-[#2B2B2C] text-gray-300"
        }\`}
        onClick={handleToggle}
      >
        <IconImg src={iconSrc} className="w-4 h-4" />
        <span>{node.name}</span>
      </div>
      {node.isFolder && isExpanded && (
        <div className="pl-2">
          {node.children?.map((child) => (
            <FileTreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileTreeNode;
`,
            },
            {
              id: uuid(),
              name: "TopBar.tsx",
              isFolder: false,
              content: `const TopBar = () => {
  return (
    <div className="h-10 bg-[#3C3C3C] text-white flex items-center px-4 justify-between">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-lg">VS Code Clone</span>
        <nav className="text-sm">
          <ul className="flex gap-4">
            <li>File</li>
            <li>Edit</li>
            <li>Selection</li>
            <li>View</li>
            <li>Go</li>
            <li>Run</li>
            <li>Terminal</li>
            <li>Help</li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-2 text-xl">
        <button className="hover:text-gray-300">&#x2212;</button> {/* Minimize */}
        <button className="hover:text-gray-300">&#x25A1;</button> {/* Maximize/Restore */}
        <button className="hover:text-gray-300 text-red-500 font-bold">&times;</button> {/* Close */}
      </div>
    </div>
  );
};

export default TopBar;
`,
            },
          ],
        },
        {
          id: uuid(),
          name: "constants",
          isFolder: true,
          children: [
            {
              id: uuid(),
              name: "index.ts",
              isFolder: false,
              content: `export const extensionIconPaths: Record<string, string> = {
  // ** Files
  js: "/icons/javascript",
  ts: "/icons/typescript",
  tsx: "/icons/react_ts",
  jsx: "/icons/react",
  html: "/icons/html",
  css: "/icons/css",
  json: "/icons/json",
  svg: "/icons/svg",
  md: "/icons/markdown",
  txt: "/icons/text",
  // ** Folders
  node_modules: "/icons/folder-node",
  public: "/icons/folder-public",
  src: "/icons/folder-src",
  components: "/icons/folder-components",
  app: "/icons/folder-app",
  features: "/icons/folder-features",
  constants: "/icons/folder-constants",
  utils: "/icons/folder-utils",
  interfaces: "/icons/folder-interfaces",
  data: "/icons/folder-data",
};
  `,
            },
          ],
        },
        {
          id: uuid(),
          name: "interfaces",
          isFolder: true,
          children: [
            {
              id: uuid(),
              name: "index.ts",
              isFolder: false,
              content: `export interface IFile {
  id: string;
  name: string;
  isFolder: boolean;
  content?: string;
  children?: IFile[];
}
`,
            },
          ],
        },
        {
          id: uuid(),
          name: "utils",
          isFolder: true,
          children: [
            {
              id: uuid(),
              name: "helpers.ts",
              isFolder: false,
              content: `export const getFileExtension = (filename: string): string | undefined => {
  const parts = filename.split(".");
  if (parts.length > 1) {
    return parts[parts.length - 1];
  }
  return undefined;
};
`,
            },
          ],
        },
      ],
    },
  ],
};