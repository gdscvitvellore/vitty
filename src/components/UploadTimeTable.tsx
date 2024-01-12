/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { parseAndReturn, uploadText } from "../utils/apicalls";
import "./../styles/logedin.css";
import { useAuthStore } from "../store/authStore";
import { useLoadingStore } from "../store/useLoadingStore";
import { TimeTable } from "../store/authStore";
import { useTimeTableStore } from "../store/TimeTableStore";

const Upload: React.FC = () => {
  const [text, setText] = useState("");
  const { username, token, setReview } = useAuthStore();
  const { uploadTimetable } = useTimeTableStore();
  const { setLoading } = useLoadingStore();

  useEffect(() => {
    document.title = "VITTY | Upload";
    setLoading(false);
  }, [setLoading]);

  const submitText = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    if (text === "") {
      alert("Please paste the text first!");
      return;
    }
    parseAndReturn(text, token)
      .then((res: TimeTable) => {
        console.log(res);
        if (res.timetable === null) {
          alert("upload failed, Copy the course list details and try again !!!");
          return;
        } else {
          uploadTimetable(res);
          console.log(res, "timetable from upload section");
          setReview(true);
        }
        // uploadTimetable(res.data);
        // console.log(res.data);
      })
      .catch((error: Error) => {
        console.error("Error fetching timetable:", error);
      });
  };

  return (
    <div className="upload-wrapper">
      <h1>Upload Timetable</h1>
      <div className="upload">
        <div className="upload-text">
          <ol className="steps">
            <li>Go to the Time Table tab on VTOP</li>
            <li>Scroll to see the course list with your faculty details</li>
            <li>
              Select the text from <span>Sl.No</span> in the top left to{" "}
              <span>Registered and Approved</span> in the bottom right
            </li>
            <li>Copy all of the selected text</li>
            <li>Paste it below </li>
            <textarea
              autoFocus
              //   type="text"
              id="input-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <li>Submit to continue! :)</li>
            <button type="submit" onClick={submitText}>
              Submit Text
            </button>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Upload;