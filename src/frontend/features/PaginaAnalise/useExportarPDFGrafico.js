import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function useExportarPDF() {
    const exportarGraficos = async (graficoRefs, nomeArquivo = 'dashboard.pdf') => {
        const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
        let yOffset = 10;

        for (const ref of graficoRefs) {
            if (ref.current) {
                const canvas = await html2canvas(ref.current, {
                    scale: 3, 
                });
                const imgData = canvas.toDataURL('image/png');

                const pageWidth = doc.internal.pageSize.getWidth();
                const pageHeight = doc.internal.pageSize.getHeight();
                const imgProps = doc.getImageProperties(imgData);
                const ratio = imgProps.width / imgProps.height;

                const imgWidth = pageWidth - 20;
                const imgHeight = imgWidth / ratio;

                if (yOffset + imgHeight > pageHeight) {
                    doc.addPage();
                    yOffset = 10;
                }

                doc.addImage(imgData, 'PNG', 10, yOffset, imgWidth, imgHeight);
                yOffset += imgHeight + 10;
            }
        }

        doc.save(nomeArquivo);
    };

    return { exportarGraficos };
}
