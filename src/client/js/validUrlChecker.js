function isValidUrl(url) {
  const regex = new RegExp(
    /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,4}(:\d+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/
  );

  if (regex.test(url)) {
    return true;
  } else {
    return false;
  }
}

export { isValidUrl };
