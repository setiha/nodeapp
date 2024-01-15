export const responseSuccess = (res, data, statusCode = 200) => {
  res.status(statusCode);
  res.json({
    data,
  });
};

export const responseError = (res, message, error = {}, statusCode = 400) => {
  res.status(statusCode);
  res.json({
    message,
    error,
  });
};
