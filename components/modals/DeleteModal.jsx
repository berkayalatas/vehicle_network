import React from "react";
import { useRouter } from "next/dist/client/router";
import style from "../../styles/Modal.module.css";
import {
  deleteDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase_config";
import { toast, ToastContainer } from "react-toastify";

function DeleteModal({ setOpen, carID }) {
  const router = useRouter();
  const { user } = useAuth();

  const notifySuccess = () =>
    toast.success("Car successfully deleted!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });
  async function handleDelete() {
    const q = query(
      collection(db, "cars"),
      where("user.userID", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);
    var docID;
    
    querySnapshot.forEach((doc) => {
      console.log(doc.id);
      const myData = doc.data();
      if (myData["car"]["carID"] == carID) {
        docID = doc.id;
      }
      console.log("Document data:", doc.data());
    });

    await deleteDoc(doc(db, "cars", docID));
  }

  return (
    <div>
      <div className={style.darkBG} />
      <div className={style.centered}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <h5 className={style.heading}>Delete Car Data</h5>
          </div>
          <div className={style.modalContent}>
            Are you sure you want to delete this car? <br />
            This action cannot be undone.
          </div>
          <div className={style.modalActions}>
            <div className={style.actionsContainer}>
              <button
                className={style.deleteBtn}
                onClick={() => {
                  handleDelete();
                  notifySuccess();
                  setTimeout(() =>{
                    router.push("/auth/UserDashboard");
                  },2000)
                }}
              >
                Yes, Delete
              </button>
              <button
                className={style.cancelBtn}
                onClick={() => {
                  setOpen(false);
                }}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default DeleteModal;
