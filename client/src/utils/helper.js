function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

function calcTime(date) {
  const time = date.split("T")[1].split(".");

  return time[0];
}

export { convertToBase64, calcTime };
