import { useState, useEffect } from "react";
import api from "../api/api";

function BookForm({ onBookAdded }) {
  const [form, setForm] = useState({
    book_title: "",
    book_img: "",
    book_author: "",
    book_description: "",
    book_publisher: "",
    book_year_publish: "",
    book_category_id_fk: "",
    book_status: "Available",
    book_inventory: 1,
    book_view_count: 0,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/books", form);
      if (res.data.book_id) {
        onBookAdded({ ...form, book_id: res.data.book_id });
        setForm({
          book_title: "",
          book_img: "",
          book_author: "",
          book_description: "",
          book_publisher: "",
          book_year_publish: "",
          book_category_id_fk: "",
          book_status: "Available",
          book_inventory: 1,
          book_view_count: 0,
        });
      }
    } catch (err) {
      console.error("Insert failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        name="book_title"
        placeholder="Title"
        value={form.book_title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="book_author"
        placeholder="Author"
        value={form.book_author}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="book_publisher"
        placeholder="Publisher"
        value={form.book_publisher}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="book_year_publish"
        value={form.book_year_publish}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="book_description"
        placeholder="Description"
        value={form.book_description}
        onChange={handleChange}
        required
      />

      {/* Dropdown for category */}
      <select
        name="book_category_id_fk"
        value={form.book_category_id_fk}
        onChange={handleChange}
        required
      >
        <option value="">-- Select Category --</option>
        {categories.map((cat) => (
          <option key={cat.book_category_id} value={cat.book_category_id}>
            {cat.book_category_name}
          </option>
        ))}
      </select>

      <select
        name="book_status"
        value={form.book_status}
        onChange={handleChange}
      >
        <option value="Available">Available</option>
        <option value="Borrowed">Borrowed</option>
        <option value="Reserved">Reserved</option>
      </select>

      <input
        type="number"
        name="book_inventory"
        placeholder="Inventory"
        value={form.book_inventory}
        onChange={handleChange}
      />

      <button type="submit">Add Book</button>
    </form>
  );
}

export default BookForm;