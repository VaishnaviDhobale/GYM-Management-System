import styles from "./Home.module.css"; 
import bannerImage from "../../assets/heroImage.jpg"; // Import the background image

export const Home = () => {
  return (
    
      
      <div
        className={styles.imageDiv}
        style={{
          backgroundImage: `url(${bannerImage})`, // Set the background image
        }}
      >
        {/* You can add content inside this div if needed */}
      </div>
  );
};
