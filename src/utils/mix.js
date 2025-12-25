function generateTicketId(prefix = "TKT") {
  const date = new Date();
  const time = date.getTime().toString(36).toUpperCase(); // timestamp
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();

  return `${prefix}-${time}-${random}`;
}

export { generateTicketId };
