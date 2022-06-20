import apiClient from "services/api/client";

const appAPI = {
    getPlotData: () => {
        return apiClient.get('/apps/my-react-app/data/');
    },
};

export default appAPI;