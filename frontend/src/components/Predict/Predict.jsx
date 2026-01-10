import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import spinnerLogo from "../../assets/spinner.svg";
import Report from "../Report/Report";
import AudioUpload from "../Audio/AudioUpload";

function Predict() {
  const [showSpinner, setShowSpinner] = useState(false);

  const [patientDetails, setPatientDetails] = useState({
    patientName: "",
    patientAge: "",
    patientGender: "",
    patientWeight: "",
    patientHeight: "",
    patientBloodGroup: "",
    symptoms: [],
  });
  const [diseasePredicted, setDiseasePredicted] = useState({});
  const [audioFile, setAudioFile] = useState(null);

  const handlePatientDetailsChange = (event) => {
    const { name, value } = event.target;
    setPatientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const predictDisease = async () => {
    setDiseasePredicted([]);
    setShowSpinner(true);
    try {
      const formData = new FormData();
      formData.append("cough_audio", audioFile);

      const response = await fetch("http://localhost:3000/predict-disease", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setDiseasePredicted(data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    } finally {
      setShowSpinner(false);
    }
  };

  useEffect(() => {
    console.log(diseasePredicted);
  }, [diseasePredicted]);

  return (
    <div className="predict mt-16 text-white">
      <motion.h1
        className="text-5xl capitalize text-center text-red-500 font-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Discover What&apos;s Behind Your Cough
      </motion.h1>
      <div className="flex justify-around items-start mt-16">
        {/* Personal Details Section */}
        <motion.div
          className="info bg-gray-800/50 p-8 rounded-lg shadow-lg backdrop-blur-md w-2/5"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl font-semibold text-center mb-6">
            Enter Your Personal Details
          </h2>
          <div className="info-input">
            <h3 className="font-semibold">Name</h3>
            <input
              type="text"
              name="patientName"
              value={patientDetails.patientName}
              className="px-4 py-2 min-w-28 border-2 mt-2 w-full bg-black/50 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your name"
              onChange={handlePatientDetailsChange}
            />
            <div className="measurements mt-4 grid grid-cols-3 grid-flow-row gap-4">
              <div>
                <h3 className="mb-2 font-semibold">Gender</h3>
                <select
                  name="patientGender"
                  value={patientDetails.patientGender}
                  onChange={handlePatientDetailsChange}
                  className="px-4 py-2 border-2 w-full bg-black/50 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="" disabled>
                    --Select--
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Age</h3>
                <input
                  type="number"
                  name="patientAge"
                  value={patientDetails.patientAge}
                  onChange={handlePatientDetailsChange}
                  className="px-4 py-2 border-2 w-full bg-black/50 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Height (in cm)</h3>
                <input
                  type="number"
                  name="patientHeight"
                  value={patientDetails.patientHeight}
                  onChange={handlePatientDetailsChange}
                  className="px-4 py-2 border-2 w-full bg-black/50 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your height"
                />
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Weight (in Kg)</h3>
                <input
                  type="number"
                  name="patientWeight"
                  value={patientDetails.patientWeight}
                  onChange={handlePatientDetailsChange}
                  className="px-4 py-2 border-2 w-full bg-black/50 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your weight"
                />
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Blood Group</h3>
                <select
                  name="patientBloodGroup"
                  value={patientDetails.patientBloodGroup}
                  onChange={handlePatientDetailsChange}
                  className="px-4 py-2 border-2 w-full bg-black/50 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="" disabled>
                    --Select--
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
            <motion.button
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={predictDisease}
              className="text-xl mt-8 px-8 py-4 w-full border-red-500 border-2 text-white rounded hover:bg-red-500 transition-colors"
            >
              Predict Now
            </motion.button>
          </div>
        </motion.div>

        {/* Audio Upload Section */}
        <motion.div
          className="audio-upload"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <AudioUpload audioFile={audioFile} setAudioFile={setAudioFile} />
        </motion.div>
      </div>

      {/* Spinner or Report */}
      <div className="relative mt-16">
        {diseasePredicted.top_5_diseases ? (
          <Report
            patientDetails={patientDetails}
            diseasePredicted={diseasePredicted}
          />
        ) : showSpinner ? (
          <motion.img
            src={spinnerLogo}
            alt="Spin Logo"
            className="w-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Predict;
