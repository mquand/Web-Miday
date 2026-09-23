import '../styles/globals.css';
import 'swiper/css';
import 'aos/dist/aos.css';

export const metadata = {
  title: "Chúng Mình • Kỷ Niệm Tình Yêu",
  description: "Trang web lưu trữ kỷ niệm, câu chuyện tình yêu và những khoảnh khắc đáng nhớ của chúng mình.",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased text-gray-800 bg-[#FCFCFD] selection:bg-pink-100 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
