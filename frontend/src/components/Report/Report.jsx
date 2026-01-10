import aiDoctorImage from "../../assets/stethescope.svg";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Report = ({ patientDetails, diseasePredicted }) => {
  const downloadPDF = async () => {
    const reportElement = document.getElementById("report-content");

    // Temporarily change the background to white for better readability
    reportElement.style.backgroundColor = "#ffffff";
    reportElement.style.color = "#000000";

    // Wait for images to load before capturing
    const images = reportElement.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map((img) => {
        if (!img.complete) {
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        }
        return Promise.resolve();
      })
    );

    // Capture the content as a canvas
    const canvas = await html2canvas(reportElement, {
      scale: 2,
      useCORS: true, // Handle cross-origin images
    });

    // Restore the original styles
    reportElement.style.backgroundColor = "";
    reportElement.style.color = "";

    // Convert canvas to image
    const imgData = canvas.toDataURL("image/png");

    // Create a new PDF instance
    const pdf = new jsPDF("p", "mm", "a4");

    // Calculate dimensions to fit the content
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Save the PDF
    pdf.save("RespireNet_Report.pdf");
  };

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <motion.div
        id="report-content"
        className="mt-20 border-2 p-8 w-[1200px] bg-gray-900/50 rounded-lg shadow-lg relative overflow-hidden backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Subtle Stethoscope Backdrop */}
        <img
          src={aiDoctorImage}
          alt="Stethoscope Backdrop"
          className="absolute inset-0 w-full h-full opacity-10 object-cover"
        />

        <h1 className="text-4xl text-center underline text-red-500 font-bold">
          Report
        </h1>
        <div className="report mt-10 relative z-10">
          {/* Personal Details Section */}
          <div className="personal-details flex justify-between items-center">
            <div>
              <div className="flex">
                <h2 className="font-bold mr-2">Name: </h2>
                <p>{patientDetails.patientName}</p>
              </div>
              <div className="flex">
                <h2 className="font-bold mr-2">Gender: </h2>
                <p>{patientDetails.patientGender}</p>
              </div>
              <div className="flex">
                <h2 className="font-bold mr-2">Age: </h2>
                <p>{patientDetails.patientAge}</p>
              </div>
              <div className="flex">
                <h2 className="font-bold mr-2">Blood Group: </h2>
                <p>{patientDetails.patientBloodGroup}</p>
              </div>
              <div className="flex">
                <h2 className="font-bold mr-2">Height: </h2>
                <p>{patientDetails.patientHeight} cm</p>
              </div>
              <div className="flex">
                <h2 className="font-bold mr-2">Weight: </h2>
                <p>{patientDetails.patientWeight} Kg</p>
              </div>
            </div>
          </div>

          {/* Audio Analysis Section */}
          <div className="audio-analysis mt-6">
            <h1 className="text-xl font-semibold text-red-500">Audio Analysis</h1>
            <p>Duration: {diseasePredicted.audio_analysis.duration}</p>
            <p>Frequency Range: {diseasePredicted.audio_analysis.frequency_range}</p>
            <div className="spectrogram flex items-center flex-col">
              <h1 className="mt-6 text-xl font-semibold text-red-500">
                Your Mel Spectrogram Graph
              </h1>
              <img
                src={`http://localhost:3000/${diseasePredicted.mel_spectrogram_image}`}
                alt="Spectrogram"
                className="mt-4 rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Summary Section */}
          <div className="summary mt-6">
            <h1 className="text-xl font-semibold text-red-500">Summary</h1>
            <p>{diseasePredicted.summary}</p>
          </div>

          {/* Predicted Diseases Section */}
          <div className="predicted-diseases mt-6">
            <h1 className="text-xl font-semibold text-red-500">
              Your Top 5 Predicted Diseases:
            </h1>
            <ol className="list-decimal ml-6 mt-4">
              {diseasePredicted &&
                diseasePredicted.top_5_diseases &&
                diseasePredicted.top_5_diseases.map((eachDisease) => (
                  <div className="diseases" key={eachDisease.disease}>
                    <li>
                      {eachDisease.disease} - {eachDisease.confidence.toFixed(2)}%
                    </li>
                  </div>
                ))}
            </ol>

            {/* Confidence Chart */}
            <div className="confidence_chart mt-4 flex items-center flex-col">
              <h1 className="mt-6 text-xl font-semibold text-red-500">
                Confidence Chart
              </h1>
              <img
                src={`http://localhost:3000/${diseasePredicted.confidence_chart}`}
                alt="Confidence Chart"
                className="rounded-lg shadow-md"
              />
            </div>

            {/* Preventive Measures */}
            <div className="preventive_measures mt-6">
              <h1 className="text-xl font-semibold text-red-500">
                Follow these to avoid any respiratory diseases:
              </h1>
              <ul className="list-disc ml-6 mt-4">
                {diseasePredicted &&
                  diseasePredicted.preventive_measures &&
                  diseasePredicted.preventive_measures.map(
                    (eachPreventiveMeasure) => (
                      <li key={eachPreventiveMeasure}>{eachPreventiveMeasure}</li>
                    )
                  )}
              </ul>
            </div>
            <p className="italic text-center mt-10 text-gray-300">
              {diseasePredicted.encouraging_message}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Download PDF Button */}
      <motion.button
        onClick={downloadPDF}
        className="mt-8 px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Download Report as PDF
      </motion.button>
    </div>
  );
};

export default Report;
