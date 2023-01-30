import React, { useEffect, useState } from "react";

import Header from "../components/Header";

import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import urls from "../api/urls";

const BookDetail = () => {
  const params = useParams();
  const [myBook, setMyBook] = useState(null);
  const [bookCategory, setBookCategory] = useState(null);
  useEffect(() => {
    /* http://localhost:3004/books/2 */
    api
      .get(`${urls.books}/${params.bookId}`)
      .then((resBook) => {
        console.log(resBook.data);
        setMyBook(resBook.data);
        api
          .get(`${urls.categories}/${resBook.data.categoryId}`)
          .then((resCategory) => {
            console.log(resCategory.data);
            setBookCategory(resCategory.data);
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  }, []);
  if (myBook === null || bookCategory === null) return null;
  return (
    <div>
      <Header />
      <div className="container my-5">
        <table class="table">
          <tbody>
            <tr>
              <th scope="row">Adı Soyadı</th>
              <td>{myBook.name + " " + myBook.author}</td>
            </tr>
            <tr>
              <th scope="row">Telefon Numarası</th>
              <td>{myBook.isbn}</td>
            </tr>
            <tr>
              <th scope="row">Grup</th>
              <td>{bookCategory.name}</td>
            </tr>
          </tbody>
        </table>

        <Link className="btn btn-warning" to={"/"}>
          Geri
        </Link>
      </div>
    </div>
  );
};

export default BookDetail;
