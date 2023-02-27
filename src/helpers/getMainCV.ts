import { useUserData } from "@/helpers/user";
import axios from "axios";
import { ref } from "vue";

const user = useUserData();

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.token}`,
  },
};

export const cv = ref();

// get main CV
export function getMainCv() {
  axios.get("/api/cv", config, user.mainCVid).then((response) => {
    cv.value = response.data[0].workHistory;
  });

  // console.log("get main Cv global 2", cv);
}

getMainCv();
