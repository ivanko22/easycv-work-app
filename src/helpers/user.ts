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
      // console.log("state.mainCVid", state.mainCVid);
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
        // console.log("this.mainCVid", this.mainCVid);
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
    // async fillMainCvId() {
    //   this.mainCVid = {};
    //   this.loading = true;
    //   // console.log("mainCvId from Fill");

    //   try {
    //     this.mainCVid = await axios
    //       .get("/api/user", this.config)
    //       .then((response) => {
    //         // console.log("response", response.data.cvs[0]);
    //         this.mainCVid = response.data.cvs[0];
    //         this.userInfo = response.data;
    //         // console.log('this.mainCVid', this.mainCVid);
    //       });
    //   } catch (err) {
    //     this.error = err;
    //     console.log("err", err);
    //   } finally {
    //     this.loading = false;
    //   }
    // },

    // async fillMainCv() {
    //   this.mainCV = [];
    //   this.loading = true;

    //   try {
    //     this.mainCV = await axios
    //       .get("/api/cv", this.config, this.mainCVid)
    //       .then((response) => {
    //         // this.mainCV = response.data[0].workHistory;
    //         this.mainCV = "response.data";
    //         console.log("this.mainCV", this.mainCV);
    //       });
    //   } catch (err) {
    //     this.error = err;
    //     console.log("err", err);
    //   } finally {
    //     this.loading = false;
    //   }
    // },
  },
  // actions: {
  //   async fetchPosts() {
  //     this.posts = []
  //     this.loading = true
  //     try {
  //       this.posts = await fetch('https://jsonplaceholder.typicode.com/posts')
  //       .then((response) => response.json())
  //     } catch (error) {
  //       this.error = error
  //     } finally {
  //       this.loading = false
  //     }
  //   },
  //   async fetchPost(id) {
  //     this.post = null
  //     this.loading = true
  //     try {
  //       this.post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  //       .then((response) => response.json())
  //     } catch (error) {
  //       this.error = error
  //     } finally {
  //       this.loading = false
  //     }
  //   }
  // }

  // getMainCv(state) {
  //   return axios
  //     .get("/api/cv", state.config, state.mainCVid)
  //     .then((response) => {
  //       state.mainCV = response.data[0].workHistory;
  //       // console.log("state.mainCV", state.mainCV);
  //     });
  // },
});

useUserData();
