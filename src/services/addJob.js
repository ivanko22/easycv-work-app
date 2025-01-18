import apiClient from "./api";

export async function addJob(jobData) {
    try {
        const response = await apiClient.post("user/employment", jobData);

        console.log("Job added successfully:", response.data);

        return response.data;
    } catch (error) {
        console.error("Add job failed:", error.response?.data);
        throw error.response?.data || "An error occurred while adding the job.";
    }
}
