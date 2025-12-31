"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
    Bold, Italic, Strikethrough, List, ListOrdered,
    Quote, Heading2, Heading3, Link as LinkIcon,
    Image as ImageIcon, Undo, Redo
} from "lucide-react";
import { useEffect } from "react";

interface TiptapEditorProps {
    content: string;
    onChange: (html: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
    // FIX: Clean up the class string to remove newlines which break DOMTokenList
    const editorClasses = `
        prose prose-sm sm:prose lg:prose-lg dark:prose-invert focus:outline-none min-h-[300px] max-w-none px-4 py-3
        [&_ol]:list-decimal [&_ol]:pl-5 
        [&_ul]:list-disc [&_ul]:pl-5 
        [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4
        [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-6
        [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2 [&_h3]:mt-4
        [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4
        [&_img]:rounded-lg [&_img]:shadow-md [&_img]:max-w-full
    `.replace(/\s+/g, ' ').trim();

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline cursor-pointer',
                },
            }),
            Placeholder.configure({
                placeholder: 'Write something amazing...',
                emptyEditorClass: 'is-editor-empty',
            }),
        ],
        content: content,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: editorClasses, // Pass the sanitized string
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        return () => {
            if (editor) editor.destroy();
        };
    }, [editor]);

    if (!editor) {
        return null;
    }

    const addImage = () => {
        const url = window.prompt('Enter image URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className="bg-background border border-border rounded-lg overflow-hidden flex flex-col shadow-sm">

            {/* Toolbar */}
            <div className="bg-secondary/50 border-b border-border p-2 flex flex-wrap gap-1 items-center sticky top-0 z-10">

                <ToolbarBtn
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    icon={<Bold size={16} />}
                />
                <ToolbarBtn
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    icon={<Italic size={16} />}
                />
                <ToolbarBtn
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive('strike')}
                    icon={<Strikethrough size={16} />}
                />

                <div className="w-px h-6 bg-border mx-1" />

                <ToolbarBtn
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                    icon={<Heading2 size={16} />}
                />
                <ToolbarBtn
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor.isActive('heading', { level: 3 })}
                    icon={<Heading3 size={16} />}
                />

                <div className="w-px h-6 bg-border mx-1" />

                <ToolbarBtn
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    icon={<List size={16} />}
                />
                <ToolbarBtn
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    icon={<ListOrdered size={16} />}
                />
                <ToolbarBtn
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                    icon={<Quote size={16} />}
                />

                <div className="w-px h-6 bg-border mx-1" />

                <ToolbarBtn onClick={setLink} isActive={editor.isActive('link')} icon={<LinkIcon size={16} />} />
                <ToolbarBtn onClick={addImage} isActive={false} icon={<ImageIcon size={16} />} />

                <div className="flex-1" />

                <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} isActive={false} icon={<Undo size={16} />} />
                <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} isActive={false} icon={<Redo size={16} />} />

            </div>

            {/* Editor Surface */}
            <div className="bg-background cursor-text" onClick={() => editor.commands.focus()}>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

function ToolbarBtn({ onClick, isActive, icon }: { onClick: () => void, isActive: boolean, icon: React.ReactNode }) {
    return (
        <button
            type="button"
            onClick={(e) => {
                e.preventDefault(); // Prevent form submission
                onClick();
            }}
            className={`p-2 rounded hover:bg-muted transition-colors cursor-pointer ${
                isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
            }`}
        >
            {icon}
        </button>
    );
}