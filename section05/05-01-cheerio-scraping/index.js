import axios from "axios";
import cheerio from "cheerio";

const chatMessage = async () => {
  const url = "https://www.naver.com";

  const result = await axios.get(url);
  console.log(result);

  const $ = cheerio.load(result.data);
  $("meta").each((index, el) => {
    if ($(el).attr("property") && $(el).attr("property").includes("og:")) {
      const key = $(el).attr("property");
      const value = $(el).attr("content");
      console.log(key, value);
    }
  });
};

chatMessage();
