import Draft, { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
const { Map } = require('immutable');

export interface WysiwygProps {
  className?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

export const Wysiwyg: React.FC<WysiwygProps> = (props) => {
  const contentBlock = htmlToDraft(props.value);
  const contentState = Draft.ContentState.createFromBlockArray(contentBlock.contentBlocks);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const contentBlock = htmlToDraft(props.value);
    if (contentBlock) {
      const contentState = Draft.ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [props.value]);

  const updateState = (newState) => {
    setEditorState(newState);
  };

  const blockRenderMap = Map({
    unstyled: {
      element: 'p',
    },
    atomic: {
      element: 'span',
    },
  });

  return (
    // @ts-ignore
    <Editor
      editorState={editorState}
      wrapperClassName={`wysiwyg_editor__wrapper margin-top-8 ${focused && 'wysiwyg_editor__wrapper-focused'} ${props.className}`}
      editorClassName='wysiwyg_editor'
      onEditorStateChange={updateState}
      onFocus={() => setFocused(true)}
      stripPastedStyles={true}
      //@ts-ignore
      blockRenderMap={Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap)}
      onBlur={(e) => {
        props.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        props.onBlur?.();
        setFocused(false);
      }}
      localization={{
        locale: 'ru',
      }}
      toolbar={{
        options: ['blockType', 'inline', 'list', 'link', 'remove', 'history'],
        blockType: {
          inDropdown: true,
          options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
        },
        inline: {
          inDropdown: false,
          options: ['bold', 'italic', 'underline'],
          bold: {
            icon:
              'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M15.2499 11.8C15.7395 11.5018 16.1527 11.0934 16.4566 10.6073C16.7604 10.1212 16.9465 9.57077 16.9999 9C17.0092 8.48388 16.9167 7.971 16.7277 7.49063C16.5387 7.01027 16.257 6.57184 15.8985 6.20039C15.5401 5.82894 15.1119 5.53174 14.6386 5.32578C14.1653 5.11981 13.656 5.00911 13.1399 5H6.6499V19H13.6499C14.1411 18.9948 14.6264 18.8929 15.0781 18.7001C15.5299 18.5073 15.9392 18.2274 16.2828 17.8764C16.6264 17.5253 16.8975 17.1101 17.0806 16.6543C17.2637 16.1985 17.3552 15.7112 17.3499 15.22V15.1C17.3502 14.4071 17.1528 13.7285 16.7808 13.144C16.4088 12.5594 15.8777 12.0931 15.2499 11.8ZM8.6499 7H12.8499C13.2761 6.98681 13.6961 7.10428 14.0536 7.33665C14.4111 7.56902 14.6889 7.90517 14.8499 8.3C15.0128 8.82779 14.9601 9.39859 14.7034 9.88765C14.4467 10.3767 14.0068 10.7443 13.4799 10.91C13.2753 10.97 13.0631 11.0003 12.8499 11H8.6499V7ZM13.2499 17H8.6499V13H13.2499C13.6761 12.9868 14.0961 13.1043 14.4536 13.3367C14.8111 13.569 15.0889 13.9052 15.2499 14.3C15.4128 14.8278 15.3601 15.3986 15.1034 15.8877C14.8467 16.3767 14.4068 16.7443 13.8799 16.91C13.6753 16.97 13.4631 17.0003 13.2499 17Z" fill="black" fill-opacity="0.8"/>' +
              '</svg>',
          },
          italic: {
            icon:
              'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M11.7601 9H13.7601L11.5601 19H9.56006L11.7601 9ZM13.4401 5C13.2423 5 13.0489 5.05865 12.8845 5.16853C12.72 5.27841 12.5919 5.43459 12.5162 5.61732C12.4405 5.80004 12.4207 6.00111 12.4593 6.19509C12.4979 6.38907 12.5931 6.56725 12.733 6.70711C12.8728 6.84696 13.051 6.9422 13.245 6.98079C13.4389 7.01937 13.64 6.99957 13.8227 6.92388C14.0055 6.84819 14.1616 6.72002 14.2715 6.55557C14.3814 6.39112 14.4401 6.19778 14.4401 6C14.4401 5.73478 14.3347 5.48043 14.1472 5.29289C13.9596 5.10536 13.7053 5 13.4401 5Z" fill="black" fill-opacity="0.8"/>' +
              '</svg>',
          },
          underline: {
            icon:
              'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M19 20V22H5V20H19ZM16 13.215C15.9671 13.875 15.7711 14.5165 15.4297 15.0823C15.0883 15.6481 14.6121 16.1205 14.0435 16.4572C13.475 16.794 12.8318 16.9847 12.1716 17.0122C11.5114 17.0397 10.8546 16.9033 10.26 16.615C9.57464 16.3185 8.99341 15.8241 8.59077 15.1952C8.18813 14.5663 7.98242 13.8315 8 13.085V5.005H6V13.215C6.03383 14.1564 6.28885 15.0766 6.74442 15.9012C7.19998 16.7257 7.84329 17.4314 8.62227 17.9611C9.40125 18.4908 10.294 18.8296 11.2283 18.9502C12.1625 19.0707 13.1121 18.9696 14 18.655C15.1811 18.2613 16.2059 17.5012 16.9252 16.485C17.6446 15.4689 18.0211 14.2498 18 13.005V5.005H16V13.215ZM16 5H18H16ZM8 5H6H8Z" fill="black" fill-opacity="0.8"/>' +
              '</svg>',
          },
        },
        list: {
          inDropdown: false,
          options: ['unordered', 'ordered'],
          unordered: {
            icon:
              'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M4 10.5C3.2 10.5 2.5 11.2 2.5 12C2.5 12.8 3.2 13.5 4 13.5C4.8 13.5 5.5 12.8 5.5 12C5.5 11.2 4.8 10.5 4 10.5ZM4 5.5C3.2 5.5 2.5 6.2 2.5 7C2.5 7.8 3.2 8.5 4 8.5C4.8 8.5 5.5 7.8 5.5 7C5.5 6.2 4.8 5.5 4 5.5ZM4 15.5C3.2 15.5 2.5 16.2 2.5 17C2.5 17.8 3.2 18.5 4 18.5C4.8 18.5 5.5 17.8 5.5 17C5.5 16.2 4.8 15.5 4 15.5ZM7.5 6V8H21.5V6H7.5ZM7.5 18H21.5V16H7.5V18ZM7.5 13H21.5V11H7.5V13Z" fill="black" fill-opacity="0.8"/>' +
              '</svg>',
          },
          ordered: {
            icon:
              'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M2.5 16H4.5V16.5H3.5V17.5H4.5V18H2.5V19H5.5V15H2.5V16ZM3.5 9H4.5V5H2.5V6H3.5V9ZM2.5 11H4.3L2.5 13.1V14H5.5V13H3.7L5.5 10.9V10H2.5V11ZM7.5 6V8H21.5V6H7.5ZM7.5 18H21.5V16H7.5V18ZM7.5 13H21.5V11H7.5V13Z" fill="black" fill-opacity="0.8"/>' +
              '</svg>',
          },
        },
        link: {
          inDropdown: false,
          showOpenOptionOnHover: true,
          defaultTargetOption: '_self',
          options: ['link', 'unlink'],
          link: {
            icon:
              'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M14 7H16C18.7614 7 21 9.23858 21 12C21 14.7614 18.7614 17 16 17H14M10 7H8C5.23858 7 3 9.23858 3 12C3 14.7614 5.23858 17 8 17H10M8 12H16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-opacity="0.8" stroke-linejoin="round" />' +
              '</svg>',
          },
          unlink: {
            icon:
              'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
              '<g fill="black" fill-opacity="0.8" fill-rule="nonzero">' +
              '<path d="M14.5,10 C16.9853,10 19,12.0147 19,14.5 C19,16.9853 16.9853,19 14.5,19 C12.0147,19 10,16.9853 10,14.5 C10,12.0147 12.0147,10 14.5,10 Z M12.7322,12.7322 C12.537,12.9275 12.537,13.2441 12.7322,13.4393 L13.7929,14.5 L12.7322,15.5607 C12.537,15.7559 12.537,16.0725 12.7322,16.2678 C12.9275,16.463 13.2441,16.463 13.4393,16.2678 L14.5,15.2071 L15.5607,16.2678 C15.7559,16.463 16.0725,16.463 16.2678,16.2678 C16.463,16.0725 16.463,15.7559 16.2678,15.5607 L15.2071,14.5 L16.2678,13.4393 C16.463,13.2441 16.463,12.9275 16.2678,12.7322 C16.0725,12.537 15.7559,12.537 15.5607,12.7322 L14.5,13.7929 L13.4393,12.7322 C13.2441,12.537 12.9275,12.537 12.7322,12.7322 Z M8,4 C8.41421,4 8.75,4.33579 8.75,4.75 C8.75,5.1297 8.46785,5.44349 8.10177,5.49315 L8,5.5 L6,5.5 C4.61929,5.5 3.5,6.61929 3.5,8 C3.5,9.32548 4.53154,10.41 5.83562,10.4947 L6,10.5 L8,10.5 C8.41421,10.5 8.75,10.8358 8.75,11.25 C8.75,11.6297 8.46785,11.9435 8.10177,11.9932 L8,12 L6,12 C3.79086,12 2,10.2091 2,8 C2,5.8578 3.68397,4.10892 5.80036,4.0049 L6,4 L8,4 Z M14,4 C16.2091,4 18,5.79086 18,8 C18,8.68859 17.826,9.33654 17.5196,9.90229 C17.1031,9.62824 16.6472,9.40924 16.1623,9.25566 C16.377,8.88667 16.5,8.4577 16.5,8 C16.5,6.67452 15.4685,5.58996 14.1644,5.50532 L14,5.5 L12,5.5 C11.5858,5.5 11.25,5.16421 11.25,4.75 C11.25,4.3703 11.5322,4.05651 11.8982,4.00685 L12,4 L14,4 Z M13.75,7.25 C14.1642,7.25 14.5,7.58579 14.5,8 C14.5,8.3797 14.2178,8.69349 13.8518,8.74315 L13.75,8.75 L6.25,8.75 C5.83579,8.75 5.5,8.41421 5.5,8 C5.5,7.6203 5.78215,7.30651 6.14823,7.25685 L6.25,7.25 L13.75,7.25 Z" />' +
              '</g>' +
              '</g>' +
              '</svg>',
          },
        },
        history: {
          inDropdown: false,
          undo: {
            icon:
              'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M10.4 9.4C8.7 9.7 7.2 10.3 5.8 11.4L3 8.5V15.5H10L7.3 12.8C11 10.2 16.1 11 18.8 14.7C19 15 19.2 15.2 19.3 15.5L21.1 14.6C18.9 10.8 14.7 8.7 10.4 9.4Z" fill="black" fill-opacity="0.8"/>' +
              '</svg>',
          },
          redo: {
            icon:
              'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M13.6 9.4C15.3 9.7 16.8 10.3 18.2 11.4L21 8.5V15.5H14L16.7 12.8C13 10.1 7.9 11 5.3 14.7C5.1 15 4.9 15.2 4.8 15.5L3 14.6C5.1 10.8 9.3 8.7 13.6 9.4Z" fill="black" fill-opacity="0.8"/>' +
              '</svg>',
          },
        },
      }}
    />
  );
};
