import type { BaseFormState } from "../types/authenTypes";

export const MIN_PASSWORD_LEN = 8;

export const validateField = (name: string, value: string, formData: BaseFormState): string => {
  let msg = "";
  const val = value ? value.trim() : ""; // Trim để tránh lỗi khoảng trắng đầu đuôi

  switch (name) {
    case "name":
      if (!val) msg = "Thiếu Tên hiển thị";
      break;

    case "mail":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!val) msg = "Thiếu Email";
      else if (!emailRegex.test(val)) msg = "Email không hợp lệ";
      break;

    case "username":
      if (!val) msg = "Thiếu Tên đăng nhập";
      // Lưu ý: Sửa lỗi logic cũ (dùng val thay vì form[name])
      else if (/\s/.test(val)) msg = "Tên đăng nhập không được có khoảng trống";
      break;

    case "password":
      if (!val) msg = "Missing password";
      else if (val.length < MIN_PASSWORD_LEN) msg = `Mật khẩu phải chứa ít nhất ${MIN_PASSWORD_LEN} kí tự`;
      break;

    case "confirmPassword":
      if (!val) msg = "Thiếu Xác nhận mật khẩu";
      else if (val !== formData.password) msg = "Xác nhận mật khẩu không trùng khớp";
      break;

    default:
      break;
  }
  return msg;
};

/**
 * Hàm lấy lỗi đầu tiên tìm thấy trong object errors
 */
export const getFirstError = (errors: Record<string, string>): string => {
  const firstKey = Object.keys(errors).find((key) => errors[key]);
  return firstKey ? errors[firstKey] : "";
};