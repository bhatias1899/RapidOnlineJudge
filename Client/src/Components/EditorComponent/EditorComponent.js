import { useState } from 'react';
import { 
  BtnBold,
  BtnItalic,
  Editor,
  EditorProvider,
  Toolbar
} from 'react-simple-wysiwyg';

import "./EditorComponent.css"

export default function CustomEditor({value,onChange,index}) {
  

  return (
    <EditorProvider>
      <Editor value={value} onChange={(e)=>onChange(e,index)}>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}