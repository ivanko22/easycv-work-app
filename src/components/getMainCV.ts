import axios from "axios";
import { ref } from "vue";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user")}`,
  },
};

export const mainUserCvId = ref();
export const user = ref();
export const cv = ref();

console.log("get main Cv global", mainUserCvId, user, cv);

// get ID of main CV
axios.get("/api/user", config).then((response) => {
  mainUserCvId.value = response.data.cvs[0];
  user.value = response.data;
});

// get main CV
export function getMainCv() {
  axios.get("/api/cv", config, mainUserCvId.value).then((response) => {
    cv.value = response.data[0].workHistory;
  });

  console.log("get main Cv global 2", mainUserCvId, user, cv);
}

getMainCv();
