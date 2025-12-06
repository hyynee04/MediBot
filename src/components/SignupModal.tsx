import { AnimatePresence, motion } from "framer-motion"
import InputCustom from "./InputCustom"
import { useEffect, useState } from "react"
import { validateField } from "../functions/Validation";
import type { BaseFormState, SignUpRequest } from "../types/authenTypes";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../stores/store";
import { clearAuthError, signup } from "../stores/authenSlice";
import { useNavigate } from "react-router-dom";
import { paths } from "../routes/paths";
import { LuEye, LuEyeOff } from "react-icons/lu";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

interface FormState extends BaseFormState, SignUpRequest {
  confirmPassword: string;
};

type ErrorState = Partial<Record<keyof FormState, string>>;

const SignUpModal = ({ isOpen, onClose, onOpenLogin }: SignUpModalProps) => {
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error: authError } = useSelector((state: RootState) => state.authen);

  const [form, setForm] = useState<FormState>({
    name: "",
    mail: "",
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<ErrorState>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- HANDLERS ---
  const handleChange = (name: keyof FormState, value: any) => {
    const nextForm = { ...form, [name]: value };
    setForm(nextForm);

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    dispatch(clearAuthError());

    // Nếu đang sửa password, ta nên xóa luôn lỗi của verifiedPassword (nếu có)
    if (name === "password") {
      setErrors((prev) => ({ ...prev, verifiedPassword: "" }));
    }
  };

  const getFormError = () => {
    if (authError) return authError;

    const errorKeys = Object.keys(errors) as Array<keyof FormState>;
    const firstActiveErrorKey = errorKeys.find(key => errors[key]);
    return firstActiveErrorKey ? errors[firstActiveErrorKey] : "";
  };

  const handleSignup = async () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    (Object.keys(form) as Array<keyof FormState>).forEach((key) => {
      const errorMsg = validateField(key as string, form[key], form);

      if (errorMsg) {
        newErrors[key] = errorMsg;
        isValid = false;
      }
    });
    setErrors(newErrors);
    if (!isValid) return;

    try {
      // unwrap() giúp trả về kết quả raw hoặc throw error nếu rejected
      await dispatch(signup(form)).unwrap();

      onClose(); // Đóng modal
      navigate(paths.login); // Chuyển trang
    } catch (err) {
      // Nếu thất bại: Redux state đã cập nhật 'error', UI sẽ tự render lại message lỗi
      console.error("Login failed:", err);
    }
  }

  const handleGotoLogin = () => {
    onClose();
    onOpenLogin();
  }

  useEffect(() => {
    if (!isOpen) {
      setForm({
        name: "",
        mail: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
      dispatch(clearAuthError());
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay xám mờ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose} // Bấm vào overlay để đóng modal
          />
          <motion.form
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: 50 }}
            className="relative w-full max-w-[400px] bg-primary-white rounded-3xl p-12 flex flex-col items-center justify-center gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup();
            }}
          >
            <p className=" text-primary-black text-xl font-bold">Đăng ký</p>
            <InputCustom
              type="text"
              placeholder="Tên hiển thị"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              disabled={loading}
            />
            <InputCustom
              type="text"
              placeholder="Email"
              value={form.mail}
              onChange={(e) => handleChange("mail", e.target.value)}
              disabled={loading}
            />
            <InputCustom
              type="text"
              placeholder="Tên đăng nhập"
              value={form.username}
              onChange={(e) => handleChange("username", e.target.value)}
              disabled={loading}
            />
            <div className="relative w-full">
              <InputCustom
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                disabled={loading}
              />
              <button
                disabled={loading}
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex p-2 text-primary-grey rounded-lg cursor-pointer transition-all duration-200 
                      hover:text-primary-black hover:bg-stroke-grey "
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
              </button>
            </div>
            <div className="relative w-full">
              <InputCustom
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Xác nhận mật khẩu"
                value={form.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                disabled={loading}
              />
              <button
                disabled={loading}
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex p-2 text-primary-grey rounded-lg cursor-pointer transition-all duration-200 
                      hover:text-primary-black hover:bg-stroke-grey "
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirmPassword(!showConfirmPassword);
                }}
              >
                {showConfirmPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
              </button>
            </div>
            <p className="w-full align-baseline text-primary-red">{getFormError()}</p>
            <button
              disabled={loading}
              type="submit"
              className="text-sm font-bold text-primary-white align-middle rounded-full 
                        bg-linear-to-b from-primary-purple to-second-purple w-full p-4
                        transform transition-all duration-300 hover:scale-105 cursor-pointer">
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </button>
            <p className="text-primary-grey">Đã có tài khoản? <a onClick={() => handleGotoLogin()} className=" transform transition-all duration-300 font-bold hover:underline cursor-pointer">Đăng nhập.</a></p>
          </motion.form>
        </div>
      )}
    </AnimatePresence>
  )
}
export default SignUpModal