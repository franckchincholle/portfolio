import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

interface PdfViewerProps {
  file: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setError(null);
    console.log('PDF chargé avec succès, nombre de pages :', numPages);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Erreur lors du chargement du PDF :', error);
    setError(`Erreur : ${error.message}`);
  };

  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '2rem',
        maxHeight: '65vh',
        overflowY: 'auto',
        padding: '10px',
      }}
    >
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
        >
          {numPages === null ? (
            <p>Chargement du PDF...</p>
          ) : (
            Array.from(new Array(numPages), (_, index) => (
              <Page
                key={index + 1}
                pageNumber={index + 1}
                scale={1.3} 
                width={600} 
                renderAnnotationLayer={false} 
                renderTextLayer={false} 
              />
            ))
          )}
        </Document>
      )}
    </div>
  );
};

export default PdfViewer;