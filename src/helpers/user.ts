import { defineStore } from "pinia";
import axios from "axios";

export const useUserData = defineStore("user", {
  state: () => ({
    loading: false,
    count: 11,
    isLogIn: false,
    token: "",
    mainCVid: "",
    mainCV: [],
    userInfo: [],
    config: {},
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
      console.log("state.mainCVid", state.mainCV);
      return state.mainCV;
    },
  },

  actions: {
    fillToken() {
      this.token = "";
      this.token = localStorage.getItem("user");
    },

    fillConfig() {
      this.config = {};

      this.config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      };
    },

    fillMainCvId() {
      this.mainCvId = "";

      this.mainCvId = axios.get("/api/user", this.config).then((response) => {
        console.log("response", response.data.cvs[0]);
        this.mainCVid = response.data.cvs[0];
        this.userInfo = response.data;
      });
    },

    fillMainCv() {
      this.mainCV = [];
      this.loading = true;

      axios.get("/api/cv", this.config, this.mainCVid).then((response) => {
        this.mainCV = response.data[0].workHistory;
        // console.log("this.mainCV", this.mainCV);
      });
    },
  },
});

useUserData();
