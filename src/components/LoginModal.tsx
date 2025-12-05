import { AnimatePresence, motion } from "framer-motion"
import InputCustom from "./InputCustom"
import { useNavigate } from "react-router-dom"
import { paths } from "../routes/paths"
import { useEffect, useState } from "react"
import { validateField } from "../functions/Validation"
import type { BaseFormState, LoginRequest } from "../types/authenTypes"
import type { AppDispatch, RootState } from "../stores/store"
import { useDispatch, useSelector } from "react-redux"
import { clearAuthError, login } from "../stores/authenSlice"
import { LuEye, LuEyeOff } from "react-icons/lu"

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignup: () => void;
}

interface FormState extends BaseFormState, LoginRequest {
  username: string;
  password: string;
};

type ErrorState = Partial<Record<keyof FormState, string>>;


const LoginModal = ({ isOpen, onClose, onOpenSignup }: LoginModalProps) => {
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error: authError } = useSelector((state: RootState) => state.authen);

  const [form, setForm] = useState<FormState>({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState<ErrorState>({});
  const [showPassword, setShowPassword] = useState(false);

  // --- HANDLERS ---
  const handleChange = (name: keyof FormState, value: any) => {
    const nextForm = { ...form, [name]: value };
    setForm(nextForm);

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const getFormError = () => {
    if (authError) return authError;

    const errorKeys = Object.keys(errors) as Array<keyof FormState>;
    const firstActiveErrorKey = errorKeys.find(key => errors[key]);
    return firstActiveErrorKey ? errors[firstActiveErrorKey] : "";
  };

  const handleLogin = async () => {
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
      await dispatch(login(form)).unwrap();

      onClose(); // Đóng modal
      navigate(paths.chatbot); // Chuyển trang
    } catch (err) {
      // Nếu thất bại: Redux state đã cập nhật 'error', UI sẽ tự render lại message lỗi
      console.error("Login failed:", err);
    }
  }

  const handleGotoSignup = () => {
    onClose();
    onOpenSignup();
  }

  useEffect(() => {
    if (!isOpen) {
      setForm({
        username: "",
        password: "",
      })
      setErrors({});
      // Reset lỗi của Redux store để lần sau mở lên không hiện lỗi cũ
      dispatch(clearAuthError());
    }
  }, [isOpen, dispatch]);

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
              handleLogin();
            }}
          >
            <p className=" text-primary-black text-xl font-bold">Đăng nhập</p>
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
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex p-2 text-primary-grey rounded-lg cursor-pointer transition-all duration-200 
                      hover:text-primary-black hover:bg-stroke-grey "
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(!showPassword);
                }}
                disabled={loading}
              >
                {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
              </button>
            </div>
            <p className="w-full align-baseline text-primary-red">{getFormError()}</p>
            <button
              type="submit"
              className="text-sm font-bold text-primary-white align-middle rounded-full 
                        bg-linear-to-b from-primary-purple to-second-purple w-full p-4
                        transform transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              {loading ? "Đang xử lý..." : "Đăng Nhập"}
            </button>
            <p className="text-primary-grey">Chưa có tài khoản? <a onClick={() => handleGotoSignup()} className=" transform transition-all duration-300 font-bold hover:underline cursor-pointer">Đăng ký ngay.</a></p>
          </motion.form>
        </div>
      )}
    </AnimatePresence>
  )
}
export default LoginModal