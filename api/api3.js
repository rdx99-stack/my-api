export default async function handler(req, res) {
  const phone = req.query.phone || req.body?.phone;

  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Phone parameter is required"
    });
  }

  const url =
    "https://api-dynamic.bioscopelive.com/v2/auth/login?country=BD&platform=web&language=en";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "accept-language": "en-US,en;q=0.9,ru;q=0.8,zh-TW;q=0.7,zh;q=0.6",
        "authorization": "",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "origin": "https://www.bioscopeplus.com",
        "pragma": "no-cache",
        "referer": "https://www.bioscopeplus.com/",
        "sec-ch-ua": '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36"
      },
      body: JSON.stringify({
        number: `+88${phone}`
      })
    });

    const data = await response.text();

    res.status(response.status).send(data);

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
