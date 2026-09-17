export default async function handler(req, res) {
  const phone = req.query.phone || req.body?.phone;

  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Phone parameter is required"
    });
  }

  try {
    const response = await fetch("https://api.redx.com.bd/v1/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: phone,
        service: "redx",
        phoneNumber: phone
      })
    });

    const data = await response.text();

    res.status(response.status).send(data);

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
