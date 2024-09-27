import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const fetchUserById = async (id) => {
  const response = await fetch(`https://dummyjson.com/users/${id}`);
  if (!response.ok) {
    console.error("Ağ hatası");
    return null; // Hata durumunda null döndür
  }
  return response.json();
};

const EditPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    username: "",
    password: "",
    birthDate: "",
    bloodGroup: "",
    height: "",
    weight: "",
    eyeColor: "",
    hairColor: "",
    hairType: "",
    university: "",
    address: "",
    city: "",
    state: "",
    stateCode: "",
    postalCode: "",
    country: "",
    email: "",
    phone: "",
    coin: "",
    wallet: "",
    network: "",
    department: "",
    name: "",
    title: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const fetchedUser = await fetchUserById(id);
      setUser(fetchedUser);
    };

    getUser();
  }, [id]);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`https://dummyjson.com/users/${id}`);
      const data = await response.json();
      if (data) {
        setUser(data);
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          age: data.age || "",
          gender: data.gender || "",
          username: data.username || "",
          password: data.password, // Parola güvenlik sebebiyle boş bırakılabilir
          birthDate: data.birthDate ? formatDate(data.birthDate) : "", // YYYY-MM-DD formatını GG.AA.YYYY olarak kullanabilmek için
          bloodGroup: data.bloodGroup || "",
          height: data.height || "",
          weight: data.weight || "",
          eyeColor: data.eyeColor || "",
          hairColor: data.hair.color || "",
          hairType: data.hair.type || "",
          university: data.university || "",
          address: data.address.address || "",
          city: data.address.city || "",
          state: data.address.state || "",
          stateCode: data.address.stateCode || "",
          postalCode: data.address.postalCode || "",
          country: data.address.country || "",
          email: data.email || "",
          phone: data.phone || "",
          coin: data.crypto.coin || "",
          wallet: data.crypto.wallet || "",
          network: data.crypto.network || "",
          department: data.company.department || "",
          name: data.company.name || "",
          title: data.company.title || "",
        });
      }
    };

    // YYYY-MM-DD formatını GG.AA.YYYY olarak kullanabilmek için
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Ayı iki haneli hale getirir
      const day = String(date.getDate()).padStart(2, "0"); // Günü iki haneli hale getirir
      return `${year}-${month}-${day}`; // YYYY-MM-DD formatı
    };

    fetchUserData();
  }, [id]);

  if (!user) {
    return <p>Kullanıcı bilgileri yükleniyor veya mevcut değil.</p>; // Hata mesajı
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="p-5">
      <h1 className="text-xl pb-2 border-b-2 border-gray-600">
        {user.firstName} {user.lastName}
      </h1>
      <div>
        <h2 className="text-lg pt-5 pb-2 border-b-2 border-gray-400">
          Personal
        </h2>
        <div className="w-full lg:grid grid-cols-7 gap-5 py-3">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Seçiniz</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="birthDate"
              className="block text-sm font-medium text-gray-700"
            >
              Birth Date
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>
        <div className="w-full lg:grid grid-cols-7 gap-5">
          <div>
            <label
              htmlFor="bloodGroup"
              className="block text-sm font-medium text-gray-700"
            >
              Blood Group
            </label>
            <input
              type="text"
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="height"
              className="block text-sm font-medium text-gray-700"
            >
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700"
            >
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="eyeColor"
              className="block text-sm font-medium text-gray-700"
            >
              Eye Color
            </label>
            <input
              type="text"
              id="eyeColor"
              name="eyeColor"
              value={formData.eyeColor}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="hairColor"
              className="block text-sm font-medium text-gray-700"
            >
              Hair Color
            </label>
            <input
              type="text"
              id="hairColor"
              name="hairColor"
              value={formData.hairColor}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="hairType"
              className="block text-sm font-medium text-gray-700"
            >
              Hair Type
            </label>
            <input
              type="text"
              id="hairType"
              name="hairType"
              value={formData.hairType}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="university"
              className="block text-sm font-medium text-gray-700"
            >
              University
            </label>
            <input
              type="text"
              id="university"
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>
        <div className="lg:grid grid-cols-4 gap-6 my-4">
          <div>
            <h2 className="text-lg pt-5 pb-2 border-b-2 border-gray-400">
              Address
            </h2>
            <div className="py-3">
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div className="my-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div className="my-2">
                <label
                  htmlFor="stateCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  State Code
                </label>
                <input
                  type="text"
                  id="stateCode"
                  name="stateCode"
                  value={formData.stateCode}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div className="mt-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg pt-5 pb-2 border-b-2 border-gray-400">
              Contact Information
            </h2>
            <div className="py-3">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div className="my-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg pt-5 pb-2 border-b-2 border-gray-400">
              Crypto
            </h2>
            <div className="py-3">
              <div>
                <label
                  htmlFor="coin"
                  className="block text-sm font-medium text-gray-700"
                >
                  Coin
                </label>
                <input
                  type="text"
                  id="coin"
                  name="coin"
                  value={formData.coin}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div className="mt-2">
                <label
                  htmlFor="wallet"
                  className="block text-sm font-medium text-gray-700"
                >
                  Wallet
                </label>
                <input
                  type="text"
                  id="wallet"
                  name="wallet"
                  value={formData.wallet}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="network"
                  className="block text-sm font-medium text-gray-700"
                >
                  Network
                </label>
                <input
                  type="text"
                  id="network"
                  name="network"
                  value={formData.network}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg pt-5 pb-2 border-b-2 border-gray-400">
              Company
            </h2>
            <div className="py-3">
              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div className="mt-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-end">
          <button className="px-7 mr-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
            <FontAwesomeIcon icon={faTrashCan} />
            <span className="ml-2">Delete</span>
          </button>
          <button className="px-7 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            <FontAwesomeIcon icon={faFloppyDisk} />
            <span className="ml-2">Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
