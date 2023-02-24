import axios from "axios";
import { ref } from "vue";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user")}`,
  },
};

const mainUserCvId = ref();
export const userData = ref();

// get ID of main CV
axios.get("/api/user", config).then((response) => {
  mainUserCvId.value = response.data.cvs[0];
  userData.value = response.data;
});

// get main CV
export function getMainCv() {
  const cv = ref();
  axios.get("/api/cv", config, mainUserCvId.value).then((response) => {
    cv.value = response.data[0].workHistory;
  });

  return cv;
}
