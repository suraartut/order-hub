import React, { useState } from "react";
import { login } from "../services/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState(""); // Kullanıcı adı
  const [password, setPassword] = useState(""); // ifre
  const [error, setError] = useState(null); // Hata  mesajı
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await login({ username, password });
      // Başarılı giriş durumunda token'ı cookie'ye 7 günlük kaydeder
      Cookies.set("authToken", response.data.token, { expires: 7 });
      // Listeleme sayfasına yönlendirme
      navigate("/listing");
    } catch (error) {
      setError(
        "Giriş başarısız. Lütfen kullanıcı adı ve şifrenizi kontrol edin." // Hata mesajı
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-teal-400 via-blue-500 to-gray-600">
      {/* Formun arka planı, boyutu ve gölgelendirmesi */}
      <div className="bg-white bg-opacity-45 p-8 rounded-lg shadow-lg max-w-md w-full lg:mx-0 mx-6">
        <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">
          Giriş Yap
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-medium text-blue-500">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Kullanıcı adınızı girin"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-blue-500">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Şifrenizi girin"
              required
            />
          </div>
          {/* Hata mesajı */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-2/3 mx-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
