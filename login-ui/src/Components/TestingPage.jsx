//jm pa style
//add book form
//maayos na to with validation na 
//should be good na

import { useState, useEffect } from "react";
import api from "../api/api";

export default function AddBookForm({ onAdded }) {
  const [form, setForm] = useState({
    book_title: "",
    book_author: "",
    book_description: "",
    book_publisher: "",
    book_year_publish: "",
    book_category_id_fk: "",
    book_status: "Available",
    book_inventory: 1,
  });
  const [cover, setCover] = useState(null);
  const [categories, setCategories] = useState([]);

  // Load categories on mount
  useEffect(() => {
    api.get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCover(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validation
    if (!form.book_title.trim()) return alert("Title is required");
    if (!form.book_author.trim()) return alert("Author is required");
    if (!form.book_category_id_fk) return alert("Category is required");

    if (cover) {
      if (cover.size > 5 * 1024 * 1024) {
        return alert("File too large (max 5MB)");
      }
      if (
        !["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
          cover.type
        )
      ) {
        return alert("Only JPG, PNG, GIF, WEBP allowed");
      }
    }
    //sent file + form
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (cover) formData.append("cover", cover);

    try {
      await api.post("/opac", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Book added!");
      if (onAdded) onAdded();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Error uploading book");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label>Title</label>
        <input type="text" name="book_title" onChange={handleChange} required />
      </div>

      <div>
        <label>Author</label>
        <input type="text" name="book_author" onChange={handleChange} required />
      </div>

      <div>
        <label>Description</label>
        <textarea name="book_description" onChange={handleChange} />
      </div>

      <div>
        <label>Publisher</label>
        <input type="text" name="book_publisher" onChange={handleChange} />
      </div>

      <div>
        <label>Year Published</label>
        <input type="date" name="book_year_publish" onChange={handleChange} />
      </div>

      <div>
        <label>Category</label>
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
      </div>

      <div>
        <label>Inventory</label>
        <input
          type="number"
          name="book_inventory"
          min="1"
          value={form.book_inventory}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Book Cover</label>
        <input
          type="file"
          id="cover"
          name="cover"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "block", margin: "10px 0" }}
        />
      </div>

      <button type="submit">Add Book</button>
    </form>
  );
}
