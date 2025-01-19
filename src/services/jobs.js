import apiClient from "./api";

export async function addJob(jobData) {
    try {
        const response = await apiClient.post("user/employment", jobData);

        console.log("Job added successfully:", response.data);

        const updatedJobs = await getJobs();

        console.log("Updated jobs:", updatedJobs);

        return updatedJobs;

    } catch (error) {
        console.error("Add job failed:", error.response?.data);
        throw error.response?.data || "An error occurred while adding the job.";
    }
}

export async function getJobs() {
    console.log("Getting jobs...");

    try {
        const response = await apiClient.get("user/employment");

        console.log("List of jobs", response.data);

        return response.data;
    } catch (error) {
        console.error("Get jobs failed:", error.response?.data);
        throw error.response?.data || "An error occurred while getting jobs.";
    }
}
