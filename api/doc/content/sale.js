exports.BodyDocs = function ({ Сount, Salesman, ContractDate, Device }) {
  let Contract = {
    ContractDate: "",
    Customer: {
      //Покупатель
      name: "ИП Мухаметзянов Радик Рашитович",
      phone: "79605088888",
      address: "153031, г.Иваново, Шахтинский пр-д, д.89, кв.26",
      email: "a.evlannikov@sotiks.net",
    },
    Salesman: {
      //Продавец
      name: "",
      document: {
        seria: "",
        number: "",
        whoIssued: "",
        dateDocument: "",
        document: "",
      },
      address: "",
    },
    Device: {
      model: "",
      color: "",
      seria: "",
      category: "",
      price: "",
    },
  };
  Contract.Count = Сount;
  Contract.ContractDate = ContractDate;
  Contract.Salesman.name = Salesman.name;
  Contract.Salesman.document.number = Salesman.document.number;
  Contract.Salesman.document.seria = Salesman.document.seria;
  Contract.Salesman.document.whoIssued = Salesman.document.whoIssued;
  Contract.Salesman.document.dateDocument = Salesman.document.dateDocument;
  Contract.Salesman.address = Salesman.address;
  Contract.Device.model = Device.model;
  Contract.Device.color = Device.color;
  Contract.Device.seria = Device.seria;
  Contract.Device.category = Device.category;
  Contract.Device.price = Device.price;

  return {
    docDefinition: {
      content: [
        { text: "Приложение №3", style: "annex" },
        {
          text: "к агентскому Договору    № ЛП00000337  от «09» сентября 2021 г.",
          style: "annex",
        },
        { text: " " },
        {
          text: `Договор купли-продажи мобильной техники и электроники,  бывшей в употреблении № ${Contract.Count}`,
          style: "heading",
        },
        {
          text: `${Contract.ContractDate}`,
          style: "annex",
        },
        { text: " " },
        {
          text: `1. ${Contract.Salesman.name}, именуемый в дальнейшем Продавец, с одной стороны, и , именуемое в дальнейшем «Покупатель», в лице Мухаметзянова Радика Рашитовича, действующего на основании Свидетельства о регистрации №370200589937003 от 02.12.2004, в соответствии с Агентским Договором № ЛП00000337 от 09.09.2021, заключенным с ООО «Партнер Премиум», также действующего на основании Доверенности, с другой стороны, вместе именуемые «Стороны», заключили настоящий Договор о нижеследующем:`,
          style: "content",
        },
        { text: " " },
        {
          text: "Продавец обязуется передать бывшую в употреблении технику (далее – Товар) и относящиеся к ней документы в собственность Покупателя, а Покупатель обязуется осмотреть Товар, принять и оплатить его на условиях, установленных настоящим Договором.",
          style: "content",
        },
        { text: " " },
        {
          text: "2. Сведения о продаваемом товаре (наименование, комплектность, и др.) ",
          style: "content",
        },
        { text: " " },
        {
          layout: "lightHorizontalLines", // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ["*", "auto", "auto", "*", "auto", "auto"],

            body: [
              [
                { text: "№", style: "thead" },
                { text: "Модель", style: "thead" },
                { text: "Цвет", style: "thead" },
                { text: "IMEI/серийный номер", style: "thead" },
                { text: "Состояние", style: "thead" },
                { text: "Стоимость, руб.", style: "thead" },
              ],
              [
                { text: "1", style: "tbody" },
                {
                  text: `${Contract.Device.model}`,
                  style: "tbody",
                },
                { text: `${Contract.Device.color}`, style: "tbody" },
                { text: `${Contract.Device.seria}`, style: "tbody" },
                { text: `${Contract.Device.category}`, style: "tbody" },
                { text: `${Contract.Device.price}`, style: "tbody" },
              ],
            ],
          },
        },
        { text: " " },
        {
          text: "3. Продавец гарантирует, что Товар не заложен, не арестован, не является предметом исков третьих лиц, принадлежит ему на праве собственности, не обременен правами третьих лиц, не обременен кредитными обязательствами, не является предметов уголовных и иных расследований и дел. ",
          style: "content",
        },
        {
          text: `4. Сумма Договора составляет ${Contract.Device.price} руб.`,
          style: "content",
        },
        {
          text: "6. Передача товара в соответствии с условиями настоящего Договора производится по адресу: ",
          style: "content",
        },
        {
          text: "7. Договор одновременно является актом приема-передачи и считается исполненным после фактической передачи Товара Покупателю. ",
          style: "content",
        },
        {
          text: "8. Продавец передал Товар Покупателю, а Покупатель оплатил Товар в соответствии с п. 2. Договора.",
          style: "content",
        },
        {
          text: "9. Товар, оплаченный Покупателем в полном объеме, не может быть возвращен Продавцу.",
          style: "content",
        },
        {
          text: "10. Продавец предоставил Покупателю необходимую и достоверную информацию о Товаре, указанном в п. 2 настоящего Договора, соответствующую установленным законом, правовыми актами.",
          style: "content",
        },
        {
          text: "11. Покупатель обязан оплатить, принять и осмотреть Товар в установленные настоящим Договором сроки ",
          style: "content",
        },
        {
          text: "12. Покупатель вправе требовать предоставления ему необходимой и достоверной информации о Товаре, указанном в п. 2 настоящего Договора, соответствующей установленным законом, иными правовыми актами.",
          style: "content",
        },
        {
          text: "13. За неисполнение или ненадлежащее исполнение обязательств по настоящему Договору стороны несут ответственность в соответствии с действующим законодательством РФ. В случае если Товар не является собственностью Продавца, то Продавец несет ответственность в соответствии с действующим законодательством РФ. В случае предоставления Продавцом Покупателю недостоверной информации по Товару, документов, сведений о праве собственности на Товар, все материальные, моральные издержки в полном объеме возмещает Продавец.",
          style: "content",
        },
        {
          text: "14. Споры и разногласия, которые могут возникнуть при исполнении настоящего Договора, будут по возможности разрешаться путем переговоров между сторонами. В случае невозможности разрешения споров путем переговоров они подлежат разрешению в суде города Санкт-Петербурга.",
          style: "content",
        },
        {
          text: "15. Во всем остальном, не предусмотренном настоящим Договором, стороны руководствуются действующим законодательством РФ. Настоящий Договор вступает в силу с момента его подписания уполномоченными представителями сторон и действует до полного выполнения сторонами всех принятых на себя обязательств в соответствии с условиями Договора. Договор составлен на русском языке в двух экземплярах, имеющих одинаковую юридическую силу, по одному для каждой из сторон. Договор не может быть расторгнут в одностороннем порядке.",
          style: "content",
        },
        {
          text: "16. Настоящим Продавец в соответствии с п. 4 ст. 9 Федерального закона от 27.07.2006г.  N 152-ФЗ «О персональных данных» дает ООО «Партнер Премиум» свое согласие на обработку и хранение персональных данных. Продавец проинформирован, что ООО «Партнер Премиум» гарантирует обработку предоставленных персональных данных в соответствии с действующим законодательством Российской Федерации. Персональные данные могут обрабатываться, как неавтоматизированным, так и автоматизированным способами. Данное согласие действует в отношении всех персональных данных Продавца, указанных в Договоре. Продавец дает свое согласие на совершение следующих действий по обработке персональных данных: сбор, накопление, запись, в том числе ввод в информационную систему, для реализации данного Договора, хранение, обновление, использование, извлечение, передача (предоставление и доступ), удаление, блокирование, уничтожение. Данное согласие действует до достижения целей обработки персональных данных или в течение срока хранения информации. Данное согласие может быть отозвано по письменному уведомлению Продавца в адрес ООО «Партнер Премиум», не раньше, чем за один месяц до даты его отзыва. Продавец подтверждает, что, давая такое согласие, он действует по собственной воле и в своих интересах.",
          style: "content",
        },
        {
          text: " ",
        },
        {
          text: "17. Адреса и юридические данные  сторон",
          style: "contentBold",
        },
        {
          text: " ",
        },
        {
          text: "Продавец:",
          style: "contentBold",
        },
        {
          text: " ",
        },
        {
          text: `ФИО: ${Contract.Salesman.name}`,
          style: "content",
        },
        {
          text: `Документ:  Паспорт РФ  серия ${Contract.Salesman.document.seria}  № ${Contract.Salesman.document.number}  кем и когда выдан:  ${Contract.Salesman.document.whoIssued} Дата выдачи: ${Contract.Salesman.document.dateDocument} `,
          style: "content",
        },
        {
          text: `Адрес регистрации: ${Contract.Salesman.address} `,
          style: "content",
        },
        {
          text: " ",
        },
        {
          text: "Покупатель:",
          style: "contentBold",
        },
        {
          text: " ",
        },
        {
          text: `${Contract.Customer.name}`,
          style: "content",
        },
        {
          text: `Юридический адрес:${Contract.Customer.address}`,
          style: "content",
        },
        {
          text: "Банковские  реквизиты: 40802810307510000843  Филиал 'Центральный' Банка ВТБ (ПАО) в г.Москве  30101810145250000411 044525411  0142553077  24401370000 47.59.9",
          style: "content",
        },
        {
          text: `Телефон/факс:${Contract.Customer.phone}       E-mail:${Contract.Customer.email}    `,
          style: "content",
        },
        {
          text: " ",
        },
        {
          text: "18. Подписи сторон ",
          style: "contentBold",
        },
        {
          text: " ",
        },
        {
          text: "           Продавец:                                                                              Покупатель: ",
          style: "contentBold",
        },
        {
          text: "    ____________/__________                                           _____________/______________",
          style: "contentBold",
        },
      ],
      styles: {
        annex: {
          fontSize: 11,
          bold: false,
          alignment: "right",
        },
        heading: {
          fontSize: 9,
          alignment: "center",
          bold: true,
        },
        content: {
          fontSize: 8,
          alignment: "left",
          bold: false,
        },
        contentBold: {
          fontSize: 8,
          alignment: "left",
          bold: true,
        },
        thead: {
          fontSize: 8,
          alignment: "left",
          bold: true,
        },
        tbody: {
          fontSize: 8,
          alignment: "left",
          bold: false,
        },
      },
    },
    fonts: {
      Roboto: {
        normal: "./public/fonts/Tinos/Tinos-Regular.ttf",
        bold: "./public/fonts/Tinos/Tinos-Bold.ttf",
        italics: "./public/fonts/Tinos/Tinos-Italic.ttf",
        bolditalics: "./public/fonts/Tinos/Tinos-BoldItalic.ttf",
      },
    },
  };
};
exports.BodyCheck = function () {
  return {
    docDefinition: {
      content: [{ text: "Чек Лист", style: "heading" }],
      styles: {
        heading: {
          fontSize: 9,
          alignment: "center",
          bold: true,
        },
      },
    },
    fonts: {
      Roboto: {
        normal: "./public/fonts/Tinos/Tinos-Regular.ttf",
        bold: "./public/fonts/Tinos/Tinos-Bold.ttf",
        italics: "./public/fonts/Tinos/Tinos-Italic.ttf",
        bolditalics: "./public/fonts/Tinos/Tinos-BoldItalic.ttf",
      },
    },
  };
};
