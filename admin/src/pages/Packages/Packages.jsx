import { useDispatch, useSelector } from "react-redux";
import {
  addPackage,
  deleteAll,
  deletePackage,
  getPackages,
  updatePackage,
} from "../../Redux/packageReducer/Action";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./Packages.module.css";
import ReactLoading from "react-loading";
import { FaCheck } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FcEditImage } from "react-icons/fc";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { ImCross } from "react-icons/im";

export const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [showAddForm, setShowAddForm] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(true);
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

    // thumbnail: null,
  });
  const dispatch = useDispatch();
  const packageData = useSelector((state) => state.packagesDetails);

  // console.log(packageData.postIsLoading);

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

    // console.log(Package);
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
      // await formData.append("createdBy", adminId);
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
    // window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      // console.log(updatePackage,adminToken)
      window.scrollTo({top : 0, behavior:'smooth'})
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

    const filtered =  packageData.packages.filter((pack, index) => {
          return (
            pack._id.toLowerCase().includes(query.toLowerCase()) ||
            pack.name.toLowerCase().includes(query.toLowerCase()) ||
            pack.price.toLowerCase().includes(query.toLowerCase()) ||
            pack.createdBy.email
              .toLowerCase()
              .includes(query.toLowerCase()) ||
              pack.createdBy.contact.toLowerCase().includes(query.toLowerCase())
          );
        })

        setPackages(filtered);
  };

  useEffect(() => {
    handleGetPackages();
    const admin = JSON.parse(localStorage.getItem("admin"));
    setAdminId(admin?.adminId || null);
    setAdminToken(admin?.adminToken || null);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.packagesContainer}>
         <div className={styles.topPackageButtonContainer}>
         <div className={styles.search}>
            <input
              type="search"
              placeholder="You can search package by package ID..."
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
                onClick={() => setShowAddForm(true)}
              >
                Add Package
              </button>
            )}
            </div>
         </div>
          <div className={styles.packages}>
            {packages.map((pack) => (
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
                    <p className={styles.infoDescription}>{pack.description}</p>
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
                          <p className={styles.allFeatures}>
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
                          // thumbnail: null,
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
            ))}
          </div>
        </div>
        <div className={styles.formContainer}>
          {showAddForm && (
            <div className={styles.addFormContainer}>
              <form
                className={styles.addForm}
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <h1 className={styles.formHeading}>Add Package</h1>
                <ImCross className={styles.addCross} onClick={handleCross} />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleInput}
                />
                <input
                  type="text"
                  name="durationInMonths"
                  placeholder="Duration In Months"
                  onChange={handleInput}
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  onChange={handleInput}
                />
                <input
                  type="text"
                  name="originalPrice"
                  placeholder="Original Price"
                  onChange={handleInput}
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  onChange={handleInput}
                ></textarea>
                <input
                  type="text"
                  name="features"
                  placeholder="Features"
                  onChange={handleInput}
                />
                <input
                  type="text"
                  name="discount"
                  placeholder="Discount"
                  onChange={handleInput}
                />
                <input
                  type="file"
                  name="thumbnail"
                  placeholder="Thumbnail"
                  onChange={handleInput}
                />

                <input
                  className={`${styles.submitBtn} ${
                    packageData.postIsLoading ? "hidden" : ""
                  }`}
                  // className={styles.submitBtn}
                  type="submit"
                  value="Add Package"
                  // disabled={packageData.postIsLoading}
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
          {!showAddForm && showUpdateForm && (
            <div className={styles.updateFormContainer}>
              <form
                action=""
                className={styles.addForm}
                onSubmit={handleUpdate}
              >
                <h1 className={styles.formHeading}>Update Package</h1>
                <ImCross className={styles.addCross} onClick={handleCross} />
                <input type="text" name="_id" value={updatedPackage._id} />
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
                {/* <input type="file" placeholder="Thumbnail"/> */}
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
