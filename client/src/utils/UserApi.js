const API_URL = "http://localhost:8000/api/user/";

async function UserRegister(data) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        ...data,
      }),
    });

    if (response.status !== 201) {
      throw new Error("User registration failed");
    }

    const res = await response.json();

    return res;
  } catch (error) {
    console.log(error);
    return {
      ...error,
    };
  }
}

async function UserLogin(data) {
  try {
    const response = await fetch(`${API_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        ...data,
      }),
    });

    if (response.status !== 200) {
      throw new Error("User registration failed");
    }

    const res = await response.json();

    return res;
  } catch (error) {
    console.log(error);
    return {
      ...error,
    };
  }
}

async function GetUsers() {
  try {
    const response = await fetch(`${API_URL}sidebar`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (response.status !== 200) {
      console.log(response);
      throw new Error("User not found");
    }

    const res = await response.json();

    return res;
  } catch (error) {
    console.log(error);
    return {
      ...error,
    };
  }
}

async function GetUser(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (response.status !== 200) {
      console.log(response);
      throw new Error("User not found");
    }

    const res = await response.json();

    return res;
  } catch (error) {
    console.log(error);
    return {
      ...error,
    };
  }
}
async function SerachUsers(name) {
  try {
    const response = await fetch(`${API_URL}search?search=${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (response.status !== 200) {
      console.log(response);
      throw new Error("Search not found");
    }

    const res = await response.json();

    return res;
  } catch (error) {
    console.log(error);
    return {
      ...error,
    };
  }
}

export { UserRegister, UserLogin, GetUsers, GetUser, SerachUsers };
