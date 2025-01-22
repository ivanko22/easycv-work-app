import apiClient from "./api";

export async function addSocial(socialData) {

    console.log("Adding social...", socialData);

    try {
        const response = await apiClient.post("social/", socialData);

        console.log("Social added successfully:", response.data);

        return response;

    } catch (error) {
        console.error("Social add failed:", error.response?.data);
        throw error.response?.data || "An error occurred while adding the Social.";
    }
}

// export async function getCv() {
//     console.log("Getting cv...");

//     try {
//         const response = await apiClient.get("cv/");

//         console.log("Cv", response.data);

//         return response.data;
//     } catch (error) {
//         console.error("Get cv failed:", error.response?.data);
//         throw error.response?.data || "An error occurred while getting cv.";
//     }
// }

// export async function updateJob(jobData, jobId) {
//     try {
//         const response = await apiClient.put(`user/employment/${jobId}/`, jobData);

//         console.log("Job updated successfully:", response.data);

//         const updatedJobs = await getJobs();

//         console.log("Updated jobs list from update job:", updatedJobs);

//         return updatedJobs;

//     } catch (error) {
//         console.error("Update job failed:", error.response?.data);
//         throw error.response?.data || "An error occurred while updating the job.";
//     }
// }

// export async function removeJob(jobId) {
//     try {
//         const response = await apiClient.delete(`user/employment/${jobId}/`);

//         console.log("Job removed successfully:", response.data);

//         const updatedJobs = await getJobs();

//         console.log("Remove jobs from the list:", updatedJobs);

//         return updatedJobs;

//     } catch (error) {
//         console.error("Remove job failed:", error.response?.data);
//         throw error.response?.data || "An error occurred while removing the job.";
//     }
// }


