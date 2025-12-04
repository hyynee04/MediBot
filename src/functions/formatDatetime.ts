export const convertUTCToLocal = (utcString: string) => {
  if (!utcString) return null;

  const date = new Date(utcString); // datetime ở UTC+0
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Lấy date riêng
  const datePart = date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone,
  });

  // Lấy time riêng
  const timePart = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone,
  });

  return `${datePart} ${timePart}`;
}
