import { useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';

interface typeProps {
  value?: string;
  onChange?: (value: string) => void;
}

const FormEditor = (props: typeProps) => {
  const monacoRef = useRef(null);

  return (
    <MonacoEditor
      ref={monacoRef}
      language="css"
      height="80vh"
      theme="twilight"
      onChange={(value) => {
        props.onChange?.(value);
      }}
      value={props.value}
    />
  );
};

export default FormEditor;
