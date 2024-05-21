import { Box } from "@mui/material";
import Navbar from "../navbar";
import UserWidget from "../widgets/UserWidget";
import {useMediaQuery} from "@mui/material";
import { useSelector } from "react-redux";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const {_id} = useSelector((state) => state.user);
    return <Box>
        <Navbar />
        <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="0.5rem"
            justifyContent="space-between"
        >
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                <UserWidget userId={_id} />
            </Box>
            <Box
                flexBasis={isNonMobileScreens ? "42%" : undefined}
                mt={isNonMobileScreens ? "undefined" : "2rem"}
            >

            </Box>
            {isNonMobileScreens && (
                <Box flexBasis="26%" ></Box>
            )}
        </Box>
    </Box>
}

export default HomePage;