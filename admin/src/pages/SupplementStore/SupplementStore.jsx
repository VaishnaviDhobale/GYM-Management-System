import { useEffect, useState } from "react";
import styles from "./SuppplementStore.module.css";
import {
  addSupplements,
  deleteAllSupplements,
  deleteSupplement,
  getSupplements,
  updateSupplement,
} from "../../Redux/supplementStoreReducer/Action";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import { FaCheck } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import Cookies from "js-cookie";


export const SupplementStore = () => {
  const [supplements, setSupplements] = useState([]);
  const [showAddSupplement, setShowAddSupplement] = useState(true);
  const [showUpdateSupplement, setShowUpdateSupplement] = useState(true);
  const [adminData, setAdminData] = useState({});
  const [supplement, setSupplement] = useState({});
  const [showDesc, setShowDesc] = useState(false);
  const [updatedSupplement, setUpdatedSupplement] = useState({
    _id: "",
    name: "",
    category: "",
    description: "",
    originalPrice: "",
    discount: "",
    stock: "",
    features: [],
  });

  const dispatch = useDispatch();
  const supplementStoreDetails = useSelector(
    (store) => store.supplementStoreDetails
  );

  // Handle get supplements
  const handleGetData = async () => {
    try {
      const response = await dispatch(getSupplements());
      if (response.status === 200) {
        setSupplements(response.data.reverse());
      } else {
        toast.error(response.error || "Not able to get supplements data.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle input change
  const handleInput = (event) => {
    const { name, value, files } = event.target;

    if (name === "features") {
      const featuresArray = value.split(",").map((feature) => feature.trim());
      setSupplement({ ...supplement, [name]: featuresArray });
    } else if (name === "thumbnail") {
      setSupplement({ ...supplement, [name]: files[0] });
    } else {
      setSupplement({ ...supplement, [name]: value });
    }
  };

  // Handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      for (const key in supplement) {
        if (Array.isArray(supplement[key])) {
          supplement[key].forEach((item) => formData.append(`${key}[]`, item));
        } else {
          formData.append(key, supplement[key]);
        }
      }

      const response = await dispatch(addSupplements(formData, adminData));
      if (response.status === 200) {
        toast.success(response.data.success);
        await handleGetData();
      } else {
        toast.error(response.error || "Not able to add supplement.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle update
  const handleUpdate = async (event) => {
    event.preventDefault();
    // console.log(updatedSupplement)
    // // console.log(updatedPackage.thumbnail.name,"check here")

    try {
      const response = await dispatch(
        updateSupplement(updatedSupplement, adminData)
      );

      if (response?.status === 200) {
        toast.success(response.data.success);
        await handleGetData();
      } else {
        toast.error(
          response?.error ||
            `Unable to update "${updatedSupplement._id}" package.`
        );
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm("Are you sure for delete supplement?");
      if (confirm) {
        const response = await dispatch(deleteSupplement(id,adminData));
        if (response.status === 200) {
          toast.success(response.data.success);
          await handleGetData();
        } else {
          toast.error(response.error || "Unable to delete supplement.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Handle all supplements delete
  const handleAllDelete = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want delete all supplements?"
      );
      if (confirm) {
        const response = await dispatch(deleteAllSupplements(adminData));
        if (response.status === 200) {
          toast.success(response.data.success);
          await handleGetData();
        } else {
          toast.error(response.error || `Unable to delete all supplements`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Search
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.value;

    const filtered = supplementStoreDetails.supplements.filter(
      (supplement, index) => {
        return (
          supplement._id.toLowerCase().includes(query.toLowerCase()) ||
          supplement.name.toLowerCase().includes(query.toLowerCase()) ||
          supplement.originalPrice
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          supplement.category.toLowerCase().includes(query.toLowerCase()) ||
          supplement.createdBy.email
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          supplement.createdBy.contact
            .toLowerCase()
            .includes(query.toLowerCase())
        );
      }
    );

    setSupplements(filtered);
  };

  // Handle cross
  const handleCross = () => {
    setShowAddSupplement(false);
    setShowUpdateSupplement(false);
  };

  useEffect(() => {
    handleGetData();
    const admin = Cookies.get("admin");
    if(admin){
      setAdminData(JSON.parse(admin));
    }
  }, []);

  //   console.log(supplementStoreDetails);

  if (supplementStoreDetails.isLoading) {
    return (
      <div className={styles.loader}>
        <ReactLoading type="spin" color="#00BFFF" height={40} width={40} />
        <h3>Loading...</h3>
      </div>
    );
  } else if (supplementStoreDetails.isError) {
    return <h1 className= {styles.error}>An error occurred. Please refresh the page and try again.</h1>;
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.dataContainer}>
          <div className={styles.topBtnContainer}>
            {supplements.length > 2 && (
              <div className={styles.search}>
                <input
                  type="search"
                  placeholder="You can search package by package ID and Admin details..."
                  onInput={handleSearch}
                />
              </div>
            )}
            <div className={styles.topBtns}>
              {supplements.length > 1 && (
                <button className={styles.deleteAll} onClick={handleAllDelete}>
                  Delete All
                </button>
              )}
              {!showAddSupplement && (
                <button
                  className={styles.addSupplements}
                  onClick={() => {
                    setShowAddSupplement(true);
                  }}
                >
                  Add Supplements
                </button>
              )}
            </div>
          </div>
          {supplements.length > 0 ? (
            <div className={styles.supplements}>
              {supplements.map((supplement, index) => {
                return (
                  <div className={styles.supplement}>
                    <div className={styles.image}>
                      <img src={supplement.thumbnail} alt="" />
                    </div>
                    <div className={styles.data}>
                      <p className={styles.category}>{supplement.category}</p>
                      <h1 className={styles.supplementName}>
                        {supplement.name}
                      </h1>
                      <div className={styles.priceSection}>
                        <p className={styles.price}>
                          ₹
                          {Math.round(
                            supplement.originalPrice *
                              (1 - supplement.discount / 100)
                          )}
                        </p>
                        <p className={styles.originalPrice}>
                          ₹{supplement.originalPrice}
                        </p>
                        <p className={styles.discount}>
                          {supplement.discount}%
                        </p>
                      </div>
                      <p
                        className={styles.description}
                        onClick={() => setShowDesc(!showDesc)}
                      >
                        {supplement?.description?.substring(0, 70)}...
                      </p>
                      {showDesc && (
                        <div className={styles.fullDesc}>
                          {supplement.description}
                        </div>
                      )}

                      <p className={styles.inStock}>
                        {supplement.stock > 0
                          ? `Only ${supplement.stock} left in stock.`
                          : "Out of stock"}
                      </p>
                    </div>

                    <div className={styles.buttons}>
                      <button
                        className={styles.updateBtn}
                        onClick={(event) => {
                          setShowAddSupplement(false);
                          setShowUpdateSupplement(true);
                          setUpdatedSupplement({
                            _id: supplement._id,
                            name: supplement.name,
                            category: supplement.category,
                            description: supplement.description,
                            originalPrice: supplement.originalPrice,
                            discount: supplement.discount,
                            stock: supplement.stock,
                            features: supplement.features,
                          });
                        }}
                      >
                        <BiSolidMessageSquareEdit />
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(supplement._id)}
                      >
                        <RiDeleteBin2Fill />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h1>Kindly proceed with adding supplements.</h1>
          )}
        </div>

        {/* form container  */}
        <div className={styles.formContainer}>
          {showAddSupplement && (
            <div className={styles.addFormContainer}>
              <h1 className={styles.addHeading}>Add Supplements</h1>
              <ImCross className={styles.addCross} onClick={handleCross} />
              <form className={styles.addForm} onSubmit={handleSubmit}>
                <label htmlFor="createdBy" className={styles.adminAddLable}>
                  Admin
                </label>
                <input
                  type="text"
                  placeholder="Created By"
                  name="createdBy"
                  id="createdBy"
                  value={adminData.adminId}
                  required
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleInput}
                  required
                />
                <br />
                <select name="category" onChange={handleInput} required>
                  <option value="">Select Category</option>
                  <option value="Protein">Protein</option>
                  <option value="Vitamins">Vitamins</option>
                  <option value="Minerals">Minerals</option>
                  <option value="Amino Acids">Amino Acids</option>
                  <option value="Pre-Workout">Pre-Workout</option>
                  <option value="Post-Workout">Post-Workout</option>
                </select>
                <br />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  onChange={handleInput}
                  required
                />
                <br />
                <input
                  type="text"
                  name="originalPrice"
                  placeholder="Original Price"
                  onChange={handleInput}
                  required
                />
                <br />
                <input
                  type="text"
                  name="discount"
                  placeholder="Discount"
                  onChange={handleInput}
                  required
                />
                <br />
                <input
                  type="text"
                  name="stock"
                  placeholder="Stock"
                  onChange={handleInput}
                  required
                />
                <br />
                <input
                  type="text"
                  placeholder="Features, use comma as seperator"
                  onChange={handleInput}
                  name="features"
                  required
                />
                <br />
                <input type="file" name="thumbnail" onChange={handleInput} />
                <br />
                <input
                  type="submit"
                  //   className={styles.submitBtn}
                  className={`${styles.submitBtn} ${
                    supplementStoreDetails.postIsLoading ? "hidden" : ""
                  }`}
                  value="Add Supplement"
                />

                {supplementStoreDetails.postIsLoading && (
                  <div className={styles.spinner}>
                    <ReactLoading
                      type="spin"
                      color="white"
                      height={20}
                      width={20}
                    />
                  </div>
                )}
              </form>
            </div>
          )}

          {/* Update form  */}
          {!showAddSupplement && showUpdateSupplement && (
            <div className={styles.updateFormContainer}>
              <h1 className={styles.updateHeading}>Update Supplements</h1>
              <ImCross className={styles.addCross} onClick={handleCross} />
              <form className={styles.updateForm} onSubmit={handleUpdate}>
                <label htmlFor="createdBy" className={styles.adminUpdateLable}>
                  Created By
                </label>
                <input
                  type="text"
                  placeholder="Created By"
                  id="createdBy"
                  value={adminData.adminId}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={updatedSupplement.name}
                  onChange={(event) => {
                    setUpdatedSupplement({
                      ...updatedSupplement,
                      name: event.target.value,
                    });
                  }}
                />
                <br />
                <select
                  name="category"
                  value={updatedSupplement.category}
                  onChange={(event) => {
                    setUpdatedSupplement({
                      ...updatedSupplement,
                      category: event.target.value,
                    });
                  }}
                >
                  <option value="">Select Category</option>
                  <option value="Protein">Protein</option>
                  <option value="Vitamins">Vitamins</option>
                  <option value="Minerals">Minerals</option>
                  <option value="Amino Acids">Amino Acids</option>
                  <option value="Pre-Workout">Pre-Workout</option>
                  <option value="Post-Workout">Post-Workout</option>
                </select>
                <br />
                <input
                  type="text"
                  placeholder="Description"
                  value={updatedSupplement.description}
                  onChange={(event) => {
                    setUpdatedSupplement({
                      ...updatedSupplement,
                      description: event.target.value,
                    });
                  }}
                />
                <br />
                <input
                  type="text"
                  placeholder="Original Price"
                  value={updatedSupplement.originalPrice}
                  onChange={(event) => {
                    setUpdatedSupplement({
                      ...updatedSupplement,
                      originalPrice: event.target.value,
                    });
                  }}
                />
                <br />
                <input
                  type="text"
                  placeholder="Discount"
                  value={updatedSupplement.discount}
                  onChange={(event) => {
                    setUpdatedSupplement({
                      ...updatedSupplement,
                      discount: event.target.value,
                    });
                  }}
                />
                <br />
                <input
                  type="text"
                  placeholder="Stock"
                  value={updatedSupplement.stock}
                  onChange={(event) => {
                    setUpdatedSupplement({
                      ...updatedSupplement,
                      stock: event.target.value,
                    });
                  }}
                />
                <br />
                <input
                  type="text"
                  placeholder="Features, use comma as seperator"
                  value={updatedSupplement.features}
                  onChange={(event) => {
                    setUpdatedSupplement({
                      ...updatedSupplement,
                      features: event.target.value,
                    });
                  }}
                />
                <br />
                <input
                  type="file"
                  onChange={(event) => {
                    setUpdatedSupplement({
                      ...updatedSupplement,
                      thumbnail: event.target.files[0],
                    });
                  }}
                />
                <br />
                <input
                  type="submit"
                  className={styles.submitBtn}
                  value="Update Supplement"
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
