var express = require("express");
let Document = require("../model/Documents");

var { BodyDocs, BodyCheck } = require("../api/doc/content/sale");
var PdfPrinter = require("pdfmake");

var fs = require("fs");
var router = express.Router();

router.post("/", function (req, res, next) {
  const { Request, Client } = req.body;
  let Category;

  let mil = new Date(Request.DataCreateRequest).toLocaleDateString("ru");
  let count = "";
  try {
    Document.findOne({ idRequest: Request._id }).then((result) => {
      switch (Request.RateRang) {
        case "000000002":
          Category = "A";
          break;
        case "000000003":
          Category = "B";
          break;
        case "000000004":
          Category = "C";
          break;
        case "000000005":
          Category = "D";
          break;
      }
      if (result) {
        let Contract = {
          ContractDate: mil,
          Сount: result.Count,
          Salesman: {
            //Продавец
            name:
              Client.firstName +
              " " +
              Client.lastName +
              " " +
              Client.secondName,
            document: {
              seria: Client.seriesDocument,
              number: Client.numberDocument,
              whoIssued: Client.whoIssued,
              dateDocument: Client.dateDocument,
              document: Client.document,
            },
            address: Client.address,
          },
          Device: {
            model: Request.DeviceTitle,
            color: Request.Color,
            seria: Request.IMEI,
            category: Category,
            price: Request.Price,
          },
        };
        try {
          var printer = new PdfPrinter(BodyDocs(Contract).fonts);
          var pdfDoc = printer.createPdfKitDocument(
            BodyDocs(Contract).docDefinition
          );
          if (
            pdfDoc.pipe(
              fs.createWriteStream(`public/docs/docs_${Request._id}.pdf`)
            ) &&
            pdfDoc.end()
          ) {
            setTimeout(() => {
              res.status(201).send(`public/docs/docs_${Request._id}.pdf`);
            }, 3000);
          }
        } catch (error) {
          res.send(error);
        }
      } else {
        switch (Request.RateRang) {
          case "000000002":
            Category = "A";
            break;
          case "000000003":
            Category = "B";
            break;
          case "000000004":
            Category = "C";
            break;
          case "000000005":
            Category = "D";
            break;
        }
        Document.find({}).then((result) => {
          count = result.length + 1;
          Document.create({
            Count: count,
            Date: mil,
            Request: Request,
            idRequest: Request._id,
            Client: Client,
          })
            .catch((e) => {
              if (e) {
                console.log("Проверьте порядковый номер ", Request._id);
              }
            })
            .finally((final) => {
              let Contract = {
                ContractDate: mil,
                Сount: count,
                Salesman: {
                  //Продавец
                  name:
                    Client.firstName +
                    " " +
                    Client.lastName +
                    " " +
                    Client.secondName,
                  document: {
                    seria: Client.seriesDocument,
                    number: Client.numberDocument,
                    whoIssued: Client.whoIssued,
                    dateDocument: Client.dateDocument,
                    document: Client.document,
                  },
                  address: Client.address,
                },
                Device: {
                  model: Request.DeviceTitle,
                  color: Request.Color,
                  seria: Request.IMEI,
                  category: Category,
                  price: Request.Price,
                },
              };
              try {
                var printer = new PdfPrinter(BodyDocs(Contract).fonts);
                var pdfDoc = printer.createPdfKitDocument(
                  BodyDocs(Contract).docDefinition
                );
                if (
                  pdfDoc.pipe(
                    fs.createWriteStream(`public/docs/docs_${Request._id}.pdf`)
                  ) &&
                  pdfDoc.end()
                ) {
                  setTimeout(() => {
                    res.status(201).send(`public/docs/docs_${Request._id}.pdf`);
                  }, 0);
                }
              } catch (error) {
                res.send(error);
              }
            });
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
});
router.post("/check", async (req, res, next) => {
  // const { Request } = req.body;
  // let Doc = await Document.findOne({ idRequest: Request._id });

  var printer = new PdfPrinter(BodyCheck().fonts);
  var pdfDoc = printer.createPdfKitDocument(BodyCheck().docDefinition);
  pdfDoc.pipe(fs.createWriteStream(`public/docs/check_1.pdf`)) && pdfDoc.end();
  res.status(200).send("ok");
});

module.exports = router;
