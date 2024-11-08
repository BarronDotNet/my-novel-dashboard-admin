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
import TextStyle from '@tiptap/extension-text-style';
import Image from '@tiptap/extension-image';
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
  FaListUl,
  FaListOl,
  FaImage,
  FaVideo,
  FaCode,
  FaQuestion,
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
      TextStyle,
      Image,
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
      <EditorContent editor={editor} className="mt-2 border rounded-lg p-4" />
    </div>
  );
};

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = prompt('Enter the image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="menu-bar mb-2 flex flex-wrap gap-2 bg-gray-100 p-2 rounded-lg shadow-sm">
      <MenuButton
        icon={<FaBold />}
        action={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      />
      <MenuButton
        icon={<FaItalic />}
        action={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      />
      <MenuButton
        icon={<FaUnderline />}
        action={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
      />
      <MenuButton
        icon={<FaStrikethrough />}
        action={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
      />
      <MenuButton
        icon={<RiFontSize />}
        action={() => editor.chain().focus().setFontFamily('Kanit').run()}
      />
      <MenuButton
        icon={<RiFontColor />}
        action={() => editor.chain().focus().setColor('#FFA500').run()}
      />
      <MenuButton
        icon={<FaAlignLeft />}
        action={() => editor.chain().focus().setTextAlign('left').run()}
      />
      <MenuButton
        icon={<FaAlignCenter />}
        action={() => editor.chain().focus().setTextAlign('center').run()}
      />
      <MenuButton
        icon={<FaAlignRight />}
        action={() => editor.chain().focus().setTextAlign('right').run()}
      />
      <MenuButton
        icon={<FaListUl />}
        action={() => editor.chain().focus().toggleBulletList().run()}
      />
      <MenuButton
        icon={<FaListOl />}
        action={() => editor.chain().focus().toggleOrderedList().run()}
      />
      <MenuButton
        icon={<AiOutlineTable />}
        action={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
      />
      <MenuButton
        icon={<FaLink />}
        action={() =>
          editor
            .chain()
            .focus()
            .toggleLink({ href: 'https://example.com' })
            .run()
        }
      />
      <MenuButton icon={<FaImage />} action={addImage} />
      <MenuButton
        icon={<FaCode />}
        action={() => editor.chain().focus().toggleCodeBlock().run()}
      />
      <MenuButton icon={<FaQuestion />} action={() => alert('Help')} />
    </div>
  );
};

const MenuButton = ({
  icon,
  action,
  disabled,
}: {
  icon: JSX.Element;
  action: () => void;
  disabled?: boolean;
}) => (
  <button
    onClick={action}
    disabled={disabled}
    className={`flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 focus:outline-none disabled:opacity-50 ${disabled ? '' : 'hover:shadow-md'} transition-all`}
  >
    <span className="text-lg">{icon}</span>
  </button>
);

export default EditBookTextEditorContent;
