// ListingPage.js

import React, { useState, useEffect } from "react";
import { getUsers, getUserOrders } from "../services/api"; // getUserOrders'ı ekleyin
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const ListingPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortKey, setSortKey] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Kullanıcıları al
    getUsers().then((response) => {
      setUsers(response.data.users);
      if (response.data.users.length > 0) {
        setSelectedUser(response.data.users[0]);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      getUserOrders(selectedUser.id).then((response) => {
        setOrders(response.data.orders);
      });
    }
  }, [selectedUser]);

  // Mevcut sayfada gösterilecek kullanıcıları hesaplama
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Sayfa numarası değiştirme işlemi
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Tablo verilerini sıralama işlemi
  const requestSort = (key) => {
    const direction =
      sortKey === key && sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(direction);
    setSortKey(key);

    const sortedUsers = [...users].sort((a, b) => {
      if (direction === "asc") {
        return a[key].localeCompare(b[key]);
      } else {
        return b[key].localeCompare(a[key]);
      }
    });

    setUsers(sortedUsers);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Kullanıcı Tablosu */}
      <h2 className="text-lg font-semibold mb-4">
        <FontAwesomeIcon icon={faUser} /> User List
      </h2>
      <div className="grid grid-cols-12 gap-4 bg-white border border-gray-200 p-4">
        <div
          className="font-semibold cursor-pointer col-span-4"
          onClick={() => requestSort("firstName")}
        >
          User
          <svg
            className="w-3 h-3 inline ml-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
          </svg>
        </div>
        <div
          className="font-semibold cursor-pointer col-span-3"
          onClick={() => requestSort("phone")}
        >
          Phone
          <svg
            className="w-3 h-3 inline ml-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
          </svg>
        </div>
        <div
          className="font-semibold cursor-pointer col-span-4"
          onClick={() => requestSort("email")}
        >
          Email
          <svg
            className="w-3 h-3 inline ml-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
          </svg>
        </div>
        <div className="font-semibold col-span-1">Action</div>
      </div>
      <div className="border-t border-gray-200">
        {currentUsers.map((user) => (
          <div
            key={user.id}
            className={`grid grid-cols-12 gap-4 py-2 hover:bg-gray-100 border-b ${
              selectedUser && selectedUser.id === user.id ? "bg-gray-200" : ""
            }`}
            onClick={() => handleUserSelect(user)}
          >
            <div className="flex items-center col-span-4">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>
                {user.firstName} {user.lastName}
              </span>
            </div>
            <div className="col-span-3">{user.phone}</div>
            <div className="col-span-4">{user.email}</div>
            <div className="col-span-1">
              <Link
                to={`/edit/${user.id}`}
                className="text-blue-500 hover:underline"
              >
                <FontAwesomeIcon icon={faPen} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Sayfalama Navigasyonu */}
      <nav
        className="flex items-center flex-col md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {indexOfFirstUser + 1}-{indexOfLastUser}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {users.length}
          </span>{" "}
          items
        </span>
        <ul className="inline-flex -space-x-px text-sm h-8">
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>
          {Array.from(
            { length: Math.ceil(users.length / usersPerPage) },
            (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    currentPage === index + 1
                      ? "text-blue-600 border border-gray-300 bg-blue-50"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(users.length / usersPerPage)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* Siparişler Tablosu */}
      <h2 className="text-lg font-semibold mt-8 mb-4">
        <FontAwesomeIcon icon={faCartShopping} /> Orders for{" "}
        {selectedUser
          ? `${selectedUser.firstName} ${selectedUser.lastName}`
          : "Select a User"}
      </h2>
      <div className="grid grid-cols-12 gap-4 bg-white border border-gray-200 p-4">
        <div className="font-semibold col-span-4">Title</div>
        <div className="font-semibold col-span-1">Price</div>
        <div className="font-semibold col-span-2">Quantity</div>
        <div className="font-semibold col-span-1">Total</div>
        <div className="font-semibold col-span-2">Discount</div>
        <div className="font-semibold col-span-2">Discounted Total</div>
      </div>
      <div className="border-t border-gray-200">
        {Array.isArray(orders) && orders.length > 0 ? ( // orders dizisinin bir dizi olup olmadığını ve uzunluğunu kontrol et
          orders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-12 gap-4 py-2 border-b"
            >
              <div className="col-span-4">{order.title}</div>
              <div className="col-span-1">{order.price}</div>
              <div className="col-span-2">{order.quantity}</div>
              <div className="col-span-1">{order.total}</div>
              <div className="col-span-2">{order.discountPercantage}</div>
              <div className="col-span-2">{order.discountedTotal}</div>
            </div>
          ))
        ) : (
          <div className="col-span-12 text-center">No orders available</div> // Eğer dizi boşsa gösterilecek mesaj
        )}
      </div>
    </div>
  );
};

export default ListingPage;
