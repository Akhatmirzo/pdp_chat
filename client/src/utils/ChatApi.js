const API_URL = "http://localhost:8000/api/room/";

async function SendMessage(data, id) {
  try {
    const response = await fetch(`${API_URL}send/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });

    if (response.status !== 200) {
      console.log(response);
      throw new Error("Message not sent");
    }

    const res = await response.json();

    return res;
  } catch (error) {
    console.log(error);
  }
}
async function EditMessage(data, id) {
  try {
    const response = await fetch(`${API_URL}messages/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ message: data }),
    });

    if (response.status !== 200) {
      console.log(response);
      throw new Error("Message edit failed");
    }

    const res = await response.json();

    return res;
  } catch (error) {
    console.log(error);
  }
}

async function DeleteMessage(id) {
  try {
    const response = await fetch(`${API_URL}messages/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    if (response.status!== 200) {
      console.log(response);
      throw new Error("Message not deleted");
    }
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}

async function GetChatRooms() {
  try {
    const response = await fetch(`${API_URL}chatrooms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (response.status !== 200) {
      console.log(response);
      throw new Error("Chat not found");
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

export { GetChatRooms, SendMessage, EditMessage, DeleteMessage };
