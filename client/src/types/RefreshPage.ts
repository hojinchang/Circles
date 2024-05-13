import { NavigateFunction } from "react-router-dom";

interface RefreshPage {
    navigate: NavigateFunction,
    dispatch: React.Dispatch<any>
}

export default RefreshPage;