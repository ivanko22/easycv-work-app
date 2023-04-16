import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

export const useUserData = defineStore("userStore", {
  state: () => ({
    loading: false,
    count: 11,
    isLogIn: false,
    token: "",
    mainCVid: "",
    mainCV: [],
    jobs: [],
    userInfo: [],
    config: {},
    showCTAbtn: false,
    error: null,
  }),

  getters: {
    getToken: (state) => {
      return state.token;
    },

    getConfig: (state) => {
      return state.config;
    },

    getMainCvId: (state) => {
      return state.mainCVid;
    },

    getMainCv: (state) => {
      return state.mainCV;
    },

    getCTAbtnState: (state) => {
      return state.showCTAbtn;
    },
  },

  actions: {
    fillToken() {
      this.token = localStorage.getItem("user");
    },

    fillConfig() {
      this.config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      };
    },

    fillMainCvId() {
      this.mainCvId = axios.get("/api/user", this.config).then((response) => {
        this.mainCVid = response.data.cvs[0];
      });
    },

    fillUser() {
      this.mainCvId = axios.get("/api/user", this.config).then((response) => {
        this.userInfo = response.data;
      });
    },

    fillMainCv() {
      axios.get("/api/cv", this.config, this.mainCVid).then((response) => {
        this.mainCV = response.data[0];
        this.jobs = response.data[0].workHistory
        if (this.jobs.length > 0) {
          this.showCTAbtn = true;
        }else{
          this.showCTAbtn = false;
        }

      });
    },

    //edit job
    fillJob(data, jobID) {
      axios
        .put(`/api/cv/${this.mainCVid}/employment/${jobID}`, data, this.config)
        .then((response) => {
          if (typeof response.data !== "string") {
            this.fillMainCv();
          }
        });
    },

    updateUser(dataSend) {
      axios.put('api/user', dataSend, this.config)
      .then((response) => {
        console.log('user response', response.data)
      })
    },

    updateCv(dataSend) {
      axios.put('/api/cv', dataSend, this.config)
      .then((response) => {
        console.log('response.data', response.data)
        switch(response.data){
          case "User does not own this CV":
            console.log('User does not own this CV');
            break;

          case "ERROR: Unable to update user's CV":
            console.log("ERROR: Unable to update user's CV");
            break;
        }

        if (typeof response.data !== "string") {
          this.fillMainCv();
          router.push("/dashboard");
        }
      })
    },

    addJob(dataSend) {
      axios
        .post(`/api/cv/${this.mainCVid}/employment`, dataSend, this.config)
        .then((response) => {

          switch(response.data){
            case "User does not own this CV":
              console.log('User does not own this CV');
              break;

            case "ERROR: Unable to update user's CV":
              console.log("ERROR: Unable to update user's CV");
              break;
          }

          if (typeof response.data !== "string") {
            this.fillMainCv();
          }
        });
    },

    removeJob(dataSend, cvID, jobID) {
      axios
        .delete(`/api/cv/${this.mainCVid}/employment/${jobID}`, this.config)
        .then((response) => {

          switch(response.data){
            case "User does not own this CV":
              console.log('User does not own this CV');
              break;

            case "ERROR: unable remove work history from CV":
              console.log("ERROR: unable remove work history from CV");
              break;
          }

          if (typeof response.data !== "string") {
            this.fillMainCv();
          }
        });
    },
  },
});
