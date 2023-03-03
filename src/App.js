import React, { useState } from "react";
import { storage, fs } from './config/Config'

const App = () => {
  const[product,setProduct]=useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

  const handleProductImg = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (allowedTypes.includes(selectedFile.type)) {
        setImage(selectedFile);
        setImageError("");
      } else {
        setImage(null);
        setImageError("Please select a valid image file type (png, jpg or jpeg)");
      }
    } else {
      console.log("Please select your file");
    }
  };

  const handleAddProducts = (e) => {
    e.preventDefault();

    if (!title || !description || !price || !image) {
      setUploadError("Please fill all the required fields");
      return;
    }

    const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        setUploadError(error.message);
        setImage(null);
      },
      () => {
        storage
          .ref("product-images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            fs.collection("Products")
              .add({
                title,
                description,
                price: Number(price),
                url,
              })
              .then(() => {
                setSuccessMsg("Product added successfully");
                setTitle("");
                setDescription("");
                setPrice("");
                setImage(null);
                setImageError("");
                document.getElementById('file').value='';
                setTimeout(()=>{
                  setSuccessMsg('')
                },3000)
              })
              .catch((error) => setUploadError(error.message));
          });
      }
    );
  };
const getProducts = async()=>{
  const Products =await fs.collection('product').get();
}
  return (
    <div className="container mx-auto p-8">
    <h1 className="text-2xl font-bold mb-4">Add Products</h1>
    <hr className="mb-4" />
    {successMsg && (
      <>
        <div className="success-msg">{successMsg}</div>
        <br />
      </>
    )}
    <form
      autoComplete="off"
      className="form-group"
      onSubmit={handleAddProducts}
    >
      <label className="font-semibold">Product Title</label>
      <input
        type="text"
        className="form-control border p-2 rounded w-full mb-4"
        required
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <br />
      <label className="font-semibold">Product Description</label>
      <input
        type="text"
        className="form-control border p-2 rounded w-full mb-4"
        required
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <br />
      <label className="font-semibold">Product Price</label>
      <input
        type="number"
        className="form-control border p-2 rounded w-full mb-4"
        required
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <br />
      <label className="font-semibold">Upload Product Image</label>
      <input
        type="file"
        id="file"
        className="form-control border p-2 rounded w-full mb-4"
        required
        onChange={handleProductImg}
      />
  
      {imageError && (
        <>
          <br />
          <div className="error-msg">{imageError}</div>
        </>
      )}
      <br />
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn btn-success btn-md py-2 px-4 rounded"
        >
          SUBMIT
        </button>
      </div>
    </form>
    {uploadError && (
      <>
        <br />
        <div className="error-msg">{uploadError}</div>
      </>
    )}
  </div>
  
  );
};

export default App;
