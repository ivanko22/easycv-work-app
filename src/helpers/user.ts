import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import { ref } from 'vue';

export const useUserData = defineStore("userStore", {
  state: () => ({
    loading: false,
    count: 11,
    isLogIn: false,
    token: "",
    mainCVid: "",
    mainCV: [],
    jobs: [],
    user: [],
    profileImage: "",
    userSocial: [
      {name: '+ Cell', link: '+ Cell'}, 
      {name: '+ Portfolio', link: '+ Portfolio'},
      {name: '+ Linkedin', link: '+ Linkedin'},
      {name: '+ Location', link: '+ Location'},
      {name: '+ Github', link: '+ Github'},
      {name: '+ Other', link: '+ Other'},
    ],
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

    getUser: (state) => {
      return state.user;
    },

    getUserSocial: (state) => {
      return state.userSocial;
    }
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
      console.log('this.config', this.config);

      this.mainCvId = axios.get("/api/user", this.config).then((response) => {
      this.mainCVid = response.data.cvs[0];
      });
    },

    fillUserSocial() {
      this.mainCvId = axios.get("/api/user", this.config).then((response) => {
        if (response.data.socials.length === 6) {
          this.userSocial = response.data.socials;
        }
        this.user = response.data;
      });
    },

    fillMainCv() {
      axios.get("/api/cv", this.config, this.mainCVid).then((response) => {
        this.mainCV = response.data[0];
        this.jobs = response.data[0].workHistory;
        this.profileImage = `${'http://localhost:8000/api'+response.data[0].profileImage}`;

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

    updateUser(param, data) {
      this.userSocial[param].link = data;

      const sendData = ref({
        email: null,
        firstName: null,
        lastName: null,
        languages: [{
          language: null, 
          level: null
        }],
        socials: [
          this.userSocial[0],
          this.userSocial[1],
          this.userSocial[2],
          this.userSocial[3],
          this.userSocial[4],
          this.userSocial[5],
        ],
        skills: null
      });
      
      axios.put('api/user', sendData.value, this.config)
      .then((response) => {
        this.userSocial = response.data.socials;

      }).catch((err) => {
        console.log('err!!!!!!!!!', err)
      })
    },

    updateCv(dataSend) {
      axios.put('/api/cv', dataSend, this.config)
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
          router.push("/dashboard");
        }
      })
    },

    // addJob(dataSend) {

    //   console.log('this.mainCVid:', this.mainCVid);
    //   console.log('dataSend add job', dataSend);
    //   console.log('this.mainCVid', this.mainCVid);

    //   if (!this.mainCVid) {
    //       console.error('Error: mainCVid is missing');
    //       return;
    //   }

    //   axios
    //     .post(`/api/cv/${this.mainCVid}/employment`, dataSend, this.config)
    //     .then((response) => {

    //       switch(response.data){
    //         case "User does not own this CV":
    //           console.log('User does not own this CV');
    //           break;

    //         case "ERROR: Unable to update user's CV":
    //           console.log("ERROR: Unable to update user's CV");
    //           break;
    //       }

    //       if (typeof response.data !== "string") {
    //         this.fillMainCv();
    //       }
    //     });
    // },

    // async addJob(jobData) {
    //   console.log("Sending data to API:", jobData);

    //   try {
    //     const response = await axios.post(`/api/user/employment`, jobData);
    //     console.log("Job added successfully:", response.data);
    //     return response.data;
    //   } catch (error) {
    //     console.error("Error adding job:", error.response?.data || error.message);
    //     throw error;
    //   }
    // },

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

    addAva(formDataAva) {
      axios
        .post(`/api/cv/${this.mainCVid}/profile-image`, formDataAva, {       
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
      })
        .then((response) => {
          console.log('response', response.data)

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
            console.log('this.mainCV', this.mainCV);
          }
        });
    },
  },
});
