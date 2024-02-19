import axios from "axios";

const fetchAsync = () => {
  const result = axios.get("https://koreanjson.com/posts/1");
  console.log("비동기 방식: ", result);
};

const fetchSync = async () => {
  const result = await axios.get("https://koreanjson.com/posts/1");
  console.log("동기 방식: ", result);
  console.log("동기 방식: ", result.data.title);
};

fetchAsync();
fetchSync();
