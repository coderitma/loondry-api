const pdfkit = require("pdfkit");

const invoice = {
  shipping: {
    name: "John Doe",
    address: "1234 Main Street",
    city: "San Francisco",
    state: "CA",
    country: "US",
    postal_code: 94111,
  },
  items: [
    {
      item: "TC 100",
      description: "Toner Cartridge",
      quantity: 2,
      amount: 6000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
  ],
  subtotal: 8000,
  paid: 0,
  invoice_nr: 1234,
};

function generateHeader(doc) {
  doc
    .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("PT. Anugerah Mandiri.", 110, 57)
    .fontSize(10)
    .text("PT. Anugerah Mandiri.", 200, 50, { align: "right" })
    .text("Jl. Bojong Kenyot", 200, 65, { align: "right" })
    .text("Jakarta Pinggir, JakPing, 10027", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, faktur) {
  doc.fillColor("#444444").fontSize(20).text("Faktur Cucian", 50, 160);

  generateHr(doc, 185);

  const counterTop = (count, isStart) => {
    const customerInformationTop = 200;
    const jarak = 15;
    const result = isStart
      ? customerInformationTop
      : customerInformationTop + jarak * count;
    return result;
  };

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, counterTop(0, true))
    .font("Helvetica-Bold")
    .text(faktur._id, 150, counterTop(0, true))
    .font("Helvetica")
    .text("Invoice Date:", 50, counterTop(1, false))
    .text(faktur.tanggalTerima.toDateString(), 150, counterTop(1, false))
    .text("Total Harga:", 50, counterTop(2, false))
    .text(faktur.totalHarga, 150, counterTop(2, false))
    .text("Uang Muka:", 50, counterTop(3, false))
    .text(faktur.uangMuka, 150, counterTop(3, false))
    .text("Sisa:", 50, counterTop(4, false))
    .text(faktur.sisa, 150, counterTop(4, false))
    .text("Kembali:", 50, counterTop(5, false))
    .text(faktur.kembali, 150, counterTop(5, false))

    .moveDown();
  generateHr(doc, 300);
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

exports.generatePDF = (res, faktur) => {
  let doc = new pdfkit({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, faktur);
  generateInvoiceTable(doc, faktur);
  generateFooter(doc, faktur);
  let buffers = [];
  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": "attachment;filename=tester.pdf",
      })
      .end(pdfData);
  });

  doc.end();
};

function generateTableRow(doc, y, nama, jumlah) {
  doc.fontSize(10).text(nama, 50, y).text(jumlah, 150, y, {
    width: 90,
    align: "right",
  });
}

function generateInvoiceTable(doc, faktur) {
  let i;
  let count = 0;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(doc, invoiceTableTop, "Nama", "Jumlah");
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");
  // 2
  for (i = 0; i < faktur.daftarBarang.length; i++) {
    const barang = faktur.daftarBarang[i];
    const position = invoiceTableTop + (i + 1) * 30;
    count += barang.jumlah;
    generateTableRow(doc, position, barang.nama, barang.jumlah);
    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  doc.font("Helvetica-Bold");
  generateTableRow(doc, subtotalPosition, "Total jumlah", count);

  // const paidToDatePosition = subtotalPosition + 20;
  // generateTableRow(
  //   doc,
  //   paidToDatePosition,
  //   "",
  //   "",
  //   "Paid To Date",
  //   "",
  //   formatCurrency(invoice.paid)
  // );

  // const duePosition = paidToDatePosition + 25;
  // doc.font("Helvetica-Bold");
  // generateTableRow(
  //   doc,
  //   duePosition,
  //   "",
  //   "",
  //   "Balance Due",
  //   "",
  //   formatCurrency(invoice.subtotal - invoice.paid)
  // );
  // doc.font("Helvetica");
}

function generateFooter(doc, faktur) {
  doc
    .fontSize(10)
    .text(
      faktur.sisa === 0
        ? `Terimakasih, senang berbisnis dengan anda`
        : `Batas pembayaran sisa sebesar Rp. ${faktur.sisa} harus segara dilunasi.`,
      50,
      580,
      { align: "center", width: 500 }
    );
}
