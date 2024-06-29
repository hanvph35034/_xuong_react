import { useNavigate, useParams } from "react-router-dom";
import styles from "./productform.module.scss";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import instance from "../../../axios";
import IProducts from "../../../interfaces/IProducts";
import { ProductContext } from "../../../contexts/ProductProvider";

const ProductForm = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [thumbnailOption, setThumbnailOption] = useState("keep");

  const { id } = useParams();
  const { dispathProducts } = useContext(ProductContext);
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IProducts>();

  if (id) {
    useEffect(() => {
      (async () => {
        try {
          const { data } = await instance.get("/products/" + id);
          reset(data);
          setThumbnailUrl(data.thumbnail);
        } catch (error) {
          console.log(error);
        }
      })();
    }, [id]);
  }
  const uploadImage = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "react_123");
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dun94cy15/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url;
  };
  const submit = async (data: IProducts) => {
    let updatedProduct = { ...data };
    switch (thumbnailOption) {
      case "upload":
        if (data.thumbnail && data.thumbnail[0]) {
          const thumbnailUrl = await uploadImage(data.thumbnail[0]);
          updatedProduct = { ...updatedProduct, thumbnail: thumbnailUrl };
        }
        break;
      default:
    }
    if (id) {
      try {
        const { data } = await instance.put(`/products/${id}`, updatedProduct);
        if (data) {
          dispathProducts({
            type: "UPDATE_PRODUCT",
            payload: data,
          });
          alert("Cập nhật sản phẩm thành công");
          navigate("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await instance.post(`/products`, updatedProduct);
        if (data) {
          dispathProducts({
            type: "ADD_PRODUCT",
            payload: updatedProduct,
          });
          alert("Thêm sản phẩm thành công");
          navigate("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className={styles.form}>
      <form className="w-full" onSubmit={handleSubmit(submit)}>
        <h3 className="text-left mb-4 text-black">
          {id ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        </h3>
        <div className="mb-2">
          <label
            htmlFor="name"
            className="block text-gray-700 font-bold mb-2"
          >
            Tên sản phẩm
          </label>
          <input
            type="text"
            id="name"
            {...register("title", {
              required: "Vui lòng nhập vào tên sản phẩm",
              minLength: {
                value: 6,
                message: "Giá sản phẩm lớn hơn 6 kí tự",
              },
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Tên sản phẩm"
          />
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium"></span>
            {errors?.title?.message}
          </p>
        </div>
        <div className="mb-2">
          <label
            htmlFor="price"
            className="block text-gray-700 font-bold mb-2"
          >
            Giá sản phẩm
          </label>
          <input
            type="number"
            id="price"
            {...register("price", {
              required: "Vui lòng nhập vào giá sản phẩm",
              min: {
                value: 0,
                message: "Giá sản phẩm phải lớn hơn 0",
              },
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Giá sản phẩm"
          />
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">{errors?.price?.message}</span>
          </p>
        </div>
        <div className="mb-2">
          <label
            htmlFor="repeat-des"
            className="block text-gray-700 font-bold mb-2"
          >
            Mô tả sản phẩm
          </label>
          <textarea
            id="repeat-des"
            {...register("description", {
              required: "Vui lòng nhập mô tả của sản phẩm",
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Mô tả sản phẩm"
          />
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium"></span>
            {errors?.description?.message}
          </p>
          <div className="mb-3">
            <label htmlFor="thumbnailOption" className="block text-gray-700 font-bold mb-2">
              Tùy chọn upload ảnh
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="thumbnailOption"
              value={thumbnailOption}
              onChange={(e) => setThumbnailOption(e.target.value)}
            >
              <option value="keep">Giữ nguyên ảnh</option>
              <option value="link">Đường dẫn ảnh</option>
              <option value="upload">Upload từ local</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="thumbnail" className="block text-gray-700 font-bold mb-2">
              Ảnh
            </label>
            {thumbnailOption === "link" && (
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="thumbnail"
                {...register("thumbnail")}
              />
            )}
            {thumbnailOption === "upload" && (
              <input
                type="file"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="thumbnail"
                {...register("thumbnail", { required: true })}
              />
            )}
            {errors.thumbnail?.message && (
              <p className="text-danger">{errors.thumbnail?.message}</p>
            )}
            {thumbnailUrl && (
              <img
                src={thumbnailUrl}
                alt="Product Thumbnail"
                style={{ maxWidth: "200px", marginTop: "10px" }}
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700
                 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 
                 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {id ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
