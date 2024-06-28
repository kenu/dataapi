const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine to ejs
app.set("view engine", "ejs");

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Route handler for the main page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://apis.data.go.kr/1230000/BidPublicInfoService04/getBidPblancListEvaluationIndstrytyMfrcInfo01",
      {
        params: {
          serviceKey:
            "4MjolsmxrlqEv3hEBeSleWCFNguNi2rJoQBKD9xtry0x4uqqnpUcOJinPQt9Q0ASv/unl57K+Vb5QjHvjDLAuQ==",
          // "4MjolsmxrlqEv3hEBeSleWCFNguNi2rJoQBKD9xtry0x4uqqnpUcOJinPQt9Q0ASv%2Funl57K%2BVb5QjHvjDLAuQ%3D%3D",
          numOfRows: 640,
          pageNo: 1,
          type: "json",
          inqryDiv: 1,
          inqryBgnDt: "202406010000",
          inqryEndDt: "202406302359",
        },
        responseType: "json",
      }
    );

    // Render the template with the fetched data
    const data = response.data.response.body.items;
    data.forEach(item => item.presmptPrce = convertToStringWithCommas(item.presmptPrce));
    res.render("index", { data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});
function convertToStringWithCommas(numStr) {
  let formattedNumStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formattedNumStr;
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
