import { useDispatch, useSelector } from "react-redux";
import {
  addPackage,
  deleteAll,
  deletePackage,
  getPackages,
  updatePackage,
} from "../../Redux/packageReducer/Action";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import styles from "./Packages.module.css";
import ReactLoading from "react-loading";
import { FaCheck } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import Cookies from "js-cookie";

export const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [showAddForm, setShowAddForm] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [adminToken, setAdminToken] = useState(null);
  
  const [adminId, setAdminId] = useState(null);
  const [Package, setPackage] = useState({
    name: "",
    durationInMonths: "",
    price: "",
    originalPrice: "",
    description: "",
    features: [],
    discount: "",
    createdBy: "",
    thumbnail: null,
  });
  const [updatedPackage, setUpdatedPackage] = useState({
    _id: "",
    name: "",
    durationInMonths: "",
    price: "",
    originalPrice: "",
    description: "",
    features: [],
    discount: "",
  });
  const dispatch = useDispatch();
  const packageData = useSelector((state) => state.packagesDetails);
  const formContainerRef = useRef(null);

  // Get Packages
  const handleGetPackages = async () => {
    const response = await dispatch(getPackages());
    if (response.status === 200) {
      setPackages(response.data.reverse());
    } else {
      toast.error(response?.error || "Fail to fetch data");
    }
  };

  // Handle input change
  const handleInput = (event) => {
    const { name, value, files } = event.target;

    if (name === "features") {
      const featuresArray = value.split(",").map((feature) => feature.trim());
      setPackage({ ...Package, [name]: featuresArray });
    } else if (name === "thumbnail") {
      setPackage({ ...Package, [name]: files[0] });
    } else {
      setPackage({ ...Package, [name]: value });
    }
  };

  // Handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Adding Package data into the formData;
    const formData = new FormData();
    for (const key in Package) {
      if (Array.isArray(Package[key])) {
        Package[key].forEach((item) => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, Package[key]);
      }
    }

    try {
      const response = await dispatch(
        addPackage(formData, adminId, adminToken)
      );
      if (response?.status === 200) {
        toast.success(response?.data?.success);
        await handleGetPackages();
      } else {
        toast.error(response?.error || "Unable to add package.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm(
        `Are you sure to delete this package ${id}`
      );
      if (confirm) {
        const response = await dispatch(deletePackage(id, adminToken));
        if (response?.status === 200) {
          toast.success(response?.data?.success);
          await handleGetPackages();
        } else {
          toast.error(response?.error || "Unable to delete package.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle delete all
  const handleDeleteAll = async () => {
    const confirm = window.confirm("Are you sure for delete All packages?");
    if (confirm) {
      try {
        const response = await dispatch(deleteAll(adminToken));
        if (response.status === 200) {
          toast.success(response.data.success);
          await handleGetPackages();
        } else {
          toast.error(response?.error || "Unable to delete All package.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Handle update
  const handleUpdate = async (event) => {
    event.preventDefault();
    // console.log(updatedPackage.thumbnail.name,"check here")

    try {
      const response = await dispatch(
        updatePackage(updatedPackage, adminToken)
      );

      if (response?.status === 200) {
        toast.success(response.data.success);
        await handleGetPackages();
      } else {
        toast.error(
          response?.error || `Unable to update "${updatedPackage._id}" package.`
        );
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  // Handle Cross
  const handleCross = () => {
    setShowAddForm(false);
    setShowUpdateForm(false);
  };

  // Search packages basis of package info or admin info
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.value;

    const filtered = packageData.packages.filter((pack, index) => {
      return (
        pack._id.toLowerCase().includes(query.toLowerCase()) ||
        pack.name.toLowerCase().includes(query.toLowerCase()) ||
        pack.price.toLowerCase().includes(query.toLowerCase()) ||
        pack.createdBy.email.toLowerCase().includes(query.toLowerCase()) ||
        pack.createdBy.contact.toLowerCase().includes(query.toLowerCase())
      );
    });

    setPackages(filtered);
  };

  useEffect(() => {
    handleGetPackages();
    const adminId = Cookies.get("admin").adminId;
    const adminToken = Cookies.get("admin").adminToken;
    if(adminId){
      setAdminId(JSON.parse(adminId));
    }
    if(adminToken){
      setAdminToken(JSON.parse(adminToken));
    }
  }, []);

  if (packageData.isLoading) {
    return (
      <div className={styles.loader}>
        <ReactLoading type="spin" color="#00BFFF" height={40} width={40} />
        <h3>Loading...</h3>
      </div>
    );
  } else if (packageData.isError) {
    return <h1 className= {styles.error}>An error occurred. Please refresh the page and try again.</h1>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.packagesContainer}>
          <div className={styles.topPackageButtonContainer}>
            <div className={styles.search}>
              <input
                type="search"
                placeholder="You can search package by package ID and Admin details..."
                onInput={handleSearch}
              />
            </div>
            <div className={styles.packageTopButtons}>
              {packages.length > 1 && (
                <button onClick={handleDeleteAll} className={styles.deleteAll}>
                  Delete All
                </button>
              )}
              {!showAddForm && (
                <button
                  className={styles.openAddForm}
                  onClick={() => {
                    setShowAddForm(true);
                    setShowUpdateForm(false);
                    // formContainerRef.current.scrollIntoView({
                    //   behavior: "smooth",
                    // });
                  }}
                >
                  Add Package
                </button>
              )}
            </div>
          </div>
          <div className={styles.packages}>
            {packages.length > 0 ? (
              packages.map((pack, index) => (
                <div className={styles.package} key={pack.id}>
                  <div className={styles.image}>
                    <img
                      src={pack.thumbnail}
                      alt={`${pack.name} img`}
                      className={styles.img}
                    />
                  </div>
                  <div className={styles.data}>
                    <div className={styles.info}>
                      <div className={styles.topData}>
                        <h1 className={styles.infoName}> {pack.name}</h1>
                        <p className={styles.duration}>
                          {pack.durationInMonths} Months
                        </p>
                      </div>
                      <p className={styles.infoDescription}>
                        {pack.description}
                      </p>
                      <div className={styles.infoPrices}>
                        <p className={styles.price}>
                          {" "}
                          ₹{pack.originalPrice * (1 - pack.discount / 100)}
                        </p>
                        <p className={styles.originalPrice}>
                          ₹ {pack.originalPrice}
                        </p>
                        <p className={styles.discount}>{pack.discount}%</p>
                      </div>
                      <div className={styles.features}>
                        {pack.features.map((feature, index) => {
                          return (
                            <p className={styles.allFeatures} key={index}>
                              <FaCheck className={styles.checkSign} />
                              {feature}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                    <div className={styles.buttons}>
                      <button
                        className={styles.packEdit}
                        onClick={() => {
                          setShowAddForm(false);
                          setShowUpdateForm(true);
                          setUpdatedPackage({
                            _id: pack._id,
                            name: pack.name,
                            durationInMonths: pack.durationInMonths,
                            price: pack.price,
                            originalPrice: pack.originalPrice,
                            description: pack.description,
                            features: pack.features,
                            discount: pack.discount,
                            thumbnail: pack.thumbnail,
                          });
                        }}
                      >
                        <BiSolidMessageSquareEdit />
                      </button>
                      <button
                        className={styles.packDelete}
                        onClick={() => {
                          handleDelete(pack._id);
                        }}
                      >
                        <RiDeleteBin2Fill />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1>Kindly proceed with adding packages.</h1>
            )}
          </div>
        </div>

        {/* form container  */}
        <div
          className={styles.formContainer}
          ref={formContainerRef}
          id="formContainer"
        >
          {showAddForm && (
            <div className={styles.addFormContainer}>
              <form
                className={styles.addForm}
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <h1 className={styles.formHeading}>Add Package</h1>
                <ImCross className={styles.addCross} onClick={handleCross} />
                <label htmlFor="createdBy" className={styles.adminAddLable}>
                  Admin
                </label>
                <input type="text" value={adminId} />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleInput}
                  required
                />
                <input
                  type="text"
                  name="durationInMonths"
                  placeholder="Duration In Months"
                  onChange={handleInput}
                  required
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  onChange={handleInput}
                  required
                />
                <input
                  type="text"
                  name="originalPrice"
                  placeholder="Original Price"
                  onChange={handleInput}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  onChange={handleInput}
                  required
                ></textarea>
                <input
                  type="text"
                  name="features"
                  placeholder="Features"
                  onChange={handleInput}
                  required
                />
                <input
                  type="text"
                  name="discount"
                  placeholder="Discount"
                  onChange={handleInput}
                  required
                />
                <input
                  type="file"
                  name="thumbnail"
                  placeholder="Thumbnail"
                  onChange={handleInput}
                  required
                />
                <input
                  className={`${styles.submitBtn} ${
                    packageData.postIsLoading ? "hidden" : ""
                  }`}
                  type="submit"
                  value="Add Package"
                />
                {packageData.postIsLoading && (
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

          {/* Update form */}

          {!showAddForm && showUpdateForm && (
            <div className={styles.updateFormContainer}>
              <form
                action=""
                className={styles.addForm}
                onSubmit={handleUpdate}
              >
                <h1 className={styles.formHeading}>Update Package</h1>
                <ImCross className={styles.addCross} onClick={handleCross} />
                <label htmlFor="createdBy" className={styles.adminUpdateLable}>
                  Created By
                </label>
                <input type="text" id="createdBy" value={adminId} />
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(event) => {
                    setUpdatedPackage({
                      ...updatedPackage,
                      name: event.target.value,
                    });
                  }}
                  value={updatedPackage.name}
                />
                <input
                  type="text"
                  placeholder="Duration In Months"
                  onChange={(event) => {
                    setUpdatedPackage({
                      ...updatedPackage,
                      durationInMonths: event.target.value,
                    });
                  }}
                  value={updatedPackage.durationInMonths}
                />
                <input
                  type="text"
                  placeholder="Price"
                  onChange={(event) => {
                    setUpdatedPackage({
                      ...updatedPackage,
                      price: event.target.value,
                    });
                  }}
                  value={updatedPackage.price}
                />
                <textarea
                  placeholder="Description"
                  onChange={(event) => {
                    setUpdatedPackage({
                      ...updatedPackage,
                      description: event.target.value,
                    });
                  }}
                  value={updatedPackage.description}
                ></textarea>
                <input
                  type="text"
                  placeholder="Features"
                  onChange={(event) => {
                    setUpdatedPackage({
                      ...updatedPackage,
                      features: event.target.value,
                    });
                  }}
                  value={updatedPackage.features}
                />
                <input
                  type="text"
                  placeholder="Discount"
                  onChange={(event) => {
                    setUpdatedPackage({
                      ...updatedPackage,
                      discount: event.target.value,
                    });
                  }}
                  value={updatedPackage.discount}
                />
                <input
                  type="file"
                  name="thumbnail"
                  id=""
                  onChange={(event) => {
                    setUpdatedPackage({
                      ...updatedPackage,
                      thumbnail: event.target.files[0],
                    });
                  }}
                />
                <input
                  className={styles.submitBtn}
                  type="submit"
                  value="Update Package"
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
