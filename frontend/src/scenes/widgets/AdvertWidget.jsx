import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper
      sx={{cursor: "pointer"}}
    >
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/info4.png"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Formula 1</Typography>
        <Typography color={medium}>F1Site.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
      Stay informed and connected with the latest news in Formula 1, ensuring you're always up-to-date with all the events, 
      so you can enjoy every moment and shine as brightly as your favorite drivers on the track.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;