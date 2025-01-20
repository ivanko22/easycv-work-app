import apiClient from "./api";

export async function addJob(jobData) {

    console.log("Adding job...", jobData);
    try {
        const response = await apiClient.post("user/employment", jobData);

        console.log("Job added successfully:", response.data);

        const updatedJobs = await getJobs();

        console.log("Updated jobs list from add job:", updatedJobs);

        return updatedJobs;

    } catch (error) {
        console.error("Add job failed:", error.response?.data);
        throw error.response?.data || "An error occurred while adding the job.";
    }
}

export async function updateJob(jobData, jobId) {
    try {
        const response = await apiClient.put(`user/employment/${jobId}/`, jobData);

        console.log("Job updated successfully:", response.data);

        const updatedJobs = await getJobs();

        console.log("Updated jobs list from update job:", updatedJobs);

        return updatedJobs;

    } catch (error) {
        console.error("Update job failed:", error.response?.data);
        throw error.response?.data || "An error occurred while updating the job.";
    }
}

export async function removeJob(jobId) {
    try {
        const response = await apiClient.delete(`user/employment/${jobId}/`);

        console.log("Job removed successfully:", response.data);

        const updatedJobs = await getJobs();

        console.log("Remove jobs from the list:", updatedJobs);

        return updatedJobs;

    } catch (error) {
        console.error("Remove job failed:", error.response?.data);
        throw error.response?.data || "An error occurred while removing the job.";
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
