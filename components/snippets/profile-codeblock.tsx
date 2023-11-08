"use client";

import React, { useState } from "react";
import AceEditor from "react-ace";
import { useTheme } from "next-themes";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright";

import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";

export default function ProfileCodeblock({ snippets }: any) {
  const { theme } = useTheme();
  const [editorLoaded, setEditorLoaded] = useState(false);

  React.useEffect(() => {
    // This will ensure editorLoaded is set after the component is mounted
    setEditorLoaded(true);
  }, []);

  return (
    <>
      {editorLoaded ? (
        <AceEditor
          mode={snippets.language}
          theme={theme === "light" ? "github" : "tomorrow_night_bright"}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          className="!w-full border rounded-md"
          value={snippets.code}
          readOnly={true}
        />
      ) : (
        <Skeleton className="h-[31.25rem]" />
      )}
    </>
  );
}
