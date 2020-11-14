const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
  layout: 'landscape',
  size: 'A4',
});

doc.pipe(fs.createWriteStream('output.pdf'));

doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fff');

doc.fontSize(10);

// Margin
const distanceMargin = 18;

doc
  .fillAndStroke('#0e8cc3')
  .lineWidth(20)
  .lineJoin('round')
  .rect(
    distanceMargin,
    distanceMargin,
    doc.page.width - distanceMargin * 2,
    doc.page.height - distanceMargin * 2,
  )
  .stroke();

// Header
const maxWidth = 140;
const maxHeight = 70;

doc.image('assets/Winners.png', doc.page.width / 2 - maxWidth / 2, 60, {
  fit: [maxWidth, maxHeight],
  align: 'center',
});

doc.moveDown();
doc.moveDown();
doc.moveDown();
doc.moveDown();
doc.moveDown();

doc
  .font('fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Super Course for Awesomes', {
    align: 'center',
  });

doc.moveDown();
doc.moveDown();

// Content
doc
  .font('fonts/NotoSansJP-Regular.otf')
  .fontSize(16)
  .fill('#021c27')
  .text('CERTIFICATE OF COMPLETITION', {
    align: 'center',
  });

doc.moveDown();

doc
  .font('fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Present to', {
    align: 'center',
  });

doc.moveDown();
doc.moveDown();

doc
  .font('fonts/NotoSansJP-Bold.otf')
  .fontSize(24)
  .fill('#021c27')
  .text('STUDENT NAME', {
    align: 'center',
  });

doc.moveDown();

doc
  .font('fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Successfully completed the Super Course for Awesomes.', {
    align: 'center',
  });

doc.moveDown();
doc.moveDown();
doc.moveDown();
doc.moveDown();
doc.moveDown();
doc.moveDown();
doc.moveDown();

doc.lineWidth(1);

// Validation link
const link =
  'https://validate-your-certification.hello/validation-code-here';

const linkWidth = doc.widthOfString(link);
const linkHeight = doc.currentLineHeight();

doc
  .font('fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text(link, {
    align: 'center',
    link,
  });


doc.underline(
  doc.page.width / 2 - linkWidth / 2,
  448,
  linkWidth,
  linkHeight,
  { color: '#021c27' },
);

// Signatures
const lineSize = 174;
const signatureHeight = 380;

doc.fillAndStroke('#021c27');
doc.strokeOpacity(0.2);

const startLine1 = 128;
const endLine1 = 128 + lineSize;
doc
  .moveTo(startLine1, signatureHeight)
  .lineTo(endLine1, signatureHeight)
  .stroke();

const startLine2 = 128 + lineSize + 32;
const endLine2 = 128 + lineSize + 32 + lineSize;
doc
  .moveTo(startLine2, signatureHeight)
  .lineTo(endLine2, signatureHeight)
  .stroke();

const startLine3 = 128 + lineSize + 32 + lineSize + 32;
const endLine3 = 128 + lineSize + 32 + lineSize + 32 + lineSize;
doc
  .moveTo(startLine3, signatureHeight)
  .lineTo(endLine3, signatureHeight)
  .stroke();

doc
  .font('fonts/NotoSansJP-Bold.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('John Doe', startLine1, signatureHeight + 10, {
    columns: 1,
    columnGap: 0,
    height: 40,
    width: lineSize,
    align: 'center',
  });

doc
  .font('fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Associate Professor', startLine1, signatureHeight + 25, {
    columns: 1,
    columnGap: 0,
    height: 40,
    width: lineSize,
    align: 'center',
  });

doc
  .font('fonts/NotoSansJP-Bold.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Student Name', startLine2, signatureHeight + 10, {
    columns: 1,
    columnGap: 0,
    height: 40,
    width: lineSize,
    align: 'center',
  });

doc
  .font('fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Student', startLine2, signatureHeight + 25, {
    columns: 1,
    columnGap: 0,
    height: 40,
    width: lineSize,
    align: 'center',
  });

doc
  .font('fonts/NotoSansJP-Bold.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Jane Doe', startLine3, signatureHeight + 10, {
    columns: 1,
    columnGap: 0,
    height: 40,
    width: lineSize,
    align: 'center',
  });

doc
  .font('fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Director', startLine3, signatureHeight + 25, {
    columns: 1,
    columnGap: 0,
    height: 40,
    width: lineSize,
    align: 'center',
  });

doc.text('', 0, 0);

doc.moveDown();
doc.moveDown();
doc.moveDown();
doc.moveDown();

// Footer
const bottomHeight = doc.page.height - 100;

doc.image('assets/Qr.png', doc.page.width / 2 - 30, bottomHeight, {
  fit: [60, 60],
});

doc.end();