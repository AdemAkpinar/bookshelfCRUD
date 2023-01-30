import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";

import { Link } from "react-router-dom";

import CustomModal from "./CustomModal";

const ListBooks = () => {
  const dispatch = useDispatch();
  const { booksState, categoriesState } = useSelector((state) => state);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [willDeleteBook, setWillDeleteBook] = useState("");

  const deleteBook = (id) => {
    dispatch({ type: actionTypes.bookActions.DELETE_BOOK_START });
    api
      .delete(`${urls.books}/${id}`)
      .then((res) => {
        dispatch({
          type: actionTypes.bookActions.DELETE_BOOK_SUCCESS,
          payload: id,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.bookActions.DELETE_BOOK_FAIL,
          payload: "Kitap silerken hata oluştu",
        });
      });
  };

  return (
    <div className="my-5">
      <div className="d-flex justify-content-end">
        <Link to={"/add-book"} className="btn btn-warning">
          Kişi Ekle
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Sıra No</th>
            <th scope="col">Adı Soyadı</th>
            <th scope="col">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {booksState.books.map((book, index) => {
            const myCategory = categoriesState.categories.find(
              (item) => item.id === book.categoryId
            );
            return (
              <tr key={book.id}>
                <th scope="row">{index + 1}</th>
                <td>{book.name + " " + book.author}</td>
                <td>
                  <button
                    onClick={() => {
                      setShowDeleteModal(true);
                      setWillDeleteBook(book.id);
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    Sil
                  </button>
                  <button className="btn btn-secondary btn-sm">Gnc</button>
                  <Link
                    to={`/book-detail/${book.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Detay
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showDeleteModal === true && (
        <CustomModal
          title="Silmek istediğinize emin misiniz?"
          message=""
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            deleteBook(willDeleteBook);
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ListBooks;
