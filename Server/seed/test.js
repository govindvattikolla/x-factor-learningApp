import fs from "fs";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

async function generateCertificate(name, course) {
    try {
        const bgBytes = fs.readFileSync("../files/certificate_bg.jpeg");

        const pdfDoc = await PDFDocument.create();

        const bgImage = await pdfDoc.embedJpg(bgBytes);

        const page = pdfDoc.addPage([bgImage.width, bgImage.height]);

        page.drawImage(bgImage, {
            x: 0,
            y: 0,
            width: bgImage.width,
            height: bgImage.height
        });

        const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const dark = rgb(0.05, 0.05, 0.05);

        page.drawText("Certificate of Completion", {
            x: 300,
            y: 650,
            size: 32,
            font: bold,
            color: dark,
        });

        page.drawText("This certificate is awarded to", {
            x: 350,
            y: 600,
            size: 16,
            font: regular,
            color: dark,
        });

        page.drawText(name, {
            x: 330,
            y: 560,
            size: 40,
            font: bold,
            color: dark,
        });

        page.drawText(`For successfully completing: ${course}`, {
            x: 280,
            y: 510,
            size: 16,
            font: regular,
            color: dark,
        });

        const pdfBytes = await pdfDoc.save();
        const fileName = `certificate_${name.replace(" ", "_")}.pdf`;

        fs.writeFileSync(fileName, pdfBytes);
        console.log("Certificate generated:", fileName);

    } catch (error) {
        console.error("Error generating certificate:", error);
    }
}

generateCertificate("John Doe", "Full Stack Development")
    .catch(err => console.error(err));