export default async function handler(req, res) {
  const phone = req.query.phone || req.body?.phone;

  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Phone parameter is required"
    });
  }

  const csrf = "9d9d08e6e5";
  const url = "https://www.khaasfood.com/wp-admin/admin-ajax.php";

  try {
    // STEP 1
    const data1 = new URLSearchParams({
      mobileNo: phone,
      countrycode: "+880",
      csrf: csrf,
      login: "1",
      json: "1",
      action: "digits_check_mob"
    });

    const response1 = await fetch(url, {
      method: "POST",
      headers: {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "origin": "https://www.khaasfood.com",
        "referer": "https://www.khaasfood.com/",
        "x-requested-with": "XMLHttpRequest",
        "user-agent": "Mozilla/5.0"
      },
      body: data1.toString()
    });

    const text1 = await response1.text();

    // STEP 2
    const data2 = new URLSearchParams({
      mobileNo: phone,
      digits_reg_mail: phone,
      dig_nounce: csrf,
      action: "digits_check_mob",
      login: "2",
      countrycode: "+880",
      digregcode: "+880",
      digregcode2: "+880",
      digits: "1",
      dtype: "2",
      json: "1",
      csrf: csrf
    });

    const response2 = await fetch(url, {
      method: "POST",
      headers: {
        "accept": "*/*",
        "origin": "https://www.khaasfood.com",
        "referer": "https://www.khaasfood.com/",
        "x-requested-with": "XMLHttpRequest",
        "user-agent": "Mozilla/5.0"
      },
      body: data2.toString()
    });

    const text2 = await response2.text();

    return res.status(200).json({
      phone,
      step1: {
        status: response1.status,
        response: text1
      },
      step2: {
        status: response2.status,
        response: text2
      }
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
