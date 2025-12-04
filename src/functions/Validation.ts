import type { BaseFormState } from "../types/authenTypes";

export const MIN_PASSWORD_LEN = 8;

export const validateField = (name: string, value: string, formData: BaseFormState): string => {
  let msg = "";
  const val = value ? value.trim() : ""; // Trim để tránh lỗi khoảng trắng đầu đuôi

  switch (name) {
    case "name":
      if (!val) msg = "Missing name";
      break;

    case "mail":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!val) msg = "Missing email";
      else if (!emailRegex.test(val)) msg = "Email is not valid";
      break;

    case "username":
      if (!val) msg = "Missing username";
      // Lưu ý: Sửa lỗi logic cũ (dùng val thay vì form[name])
      else if (/\s/.test(val)) msg = "Username must not have space";
      break;

    case "password":
      if (!val) msg = "Missing password";
      else if (val.length < MIN_PASSWORD_LEN) msg = `Password must have at least ${MIN_PASSWORD_LEN} characters`;
      break;

    case "confirmPassword":
      if (!val) msg = "Missing confirm password";
      else if (val !== formData.password) msg = "Confirm password is not right";
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