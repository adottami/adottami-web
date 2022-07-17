import { FC, ReactElement, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';

function clearDocumentHead() {
  while (document.head.lastChild) {
    document.head.lastChild.remove();
  }
}

function createNextHeadMock() {
  const NextHeadMock: FC<{ children?: ReactElement }> = ({ children }) => {
    useEffect(() => {
      if (children) {
        const renderedChildrenAsString = ReactDOMServer.renderToString(children);
        document.head.insertAdjacentHTML('afterbegin', renderedChildrenAsString);
      }

      return () => {
        clearDocumentHead();
      };
    }, [children]);

    return null;
  };

  return NextHeadMock;
}

export default createNextHeadMock;
