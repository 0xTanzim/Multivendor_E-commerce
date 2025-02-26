'use client';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
// import ReactQuill from 'react-quill-new';

type QuillEditorProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
  theme?: 'snow' | 'bubble';
};

const QuillEditor = ({
  value,
  onChange,
  label,
  className = 'sm:col-span-2 mb-3',
  theme = 'snow',
}: QuillEditorProps) => {
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'link',
    'indent',
    'image',
    'code-block',
    'color',
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'color', 'image'],
      [{ 'code-block': true }],
      ['clean'],
    ],
  };

  return (
    <>
      <div className={className}>
        <label
          htmlFor="content"
          className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
        >
          {label}
        </label>
        <ReactQuill
          theme={theme}
          value={value}
          onChange={onChange}
          formats={formats}
          modules={modules}
          className="text-slate-900 dark:text-white"
        />

        <style>
          {`
          .dark .ql-toolbar {
            @apply bg-slate-800 border-slate-700 text-white;
          }

          .dark .ql-header {
            color: white;
            }
          .dark .ql-stroke {
            stroke: white !important;
          }
          .dark .ql-fill {
            fill: white !important;
          }
        `}
        
        </style>
      </div>
    </>
  );
};

export default QuillEditor;

