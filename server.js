const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const axios = require("axios");
const compression = require("compression");
const fs = require("fs");
const pdf = require("html-pdf");

// init number of request
global.counter = 1;

dotenv.config();

app.use(bodyParser.json());
app.use(compression({ threshold: 0 }));
app.use(express.static("public"));

app.post("/api/crmRequest", async (req, res) => {
  try {
    const {
      full_name,
      phone,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
    } = req.body;

    const requestData = {
      source_id: "1",
      buyer: {
        full_name,
        phone,
      },
      marketing: {
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
      },
    };

    const response = await axios.post(
      "https://openapi.keycrm.app/v1/order",
      requestData,
      {
        headers: {
          Authorization: "Bearer " + process.env.API_KEY,
        },
      }
    );

    console.log(response);
    res.json(response.data);
  } catch (error) {
    console.error("Error making API request:", error.message);
    res.status(500).json({ error: "Failed to make API request." });
  }
});

app.post("/generate-pdf", (req, res) => {
  const { name, surname, phone, logistics_details, total_sum, products } =
    req.body;
  let pdfPath = `src/pdf_template.html`;
  const html = fs.readFileSync(pdfPath, "utf8");

  var processedHtml = html
    .replace("client_name", name + " " + surname)
    .replace("client_phone", phone)
    .replace("model_number", global.counter)
    .replaceAll("model_created_at", formatCurrentDate())
    .replaceAll("model_total_sum", total_sum)
    .replace("model_total_length", products.length);

  let rowsHtml = "";
  products.forEach((product, index) => {
    const rowHtml = `
        <tr>
            <td class="text-center">${index + 1}</td>
            <td class="text-center">_</td>
            <td style="width:50%">${product.product_name}</td>
            <td class="text-center">шт</td>
            <td class="text-center">${product.product_quantity}</td>
            <td class="text-center">${product.price} UAH</td>
            <td class="text-center">${
              product.price * product.product_quantity
            } UAH</td>
        </tr>
    `;
    rowsHtml += rowHtml;
  });

  const startIndex = processedHtml.indexOf("<!-- t_s -->");
  const endIndex = processedHtml.indexOf("<!-- t_e -->");

  processedHtml =
    processedHtml.slice(0, startIndex + 12) +
    rowsHtml +
    processedHtml.slice(endIndex);

  pdf.create(processedHtml).toStream((err, stream) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    res.setHeader("Content-Type", "application/pdf");
    stream.pipe(res);
  });
});

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/order", (_req, res) => {
  res.sendFile(__dirname + "/public/bucket.html");
});

app.listen(3000, () => {
  console.log("Server is running");
});

function formatCurrentDate() {
  const months = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
  ];

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return `${day} ${month} ${year} р.`;
}
