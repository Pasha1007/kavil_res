var pdfBlobUrl = "";

function calculateTotalSum() {
  let totalSum = 0;
  $(".line_total_sum").each(function () {
    const val = parseFloat($(this).text());
    if (!isNaN(val)) {
      totalSum += val;
    }
  });
  return totalSum;
}

function getProducts() {
  const tableLines = document.querySelectorAll(".table_line");
  const data = [];

  tableLines.forEach((tableLine) => {
    const cols = tableLine.querySelectorAll(
      ".col-3, .col-2, .col-md-3, .col-4"
    );

    const count = Number(cols[2].querySelector(".count").textContent);

    if (count > 0) {
      const name = cols[0].textContent.trim();
      const price = Number(cols[1].querySelector(".price").textContent);
      const measure = cols[2].querySelector(".measure").textContent;
      const rowData = {
        product_quantity: count,
        price: price,
        product_name: name,
        measure: measure,
      };

      data.push(rowData);
    }
  });

  console.log(data);
  return data;
}

$(".white-arrow").click(function () {
  var currentObject = $(this);
  var parentDiv = currentObject.closest(".table_line");
  var totalPrice = $("#total_sum");

  var productCount = currentObject.siblings(".count");
  var priceSpan = parentDiv.find(".price");
  var totalLine = parentDiv.find(".line_total_sum");

  if (currentObject.hasClass("add")) {
    let priceCountNewValue = parseInt(productCount.text()) + 1;
    productCount.text(priceCountNewValue);

    let totalLineNewValue = parseInt(priceSpan.text()) * priceCountNewValue;
    totalLine.text(totalLineNewValue);

    totalPrice.text(calculateTotalSum());
  } else {
    let priceCountNewValue = parseInt(productCount.text()) - 1;
    if (priceCountNewValue >= 0) {
      productCount.text(priceCountNewValue);

      let totalLineNewValue = parseInt(priceSpan.text()) * priceCountNewValue;
      if (totalLineNewValue == 0) {
        totalLine.text("");
      } else {
        totalLine.text(totalLineNewValue);
      }

      let totalSum = calculateTotalSum();
      totalPrice.text(totalSum);
    }
  }
});

async function retrievePdf(name, surname, phone, logistics_details) {
  console.log(calculateTotalSum());
  console.log("asdasdas");
  const data = {
    name,
    surname,
    phone,
    logistics_details,
    total_sum: calculateTotalSum(),
    products: getProducts(),
  };

  try {
    const response = await fetch("/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const blob = await response.blob();
    const pdfBlobUrl = URL.createObjectURL(blob);

    handlePdfDisplayAndDownload(pdfBlobUrl);

    setTimeout(function () {
      URL.revokeObjectURL(pdfBlobUrl);
    }, 5 * 60 * 1000);
  } catch (error) {
    console.error("Error:", error);
  }
}

function handlePdfDisplayAndDownload(pdfBlobUrl) {
  $("#load_order").click(function () {
    $("#pdfLoader").attr("href", pdfBlobUrl);
    $("#pdfLoader").attr("download", "Check.pdf");
    $("#pdfLoader")[0].click();
  });

  $("#pdf_container").empty();
  $("<object>")
    .attr({
      data: pdfBlobUrl,
      type: "application/pdf",
      width: "100%",
      height: "400px",
      text: "Якщо тут не зявився pdf, то найбільш ймовірно що ваш браузер не підтримує показ у \
        такому форматі, тому прошу скористатися кнопкою вище та загрузити чек",
    })
    .appendTo("#pdf_container");

  $("#pdf_message").text(
    "Будь ласка завантажте протягом 5 хвилин чек. Після 5 хвилин чек буде втрачено."
  );
}

async function makeApiRequest() {}

$("#create_order").click(function () {
  if (calculateTotalSum() == 0) {
    $("#error_message").text(
      "Корзина повністю пуста"
    );
    return;
  }

  $("#error_message").text(" ");

  const phoneRegex =
    /^([+]?[\s0-9]+)?(\(\d{2,}\)|[(]?[0-9]+[)])?([-]?[\s]?[0-9]+[-]?\s?)+$/;

  var name = $("#name_field").val();
  var surname = $("#surname_field").val();
  var phone = $("#phone_field").val();
  var logistics_details = $("#address_field").val();

  if (
    !name ||
    !surname ||
    !phone ||
    !logistics_details ||
    name.trim() === "" ||
    surname.trim() === "" ||
    phone.trim() === "" ||
    logistics_details.trim() === "" ||
    !phone.match(phoneRegex) ||
    phone.length < 7
  ) {
    $("#error_message").text(
      "Будь ласка перегляньте правильність написання номера телефону та чи всі поля заповнені"
    );
    return;
  }
  $("#error_message").text(" ");

  retrievePdf(name, surname, phone, logistics_details);
  // send api request to backend and retrive pdf
  makeApiRequest();
});
