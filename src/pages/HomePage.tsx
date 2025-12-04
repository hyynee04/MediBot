import React, { useState } from 'react';
import { LuCircleCheck, LuBotMessageSquare, LuZap } from "react-icons/lu";
import MediImg from "../assets/medi_img.png"
import FeatureCard from '../components/FeatureCard';
import LoginModal from '../components/LoginModal';
import SignUpModal from '../components/SignupModal';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { paths } from '../routes/paths';

const HomePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginModalOpen = location.pathname === paths.login;
  const isSignupModalOpen = location.pathname === paths.signup;

  const handleClose = () => {
    navigate("/");
  };

  const handleSwitchToSignup = () => navigate("/signup");
  const handleSwitchToLogin = () => navigate("/login");
  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-white">
        <header className="sticky top-0 z-10 bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {/* Logo/Icon */}

              <span className="text-xl font-bold text-gray-800">MediBot</span>
            </div>
            {/* Nút Đăng nhập/Đăng ký */}
            <button
              onClick={() => navigate(paths.signup)}
              className="px-4 py-2 text-sm font-medium rounded-full border border-stroke-grey hover:bg-background-white transition duration-150 cursor-pointer"
            >
              Đăng ký ngay
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1 text-center md:text-left">
              <h1 className="text-5xl lg:text-6xl font-extrabold text-primary-black tracking-tight mb-4">
                Hỏi Đáp Y Tế <br />
                <span className='text-primary-purple'>Nhanh & Đáng Tin Cậy</span>
              </h1>
              <p className="text-xl text-primary-grey mb-8 leading-relaxed">
                Nhận thông tin sức khỏe chính xác từ Chatbot được đào tạo trên <b>nguồn dữ liệu uy tín</b> của <b>Nhà thuốc Long Châu.</b>
              </p>
              <button
                className="text-md font-bold text-primary-white align-middle rounded-full shadow-xl
                                            bg-linear-to-b from-primary-purple to-second-purple w-fit py-4 px-10
                                            transform transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => navigate(paths.login)}
              >
                Bắt Đầu
              </button>
            </div>

            <div className="order-1 md:order-2">
              <img
                src={MediImg}
                alt="Chatbot y tế trên điện thoại"
                className="w-full h-auto max-w-lg mx-auto"
              />
            </div>
          </motion.div>
        </main>

        {/* ƯU ĐIỂM */}
        <section className="py-20 bg-background-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <h2 className="text-4xl font-bold text-center text-primary-black mb-12">
              Cơ sở dữ liệu và Giá trị cốt lõi
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              <FeatureCard
                title="Nguồn Dữ Liệu Chất Lượng"
                description="Nội dung cốt lõi được tổng hợp từ nguồn y tế đáng tin cậy (Long Châu) và được kiểm duyệt bởi đội ngũ chuyên môn."
                icon={<LuCircleCheck size={24} />}
              />
              <FeatureCard
                title="Thông Tin Khách Quan"
                description="Chatbot cung cấp thông tin tham khảo nhanh, không nhằm mục đích chẩn đoán hay thay thế lời khuyên của bác sĩ."
                icon={<LuBotMessageSquare size={24} />}
              />
              <FeatureCard
                title="Dự Án Đang Phát Triển"
                description="Dữ liệu hiện tại còn hạn chế, hệ thống vẫn đang trong quá trình cập nhật và bổ sung kiến thức chuyên sâu liên tục."
                icon={<LuZap size={24} />}
              />
            </div>
          </motion.div>
        </section>

        <footer className="bg-primary-black text-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="mt-2 text-xs text-primary-grey">
              Thông tin trên trang này không thay thế lời khuyên y tế chuyên nghiệp.
            </p>
          </div>
        </footer>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={handleClose}
          onOpenSignup={handleSwitchToSignup}
        />
        <SignUpModal
          isOpen={isSignupModalOpen}
          onClose={handleClose}
          onOpenLogin={handleSwitchToLogin}
        />
      </div>
    </>
  );
};

export default HomePage;