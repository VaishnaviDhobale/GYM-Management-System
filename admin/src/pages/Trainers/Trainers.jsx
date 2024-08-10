import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTrainers,
  deleteTrainers,
  getTrainers,
  updateTrainers,
  updateTrauners,
} from "../../Redux/TrainersReducer/Action";
import { toast } from "react-toastify";
import styles from "./Trainers.module.css";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { baseUrl } from "../../comman";
import { SlEye } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import ReactLoading from "react-loading";
import Cookies from "js-cookie";

export const Trainers = () => {
  const [showAddTrainerForm, setShowAddTrainerForm] = useState(true);
  const [showUpdateTrainerForm, setShowUpdateTrainerForm] = useState(true);
  const [adminData, setAdminData] = useState({});
  const [updatedTrainer, setUpdatedTrainer] = useState({
    _id: "",
    name: "",
    email: "",
    contact: "",
    age: "",
    experience: "",
    specialty: "",
    // profileImg: null,
    availability: "",
    bio: "",
  });
  const [trainers, setTrainers] = useState([]);
  const [trainer, setTrainer] = useState({});

  const dispatch = useDispatch();
  const formRef = useRef();
  const trainersData = useSelector((store) => {
    return store.trainersDetails;
  });

  // Handle get trainers
  const handleGetTrainers = async () => {
    try {
      const response = await dispatch(getTrainers());
      if (response.status === 200) {
        setTrainers(response.data.reverse());
      } else {
        toast.error(response.error || "Unable to get data.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle input change
  const handleInputChange = async (event) => {
    try {
      const { name, value, files } = event.target;

      if (name === "availability") {
        const featuresArray = value.split(",").map((feature) => feature.trim());
        setTrainer({ ...trainer, [name]: featuresArray });
      } else if (name === "profileImg") {
        setTrainer({ ...trainer, [name]: files[0] });
      } else {
        setTrainer({ ...trainer, [name]: value });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Check trainer alredy exist
  const isTrainerAlredyExist = async () => {
    try {
      const trainerExists = await axios.get(
        `${baseUrl}/trainers/checkTrainerByEmail/${trainer?.email}`,
        {
          headers: {
            "Content-Type": "application/json",
            adminToken: adminData.adminToken,
          },
        }
      );
      return trainerExists;
    } catch (error) {
      return error;
    }
  };

  // Handle submit
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // Trainer details varification starts.
      if (!trainer.email.includes("@gmail.com")) {
        toast.error("Please enter a valid email address.");
      } else if (trainer.contact.length < 10 || trainer.contact.length > 10) {
        toast.error("Please enter a valid contact number");
        // Trainer details validation ends.
      } else {
        const trainerExists = await isTrainerAlredyExist();

        if (trainerExists.data) {
          toast.error("An trainer with the provided email already exists.");
        } else {
          // Adding trainer data into the formData;
          const formData = new FormData();
          for (const key in trainer) {
            if (Array.isArray(trainer[key])) {
              trainer[key].forEach((item) => formData.append(`${key}[]`, item));
            } else {
              formData.append(key, trainer[key]);
            }
          }

          const response = await dispatch(
            addTrainers(formData, adminData.adminToken)
          );
          if (response?.status === 200) {
            toast.success(response?.data?.success);
            // formRef.current.reset();
            handleGetTrainers();
          } else {
            toast.error("Something went wrong while adding admin.");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle update
  const handleUpdate = async (event) => {
    try {
      event.preventDefault();
      const response = await dispatch(
        updateTrainers(updatedTrainer, adminData.adminToken)
      );
      if (response.status === 200) {
        toast.success(response.data.success);
        handleGetTrainers();
      } else {
        toast.error(response.error || "Unable to update trainer details.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm(
        `Are you sure to delete trainer with id "${id}"`
      );
      if (confirm) {
        const response = await dispatch(
          deleteTrainers(id, adminData.adminToken)
        );
        if (response.status === 200) {
          toast.success(response.data.success);
          handleGetTrainers();
        } else {
          toast.error(response.error || "Unable to delete trainer.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle search
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.value;

    const filtered = trainersData.trainers.filter((trainer, index) => {
      return (
        trainer._id.toLowerCase().includes(query.toLowerCase()) ||
        trainer.name.toLowerCase().includes(query.toLowerCase()) ||
        trainer.email.toLowerCase().includes(query.toLowerCase()) ||
        trainer.contact.toLowerCase().includes(query.toLowerCase())
      );
    });

    setTrainers(filtered);
  };

  useEffect(() => {
    handleGetTrainers();
    const admin = Cookies.get("admin");
    if (admin) {
      setAdminData(JSON.parse(admin));
    }
  }, []);

  console.log(trainersData.postIsLoading);
  if (trainersData.isLoading) {
    return (
      <div className={styles.loader}>
        <ReactLoading type="spin" color="#00BFFF" height={40} width={40} />
        <h3>Loading...</h3>
      </div>
    );
  } else if (trainersData.isError) {
    return <h1 className= {styles.error}>An error occurred. Please refresh the page and try again.</h1>;
  }
  return (
    <>
      <div className={styles.container}>
        {/* Data container  */}
        <div className={styles.dataContainer}>
          <div className={styles.searchDiv}>
            <input
              type="search"
              className={styles.search}
              placeholder="You can search trainer by trainer ID and trainer details..."
              onInput={handleSearch}
            />
            {!showAddTrainerForm && (
              <button
                className={styles.addTrainersBtn}
                onClick={() => setShowAddTrainerForm(true)}
              >
                Add Trainers
              </button>
            )}
          </div>
          <div className={styles.trainerData}>
            {trainers.map((trainer, index) => {
              return (
                <div className={styles.tariner}>
                  <div className={styles.imgDiv}>
                    <img
                      className={styles.img}
                      src={trainer.profileImg}
                      alt={trainer.name}
                    />
                  </div>
                  <div className={styles.data}>
                    <h1 className={styles.nameAge}>
                      {trainer.age} year old{" "}
                      <span className={styles.nameSpan}>{trainer.name}</span>
                    </h1>
                    <p className={styles.bio}>{trainer.bio}</p>
                    <p className={styles.experience}>
                      {trainer.experience} of experience
                    </p>
                    <p className={styles.specialty}>
                      Specialty - {trainer.specialty}
                    </p>
                  </div>
                  <div className={styles.btns}>
                    <button
                      className={styles.updateBtn}
                      onClick={() => {
                        setShowAddTrainerForm(false);
                        setShowUpdateTrainerForm(true);
                        setUpdatedTrainer({
                          _id: trainer._id,
                          name: trainer.name,
                          email: trainer.email,
                          contact: trainer.contact,
                          age: trainer.age,
                          experience: trainer.experience,
                          specialty: trainer.specialty,
                          // profileImg: trainer.profileImg,
                          availability: trainer.availability,
                          bio: trainer.bio,
                        });
                      }}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(trainer._id)}
                    >
                      <RiDeleteBin2Line />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form container  */}
        <div className={styles.formContainer}>
          {/* Add form container  */}
          {showAddTrainerForm && (
            <div className={styles.addFormContainer}>
              <h1 className={styles.addHeading}>Add Trainer</h1>

              <form
                className={styles.addForm}
                onSubmit={handleSubmit}
                ref={formRef}
              >
                <RxCross2
                  className={styles.addCross}
                  onClick={() => {
                    setShowAddTrainerForm(false);
                    setShowUpdateTrainerForm(false);
                  }}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="age"
                  placeholder="Age"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="experience"
                  placeholder="Experience"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="specialty"
                  placeholder="Specialty"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="availability"
                  placeholder="Availability"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="bio"
                  placeholder="Bio"
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="file">Profile Image</label>
                <input
                  type="file"
                  id="file"
                  name="profileImg"
                  onChange={handleInputChange}
                  required
                />
                <input
                  // className={styles.addTrainerBtn}
                  className={`${styles.addTrainerBtn} ${
                    trainersData.postIsLoading ? "hidden" : ""
                  }`}
                  type="submit"
                  value="Add Trainer"
                />
                {trainersData.postIsLoading && (
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

          {/* Update form container */}
          {!showAddTrainerForm && showUpdateTrainerForm && (
            <div className={styles.updateFormContainer}>
              <h1 className={styles.addHeading}>Update Trainer</h1>
              <form className={styles.updateForm} onSubmit={handleUpdate}>
                <RxCross2
                  className={styles.updateCross}
                  onClick={() => {
                    setShowAddTrainerForm(false);
                    setShowUpdateTrainerForm(false);
                  }}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={(event) => {
                    setUpdatedTrainer({
                      ...updatedTrainer,
                      name: event.target.value,
                    });
                  }}
                  value={updatedTrainer.name}
                />
                <input
                  type="text"
                  name="age"
                  placeholder="Age"
                  onChange={(event) => {
                    setUpdatedTrainer({
                      ...updatedTrainer,
                      age: event.target.value,
                    });
                  }}
                  value={updatedTrainer.age}
                />
                <input
                  type="text"
                  name="experience"
                  placeholder="Experience please mention year or month like 10 years or 10 months."
                  onChange={(event) => {
                    setUpdatedTrainer({
                      ...updatedTrainer,
                      experience: event.target.value,
                    });
                  }}
                  value={updatedTrainer.experience}
                />
                <input
                  type="text"
                  name="specialty"
                  placeholder="Specialty"
                  onChange={(event) => {
                    setUpdatedTrainer({
                      ...updatedTrainer,
                      specialty: event.target.value,
                    });
                  }}
                  value={updatedTrainer.specialty}
                />
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact"
                  onChange={(event) => {
                    setUpdatedTrainer({
                      ...updatedTrainer,
                      contact: event.target.value,
                    });
                  }}
                  value={updatedTrainer.contact}
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={(event) => {
                    setUpdatedTrainer({
                      ...updatedTrainer,
                      email: event.target.value,
                    });
                  }}
                  value={updatedTrainer.email}
                />
                <input
                  type="text"
                  name="availability"
                  placeholder="Availability"
                  onChange={(event) => {
                    setUpdatedTrainer({
                      ...updatedTrainer,
                      availability: event.target.value,
                    });
                  }}
                  value={updatedTrainer.availability}
                />
                <input
                  type="text"
                  name="bio"
                  placeholder="Bio"
                  onChange={(event) => {
                    setUpdatedTrainer({
                      ...updatedTrainer,
                      bio: event.target.value,
                    });
                  }}
                  value={updatedTrainer.bio}
                />
                <label htmlFor="file">Profile Image</label>
                <input
                  type="file"
                  id="file"
                  name="profileImg"
                  onChange={(event) => {
                    setUpdatedTrainer({
                      ...updatedTrainer,
                      profileImg: event.target.files[0],
                    });
                  }}
                  // value={updatedTrainer.name}
                />
                <input
                  className={`${styles.updateTrainerBtn} ${
                    trainersData.updateIsLoading ? "hidden" : ""
                  }`}
                  type="submit"
                  value="Update Trainer"
                />
                {trainersData.updateIsLoading && (
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
        </div>
      </div>
    </>
  );
};
