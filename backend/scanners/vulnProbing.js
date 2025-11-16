import axios from "axios";

export async function testXSS(url) {
  const payload = "<script>alert(1)</script>";
  const testUrl = `${url}?q=${encodeURIComponent(payload)}`;
  try {
    const res = await axios.get(testUrl);
    if (res.data.includes(payload)) {
      return { vuln: "XSS", details: "Unfiltered payload" };
    }
    return null;
  } catch {
    return null;
  }
}
