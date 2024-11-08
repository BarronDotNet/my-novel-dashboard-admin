'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import FontFamily from '@tiptap/extension-font-family';
import Color from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Underline from '@tiptap/extension-underline';
import { useEffect } from 'react';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaLink,
} from 'react-icons/fa';
import { RiFontSize, RiFontColor } from 'react-icons/ri';
import { AiOutlineTable } from 'react-icons/ai';

interface EditBookTextEditorContentProps {
  content?: string;
  onContentChange?: (content: string) => void;
}

const EditBookTextEditorContent = ({
  content,
  onContentChange,
}: EditBookTextEditorContentProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      FontFamily.configure({ types: ['textStyle'] }),
      Color.configure({ types: ['textStyle'] }),
      Link,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Underline,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const updatedContent = editor.getHTML();
      if (onContentChange) {
        onContentChange(updatedContent);
      }
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  return (
    <div className="border p-3 rounded-lg">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="menu-bar mb-2 flex space-x-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <FaItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
      >
        <FaUnderline />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
      >
        <FaStrikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().setFontFamily('Kanit').run()}
      >
        <RiFontSize />
      </button>
      <button onClick={() => editor.chain().focus().setColor('#FFA500').run()}>
        <RiFontColor />
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()}>
        <FaAlignLeft />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      >
        <FaAlignCenter />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      >
        <FaAlignRight />
      </button>
      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
      >
        <AiOutlineTable />
      </button>
      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleLink({ href: 'https://example.com' })
            .run()
        }
      >
        <FaLink />
      </button>
    </div>
  );
};

export default EditBookTextEditorContent;
