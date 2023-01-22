# cravus

Project to manage inventory and orders from Cravus

Utils:

    const options = {
      method: "PUT",
      url: `${process.env.REACT_APP_BASE_URL}/api/users/addstock`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenApi")}`,
        "Content-Type": "application/json",
      },
      data: { stock: newStock },
    };
    await axios
      .request(options)
